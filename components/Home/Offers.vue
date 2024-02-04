<template v-if="offers.length > 0">
  <Splide :options="options" class="custom-arrow-slider">
    <SplideSlide class="rounded-2xl overflow-hidden sm:pb-20" v-for="offer in props.offers" :key="offer.id">
      <div class="shadow-xl lg:my-10 rounded-lg md:mx-4 sm:mx-1 bg-white dark:bg-fpDark2 flex flex-col pb-8">
        <nuxt-link :to="localePath(`/offer/${offer.id}`)">
          <img :src="`${baseURL}/images/${offer.photo}`" alt="post image" class="w-full h-[250px] object-cover rounded-t-2xl" />
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
    </SplideSlide>
  </Splide>
</template>
<script setup>
import {useTostStore} from "@/store/TostStore";
const tost = useTostStore();
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const route = useRoute();
const props = defineProps({
  offers: {
    type: Array,
    required: true,
  },
});
const options = {
  direction: dir.value,
  type: "loop",
  arrows: true,
  autoplay: true,
  interval: 4000,
  pagination: true,
  perPage: 3,
  gap: "0rem",
  breakpoints: {
    768: {
      perPage: 2,
      gap: "1rem",
    },
    640: {
      perPage: 1,
      gap: "0rem",
      pagination: true,
      arrows: false,
    },
  },
};
</script>
