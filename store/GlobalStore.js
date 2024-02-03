import {defineStore} from "pinia";
import {useTostStore} from "@/store/TostStore";
import {useAuthStore} from "@/store/AuthStore";
export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      showStudentMenu: ref("courses"),
      menuMobileScreen: ref(false),
      appSettings: [],
      notifications: reactive([]),
      mode: ref("dark"),
      hoverNotification: ref(false),
      hoverProfile: ref(false),
      toggleMenu: ref(false),
      showHeaders: ref(true),
      home: reactive({
        sections: [],
        teachers: [],
        subjects: [],
        courses: [],
        offers: [],
        reviews: [],
        show: ref(false),
      }),
    };
  },
  getters: {
    valueShowStudentMenu: state => state.showStudentMenu,
    homeData: state => state.home,
  },
  actions: {
    async getDataHome() {
      if (this.home.show) return;
      try {
        await $fetch(`${useRuntimeConfig().public.apiURL}/home`).then(res => {
          if (res.status) {
            this.home.sections = res.data.sections;
            this.home.teachers = res.data.teachers;
            this.home.subjects = res.data.subjects;
            this.home.courses = res.data.courses;
            this.home.offers = res.data.offers;
            this.home.reviews = res.data.reviews;
            this.home.show = true;
          } else {
            useTostStore().add({
              type: "error",
              message: res.message,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async HashURLFile(path, nameFile = "") {
      const extension = path.split(".").pop();
      const download = ["doc", "docx", "dot", "dotx", "xls", "xlsx", "xlsm", "xlsb", "xltx", "xltm"];
      const fileExtensions = ["pdf", "doc", "docx", "dot", "dotx", "xls", "xlsx", "xlsm", "xlsb", "xltx", "xltm"];
      const type = fileExtensions.includes(extension) ? "application" : "image";
      return await $fetch(path).then(file => {
        const blobURL = URL.createObjectURL(new Blob([file], {type: `${type}/${extension}`}));
        if (download.includes(extension)) {
          const a = document.createElement("a");
          a.href = blobURL;
          a.download = `${nameFile}.${extension}`;
          a.click();
        } else {
          window.open(blobURL, "_blank");
        }
        URL.revokeObjectURL(blobURL);
      });
    },
    closeMenu() {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        this.toggleMenu = false;
      }
    },
    async markAsRead() {
      try {
        await $fetch(`${useRuntimeConfig().public.apiURL}/markAsRead`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }).then(res => {
          this.notifications = ref([]);
          this.hoverNotification = false;
          useTostStore().add({
            type: "success",
            message: t("success_read_all"),
          });
        });
      } catch (errors) {
        console.log(errors);
      }
    },

    toggleDarkmode() {
      this.mode = localStorage.getItem("mode") != null ? localStorage.getItem("mode") : this.mode;
      if (this.mode == "light") {
        localStorage.setItem("mode", "dark");
        document.documentElement.classList.add("dark");
        this.mode = "dark";
      } else {
        localStorage.setItem("mode", "light");
        document.documentElement.classList.remove("dark");
        this.mode = "light";
      }
    },
    setValueStudentMenu(value) {
      this.showStudentMenu = value;
    },
    setAppSettings(settings) {
      this.appSettings = settings;
      return this.appSettings;
    },
    setNotifications(notifications) {
      this.notifications = notifications;
    },
    async notificationsUser() {
      if (this.notifications.length == 0 && localStorage.getItem("user") != null) {
        try {
          await $fetch(`${useRuntimeConfig().public.apiURL}/notificationsUser`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }).then(res => {
            this.notifications = res.data;
          });
        } catch (error) {
          console.log(error);
        }
        return this.notifications;
      }
      return this.notifications;
    },
    readNotification(ID) {
      try {
        $fetch(`${useRuntimeConfig().public.apiURL}/readNotification/${ID}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    removeNotificationUser(model, NotificationID) {
      for (const [key, value] of Object.entries(this.notifications)) {
        // if (model in value.data && value.data[model].id == ID) {
        if (model in value.data && value.id == NotificationID) {
          this.notifications.splice(key, 1);
        }
      }
      this.readNotification(NotificationID);
    },
    async app() {
      if (Object.keys(this.appSettings).length != 0) return;
      try {
        await $fetch(`${useRuntimeConfig().public.apiURL}/app`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          // body: {locale: currentLocale.value},
        }).then(res => {
          if (res.status) {
            this.setAppSettings(res.data.settings);
            if (!res.data.user.email) {
              useAuthStore().removeUser();
            } else {
              useAuthStore().setUser(res.data.user);
              if (res.data.user.unread_notifications.length != 0) {
                this.setNotifications(res.data.user.unread_notifications);
              }
            }
          } else {
            useAuthStore().removeUser();
          }
        });
      } catch (error) {
        useAuthStore().removeUser();
        console.log(error);
      }
    },
  },
});
