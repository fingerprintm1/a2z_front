import {defineStore} from "pinia";
import {useAuthStore} from "@/store/AuthStore";
import {useTostStore} from "@/store/TostStore";
import {useGlobalStore} from "@/store/GlobalStore";
const auth = useAuthStore();
export const useStudentStore = defineStore("StudentStore", {
  state: () => {
    return {
      showStudentMenu: ref("profile"),
      typeRequst: ref("profile"),
      pageShow: ref(true),
      data: reactive({
        user: {},
        courses: [],
        offers: [],
        certificates: [],
        invoices: [],
      }),
    };
  },
  getters: {
    valueShowStudentMenu: state => state.showStudentMenu,
    returnData: state => state.data,
  },
  actions: {
    async getStudent(value) {
      this.typeRequst = value == "files" || value == "exams" ? "courses" : value;
      if (value == "profile" || value == "settings" || this.data[this.typeRequst].length != 0) return (this.showStudentMenu = value);
      try {
        await $fetch(`${useRuntimeConfig().public.apiURL}/auth/student/${this.typeRequst}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }).then(res => {
          if (res.status) {
            this.data[this.typeRequst] = res.data;
            this.pageShow = false;
            this.showStudentMenu = value;
          } else if (res.errCode == 0) {
            useAuthStore().removeUser();
            useTostStore().add({
              type: "error",
              message: res.message,
            });
            navigateTo("/");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    setValueStudentMenu(value) {
      if (value == "profile" || value == "settings") {
        this.data.user = auth.user;
        this.pageShow = false;
      }
      useGlobalStore().menuMobileScreen = false;
      this.getStudent(value);
    },
  },
});
