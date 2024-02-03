import {defineStore} from "pinia";
import {useTostStore} from "@/store/TostStore";
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const tost = useTostStore();
export const useOfferStore = defineStore("offer", {
  state: () => {
    return {
      offer: ref({}),
    };
  },
  getters: {
    getOffer: state => state.offer,
  },
  actions: {
    async getOfferApi(ID) {
      try {
        await $fetch(`${useRuntimeConfig().public.apiURL}/getOffer/${ID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }).then(res => {
          if (res.status) {
            this.offer = res.data;
          } else {
            tost.add({
              type: "error",
              message: res.message,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
      return this.offer;
    },
  },
});
