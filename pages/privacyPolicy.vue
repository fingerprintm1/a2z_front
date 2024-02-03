<template>
  <section class="bg-fp2/10 privacy-policy">
    <!-- <BreadCrumbs :classes="'bg-breadcrumb h-28 lg:h-[500px] text-white'" :contents="['سياسة الخصوصية']" /> -->
    <div class="container mx-auto bg-gray-100 dark:bg-gray-900 my-box-shadow pt-24 pb-40" v-html="globalStore.appSettings.privacy_policy"></div>
  </section>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {t} = useI18n();
useHead({
  title: t("privacy_policy"),
  meta: [{name: "title", content: t("privacy_policy")}],
});
</script>
<style>
.bg-breadcrumb {
  background-image: url("~/assets/images/home/hero.png");
  background-size: cover;
}
</style>
