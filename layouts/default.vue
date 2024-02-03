<template>
  <div class="">
    <ClientOnly>
      <div v-show="globalStore.showHeaders">
        <TopHeader />
        <Header />
      </div>
    </ClientOnly>
    <div class="lg:container lg:mx-auto my-24" v-if="Object.keys(globalStore.appSettings).length == 0">
      <Skeleton type="image_text" :count="6" />
    </div>
    <slot />
    <ClientOnly>
      <Footer v-show="globalStore.showHeaders" />
    </ClientOnly>
    <NotificationContainer />
  </div>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {t} = useI18n();
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${t(`site_name`)} | ${titleChunk}` : `${t("home")}`;
  },
});
</script>
