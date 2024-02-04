<template>
  <div class="lg:container lg:mx-auto my-24" v-if="Object.keys(OfferStore.getOffer).length == 0">
    <Skeleton type="image_text" :count="6" />
  </div>
  <section class="" v-if="Object.keys(OfferStore.getOffer).length">
    <div class="bg-cover backdrop overlay lg:py-24" :style="`background-image: url('${baseURL}/images/${globalStore.appSettings.bg_course}')`">
      <div class="lg:container lg:mx-auto flex sm:flex-col gap-x-10 sm:items-center relative z-50 h-[300px]">
        <div class="bg-white overflow-hidden rounded-lg shadow-xl transform hover:scale-105 duration-150 w-full lg:w-1/3 h-full">
          <img :src="`${baseURL}/images/${OfferStore.getOffer.photo}`" alt="post image" class="w-full h-full" />
        </div>
        <div class="lg:w-2/3 h-full sm:container sm:mx-auto hero_course p-6 lg:rounded-lg sm:bg-white dark:sm:bg-fpDark1">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-fp1 lg:text-white font-bold text-xl lg:text-3xl whitespace-break-spaces lg:whitespace-nowrap">
              {{ OfferStore.getOffer["name_" + currentLocale] }}
            </h2>
            <span class="text-fp2 lg:text-white flex mt-4 text-xl font-bold"> {{ OfferStore.getOffer.price }} {{ OfferStore.getOffer.currency.name }} </span>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <div class="mt-4">
              <div class="flex items-center">
                <Icon class="text-4xl text-fp1 me-1" name="ic:outline-person" />
                <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg lg:text-2xl">{{ $t("number_subscriptions") }} ({{ OfferStore.getOffer.subscribers }}) ✅</p>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center">
                <Icon class="text-4xl text-fp1 me-2" name="healthicons:low-level" />
                <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg lg:text-2xl">
                  {{ $t("duration") }} <span :dir="currentLocale == 'ar' ? 'ltr' : 'rtl'"> {{ OfferStore.getOffer.duration.replace(/-/g, "/") }}</span>
                </p>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center">
                <Icon class="text-4xl text-fp1 me-2" name="ic:outline-rate-review" />
                <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg lg:text-2xl">{{ $t("number_ratings") }}</p>
                <div class="flex ms-2">
                  <Icon v-for="i in OfferStore.getOffer.stars" class="text-2xl lg:text-white dark:text-fp1 me-1" name="ic:baseline-star-purple500" />
                </div>
              </div>
            </div>
          </div>
          <button
            @click="PayStore.setValueOrder('offer', OfferStore.getOffer.id, OfferStore.getOffer.price)"
            v-if="OfferStore.getOffer.subscribed == 0"
            class="w-full whitespace-nowrap transition font-bold rounded-lg text-lg px-2 py-3 focus:outline-none mt-4 block text-center bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t text-white"
          >
            <span>{{ $t("subscription") }}</span>
            <Icon name="ic:baseline-check-circle-outline" class="text-xl -mt-1" />
          </button>
          <button v-else class="w-full whitespace-nowrap transition font-bold rounded-lg text-lg px-2 py-3 focus:outline-none mt-4 block text-center bg-green-600 text-green-200">
            <span>{{ $t("subscriber") }}</span>
            <Icon name="ic:baseline-check-circle-outline" class="text-xl -mt-1" />
          </button>
        </div>
      </div>
    </div>
    <div class="container mx-auto pb-24 sm:pt-20">
      <div class="border border-gray-300 rounded-lg mt-20">
        <h1 class="font-bold text-3xl mb-4 whitespace-nowrap text-fp1 p-4 border-b-2 border-fp1 shadow-md line-right text-center">{{ $t("about_offer") }}</h1>
        <p class="p-4 lg:pr-10 font-bold text-md lg:text-lg space-y-2 dark:text-fpLightBack" v-html="OfferStore.getOffer['description_' + currentLocale]"></p>
      </div>
      <div class="border border-gray-300 rounded-lg mt-20">
        <h1 class="font-bold text-3xl mb-4 whitespace-nowrap text-fp1 p-4 border-b-2 border-fp1 shadow-md line-right text-center">{{ $t("courses_offer") }}</h1>
        <CourseCourses v-if="OfferStore.getOffer.courses.length" :courses="OfferStore.getOffer.courses" />
      </div>
    </div>
    <Transition name="lessons-down">
      <CourseModalPay v-if="PayStore.getPayData.show" />
    </Transition>
  </section>
</template>
<script setup>
import {useOfferStore} from "@/store/OfferStore";
import {useGlobalStore} from "@/store/GlobalStore";
import {usePayStore} from "@/store/PayStore";
const PayStore = usePayStore();
const globalStore = useGlobalStore();
const OfferStore = useOfferStore();
const {currentLocale} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const route = useRoute();

await OfferStore.getOfferApi(route.params.id).then(res => {
  try {
    useHead({
      title: res["name_" + currentLocale.value],
      meta: [{name: "title", content: res["name_" + currentLocale.value]}],
    });
  } catch (error) {
    console.log(error);
  }
});
</script>
