import {defineStore} from "pinia";
import {useTostStore} from "@/store/TostStore";
import {useCourseStore} from "@/store/CourseStore";
import {useOfferStore} from "@/store/OfferStore";
import {useAuthStore} from "@/store/AuthStore";
const tost = useTostStore();
const errors = reactive(useErrors());
export const usePayStore = defineStore("pay", {
  state: () => {
    return {
      payData: reactive({
        id: null,
        typeOrder: ref("course"),
        show: ref(false),
        type: ref("cash"),
        code: ref(null),
        photo: ref(null),
        spinnerPhoto: ref(false),
      }),
    };
  },
  getters: {
    getPayData: state => state.payData,
  },
  actions: {
    setPayData(type, value) {
      this.payData[type] = value;
    },
    sendDataPay() {
      let formData = {
        code: this.payData.code,
        ID: this.payData.id,
        card_type: this.payData.type,
      };
      if (this.payData.type == "cash") {
        if (this.payData.photo == null) {
          tost.add({
            type: "error",
            message: "يجب ارفاق إيصال الدفع",
          });
          return;
        }
        this.payData.spinnerPhoto = true;
        const file = this.payData.photo.files[0];
        formData = new FormData();
        formData.append("photo", file);
        formData.append("code", this.payData.code);
        formData.append("ID", this.payData.id);
        formData.append("card_type", this.payData.type);
      }
      $fetch(`${useRuntimeConfig().public.apiURL}/order/${this.payData.typeOrder}/payBank`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: formData,
      }).then(res => {
        if (res.status) {
          tost.add({
            type: "success",
            message: res.message,
          });
          this.payData.show = false;
          let modelID = this.payData.typeOrder == "lecture" ? useCourseStore().getCourse.id : this.payData.id;
          if (this.payData.typeOrder == "offer") {
            useOfferStore().getOfferApi(modelID);
          } else {
            useCourseStore().getCourseApi(modelID);
          }
          useAuthStore().user.balance = res.data.balance;
        } else {
          if (res.errCode == 403) {
            errors.record({code: res.message});
          }
          tost.add({
            type: "error",
            message: res.message,
          });
        }
        this.payData.spinnerPhoto = false;
      });
    },
    checkUser(price) {
      if (localStorage.getItem("user") == null) {
        tost.add({
          type: "error",
          message: "لازم تسجل دخول الأول",
        });
        this.payData.show = false;
        return navigateTo("/login");
      }
      if (price == 0) {
        this.payData.type = "wallet";
        return this.sendDataPay();
      }
      errors.clear("code");
      this.payData.code = null;
      this.payData.photo = null;
      return (this.payData.show = true);
    },
    setValueOrder(type, id, price = 1) {
      if (type === "lecture" && useCourseStore().getCourse.subscribed) {
        return tost.add({
          type: "error",
          message: "يجب عليك اجتياز امتحان الحصة  السابق أولا",
        });
      }
      this.payData.typeOrder = type;
      this.payData.id = id;
      this.checkUser(price);
    },
  },
});
