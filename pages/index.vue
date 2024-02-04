<template>
  <div class="lg:container lg:mx-auto my-24" v-show="!globalStore.homeData.show">
    <Skeleton type="image_text" :count="6" />
  </div>
  <!-- {{ $nuxt.$route.name }}  thaa-->
  <div v-if="globalStore.homeData.show && Object.keys(globalStore.appSettings).length != 0">
    <HomeHero />
    <!-- <HomeNumbers /> -->

    <section class="py-8 lg:pb-24">
      <div class="container mx-auto">
        <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-6 lg:mb-8">{{ $t("teachers") }}</h2>
        <HomeTeachers :teachers="globalStore.homeData.teachers" />
      </div>
    </section>
    <section>
      <div class="lg:container mx-auto py-10 lg:pb-10 lg:pt-10">
        <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-6 mb-8">
          {{ $t("classes_courses") }}
        </h2>
        <HomeSubjects :subjects="globalStore.homeData.subjects" />
      </div>
    </section>
    <section class="lg:pb-24">
      <div class="container mx-auto">
        <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-6 mb-10 lg:mb-16">{{ $t("classes") }}</h2>
        <HomeSections :sections="globalStore.homeData.sections" />
      </div>
    </section>
    <section class="pb-8 lg:pb-24">
      <div class="container mx-auto">
        <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-2 lg:pb-6 my-10 lg:mb-8">{{ $t("all_offers") }}</h2>
        <HomeOffers :offers="globalStore.homeData.offers" />
      </div>
    </section>
    <section id="reviews" class="reviews">
      <div class="container mx-auto">
        <HomeReviews :reviews="globalStore.homeData.reviews" />
        <nuxt-link
          :to="localePath('/review')"
          class="text-white bg-fp2 hover:bg-fp1 transition-colors focus:ring-4 focus:ring-fp2 font-bold rounded-lg text-lg px-4 py-2.5 my-10 block focus:outline-none dark:focus:ring-fp2 w-fit mx-auto mt-10"
        >
          <Icon name="ic-outline-mode-edit-outline" class="text-3xl -mt-2" />
          {{ $t("write_review") }}
        </nuxt-link>
      </div>
    </section>
  </div>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {t} = useI18n();
globalStore.showHeaders = true;

await useAsyncData("getData", async () => {
  return globalStore.getDataHome();
});
useHead({
  title: t("home"),
  meta: [{name: "title", content: t("home")}],
});
</script>

<style>
[dir="rtl"] .rounded-bs-main {
  border-bottom-right-radius: 10rem;
}
[dir="ltr"] .rounded-bs-main {
  border-bottom-left-radius: 10rem;
}

.absolute {
  position: absolute !important;
}
.hero-section .splide__track.splide__track--slide {
  height: 100% !important;
}
.hero-section .splide__track {
  height: 100%;
}
</style>
