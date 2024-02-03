<template>
  <!-- <div class="sm:hidden">
    <BreadCrumbs :classes="'bg-breadcrumb put h-[450px] overlay text-white text-3xl'" :contents="[$t('about')]" />
  </div>
  <div class="lg:hidden">
    <BreadCrumbs :classes="'text-3xl'" :contents="[$t('about')]" />
  </div> -->
  <section class="bg-fp2/10 dark:bg-fpDark1 pt-10 pb-20">
    <div class="container mx-auto">
      <div>
        <h1 class="text-3xl lg:text-5xl text-fp1 font-bold border-b-2 border-fp1 w-fit mx-auto pb-2 lg:pb-6 mb-16">
          {{ $t("site_company") }}
        </h1>
        <div class="text-md lg:text-2xl font-medium dark:text-gray-300" v-html="globalStore.appSettings.site_company"></div>
      </div>
      <div class="mt-20">
        <h1 class="text-3xl lg:text-5xl text-fp1 font-bold border-b-2 border-fp1 w-fit mx-auto pb-2 lg:pb-6 mb-10">
          {{ $t("about_company") }}
        </h1>
        <p class="text-md lg:text-2xl font-medium dark:text-gray-300" v-html="globalStore.appSettings.about_company"></p>
      </div>
    </div>
  </section>
  <!-- <AboutFirstChoose class="mt-10" /> -->
  <section class="bg-fp1 dark:bg-fpDark3 py-6">
    <div class="container mx-auto">
      <div>
        <h2 class="text-3xl lg:text-4xl text-fp3 font-bold">{{ $t("see_us") }}</h2>
        <p class="text-md lg:text-xl text-white font-bold mt-4" v-html="globalStore.appSettings.our_vision"></p>
      </div>
      <div class="mt-10">
        <h2 class="text-3xl lg:text-4xl text-fp3 font-bold">{{ $t("mission_us") }}</h2>
        <p class="text-md lg:text-xl text-white font-bold mt-4" v-html="globalStore.appSettings.our_mission"></p>
      </div>
      <div class="mt-10">
        <h2 class="text-3xl lg:text-4xl text-fp3 font-bold">{{ $t("target_us") }}</h2>
        <p class="text-md lg:text-xl text-white font-bold mt-4" v-html="globalStore.appSettings.our_target"></p>
      </div>
    </div>
  </section>
</template>
<script setup>
const {currentLocale, dir} = useLang();
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {t, localeLocation} = useI18n();
const localePath = useLocalePath();
// navigateTo(localePath("/"));
useHead({
  title: t("about"),
  meta: [{name: "title", content: t("about")}],
});
</script>
