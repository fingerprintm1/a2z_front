<template>
  <Html :lang="currentLocale" oncontextmenu="return false">
    <Body :dir="dir" class="dark:bg-gray-900 overflow-x-clip sm:pb-0">
      <ButtonUp />
      <NuxtLoadingIndicator />
      <Loader />
      <!-- v-if="Object.keys(globalStore.appSettings).length != 0" -->
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {currentLocale, dir} = useLang();
await useAsyncData("app", async () => {
  return globalStore.app();
});

if (process.client) {
  document.onkeydown = e => {
    if (e.ctrlKey && e.shiftKey && e.key == "I") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "C") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "J") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key == "U") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key == "Z") {
      e.preventDefault();
    }
  };
}
</script>
