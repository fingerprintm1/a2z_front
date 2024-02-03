<template>
  <div class="fixed z-[120] top-20 start-5">
    <TransitionGroup name="list">
      <NotificationTost v-for="(notification, index) in tost.notifications" :key="index" :notification="notification" />
    </TransitionGroup>
  </div>
</template>

<script setup>
import {useTostStore} from "@/store/TostStore";
const tost = useTostStore();
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0.5;
  transform: translateX(30px);
}
</style>
