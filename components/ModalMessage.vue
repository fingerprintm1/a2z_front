<template>
  <div class="fixed inset-0 grid place-items-center z-[110]">
    <div v-if="globalStore.ModalMessage" @click="globalStore.ModalMessage = false" class="overlay_element"></div>
    <div style="overflow: inherit" class="hero_course pt-4 px-4 w-[98%] lg:w-3/6 h-[40%] lg:h-3/6 rounded-lg relative z-[110] sm:bg-gradient-to-t sm:from-fp1/5 sm:to-fp2/20">
      <button class="bg-red-400 hover:bg-red-600 rounded-full absolute -top-3 -start-3" @click="globalStore.ModalMessage = false">
        <Icon class="text-white text-3xl" name="mdi:close" />
      </button>
      <div class="overflow-y-scroll h-full">
        <p class="text-white text-2xl" v-html="globalStore.messageNotification"></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
</script>
