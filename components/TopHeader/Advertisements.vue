<template>
  <div class="w-1/3 hidden lg:flex items-center gap-x-2 bg-white text-fp3 rounded-full px-6 py-4">
    <!-- <p id="text_top_top_header" class="text_top_top_header text-white border-e-2 pe-1 font-bold h-6"></p> -->
    <p ref="text_top_top_header" class="text_top_top_header border-e-2 text-fp3 font-bold h-6 mx-auto"></p>
  </div>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
import Typed from "typed.js";
let text_top_top_header = ref();
onMounted(() => {
  const typed = new Typed(text_top_top_header.value, {
    strings: JSON.parse(globalStore.appSettings.top_header),
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
    showCursor: false,
    // cursorChar: "|",
    // autoInsertCss: true,
  });
});
</script>
