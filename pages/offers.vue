<template>
  <section class="py-8 lg:py-24">
    <div class="container mx-auto">
      <h1 class="text-fp1 text-3xl lg:text-4xl font-bold mt-10 lg:mt-0 mb-6">{{ $t("all_offers") }}</h1>
      <Skeleton type="card" :count="3" v-if="offers.length == 0" />
      <div class="lg:w-5/6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 h-fit" v-if="offers.length > 0">
        <div class="rounded-2xl overflow-hidden sm:pb-20" v-for="offer in offers" :key="offer.id">
          <div class="shadow-xl lg:my-10 rounded-lg md:mx-4 sm:mx-1 bg-white dark:bg-fpDark2 flex flex-col pb-8">
            <nuxt-link :to="localePath(`/offer/${offer.id}`)">
              <img :src="`${baseURL}/images/${offer.photo}`" alt="post image" class="w-full object-cover rounded-t-2xl" />
            </nuxt-link>
            <div class="px-6 h-full">
              <nuxt-link :to="localePath(`/offer/${offer.id}`)" class="text-nd dark:text-fpLightBack text-fp1 font-bold mt-6 block">{{ offer["name_" + currentLocale] }}</nuxt-link>
              <span class="text-fpDarkGray dark:text-fpLightBack text-sm block mt-1"
                ><Icon class="text-xl text-fp1 me-1" name="ic:outline-person" />{{ $t("number_subscriptions") }} {{ offer.subscribers }}</span
              >
              <span class="text-fpDarkGray dark:text-fpLightBack text-sm block mt-1"
                ><Icon class="text-xl text-fp1 me-1" name="healthicons:low-level" />{{ $t("duration") }}
                <span :dir="currentLocale == 'ar' ? 'ltr' : 'rtl'"> {{ offer.duration.replace(/-/g, "/") }}</span>
              </span>
              <div class="mt-1 flex">
                <Icon v-for="i in offer.stars" class="text-xl text-fp1 me-1" name="ic:baseline-star-purple500" />
              </div>
              <div class="flex justify-between items-center mt-2">
                <span class="text-fp1 flex text-xl">{{ offer.price }} {{ offer.currency.name }} </span>
                <nuxt-link
                  :to="localePath(`/offer/${offer.id}`)"
                  class="text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-sm px-2 py-1.5 focus:outline-none"
                >
                  {{ $t("subscription") }}
                  <Icon name="ic:baseline-check-circle-outline" class="text-white text-xl -mt-1" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useTostStore} from "@/store/TostStore";
const tost = useTostStore();
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const route = useRoute();
let offers = ref([]);
const {t} = useI18n();
useHead({
  title: t("offers"),
  meta: [{name: "title", content: t("offers")}],
});

const getOffers = () => {
  $fetch(`${useRuntimeConfig().public.apiURL}/getOffers`).then(res => {
    if (res.status) {
      offers.value = res.data;
    } else {
      tost.add({
        type: "error",
        message: res.message,
      });
    }
  });
};
await useAsyncData("getOffers", async () => {
  return getOffers();
});
</script>
