import {defineStore} from "pinia";
import {useTostStore} from "@/store/TostStore";
const errors = reactive(useErrors());
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      isLoggedIn: false,
      openModalWallet: ref(false),
      codeWallet: ref(""),
    };
  },

  actions: {
    sendCodeWallet() {
      $fetch(`${useRuntimeConfig().public.apiURL}/walletPay/${this.codeWallet}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        // body: {course_id: route.params.id},
      }).then(res => {
        if (res.status) {
          this.codeWallet = "";
          this.openModalWallet = false;
          this.setUser(res.data);
          useTostStore().add({
            type: "success",
            message: res.message,
          });
        } else {
          errors.record({code: res.message});
          useTostStore().add({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    setUser(user) {
      this.user = user;
      if (process.client) {
        localStorage.setItem("user", user.access_token);
      }
      this.isLoggedIn = true;
    },

    removeUser() {
      this.user = {};
      if (process.client) {
        localStorage.removeItem("user");
      }
      this.isLoggedIn = false;
    },

    async logout() {
      const token = localStorage.getItem("user");
      let result = await $fetch(`${useRuntimeConfig().public.apiURL}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        if (res.status) {
          this.isLoggedIn = false;
          this.removeUser();
          if (res.status) {
            useTostStore().add({
              type: "success",
              message: useNuxtApp().$i18n.t("success_logout"),
            });
            navigateTo("/");
          }
        }
        return res;
      });
      return result;
    },
  },
});
