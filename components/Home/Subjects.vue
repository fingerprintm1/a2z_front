<template>
  <Splide :options="options_other_slider" aria-label="My Favorite Images" class="custom-arrow-slider lg:px-16 pb-2">
    <SplideSlide class="rounded-2xl overflow-hidden sm:pb-10 sm:px-4" v-for="subject in props.subjects" :key="subject.id">
      <div class="shadow-xl lg:my-10 rounded-lg md:mx-4 sm:mx-1 bg-white dark:bg-fpDark2 flex flex-col lg:pb-8">
        <nuxt-link :to="localePath(`/subject/${subject.id}`)">
          <img :src="`${baseURL}/images/${subject.photo}`" alt="post image" class="w-full h-[250px] object-cover rounded-t-2xl" />
        </nuxt-link>
        <div class="px-6 h-full">
          <nuxt-link :to="localePath(`/subject/${subject.id}`)" class="text-2xl dark:text-fpLightBack text-fp1 font-bold mt-6 block">{{
            subject["name_" + currentLocale]
          }}</nuxt-link>
        </div>
        <nuxt-link
          :to="localePath(`/subject/${subject.id}`)"
          class="text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-sm px-2 py-2 mt-4 w-fit mx-auto focus:outline-none sm:mb-6"
        >
          {{ $t("go_course") }}
          <Icon name="ic:baseline-check-circle-outline" class="text-white text-xl -mt-1" />
        </nuxt-link>
      </div>
    </SplideSlide>
  </Splide>
</template>
<script setup>
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const route = useRoute();
let subjects = ref([]);
const props = defineProps({
  subjects: {
    type: Array,
    required: true,
  },
});
const options_other_slider = {
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
      pagination: false,
      arrows: false,
    },
  },
};
</script>
