import {defineStore} from "pinia";

let nextId = 1;

export const useTostStore = defineStore("tost", {
  state: () => {
    return {
      notifications: [],
    };
  },

  actions: {
    add(notification) {
      this.notifications.push({
        ...notification,
        id: nextId++,
      });
    },
    remove(notification) {
      this.notifications = this.notifications.filter(n => n.id !== notification.id);
    },
  },
});
