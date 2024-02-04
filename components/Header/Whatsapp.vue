<template>
  <a
    :href="`http://wa.me/${globalStore.appSettings.whatsapp}`"
    target="_blank"
    class="sm:hidden rounded-full p-2 fixed justify-center items-center end-8 bottom-4 z-51 transition-all duration-300 border-none flex"
  >
    <img src="~/assets/images/global/whatsapp.png" alt="whatsapp" class="w-12" />
  </a>
  <span id="bar-scroll" class="absolute start-0 h-2 bg-fp2 rounded-e-full"></span>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
</script>
