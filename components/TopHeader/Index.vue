<template>
  <section class="bg-fp1 dark:bg-fpDark1 py-3">
    <div class="container mx-auto flex justify-between xl:justify-center items-center">
      <TopHeaderAdvertisements v-if="Object.keys(globalStore.appSettings).length != 0" />
      <TopHeaderSearch />
      <TopHeaderButtons />
      <HeaderButtons class="flex lg:hidden" />
    </div>
  </section>
  <Transition name="lessons-down">
    <TopHeaderWallet v-if="auth.openModalWallet" />
  </Transition>
</template>

<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const auth = useAuthStore();
</script>

<style>
.z-101 {
  z-index: 101;
}
</style>
