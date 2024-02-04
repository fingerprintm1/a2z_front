<template v-if="teachers.length > 0">
  <Splide :options="options" class="custom-arrow-slider">
    <SplideSlide class="rounded-2xl overflow-hidden sm:pb-20" v-for="teacher in props.teachers" :key="teacher.id">
      <div class="rounded-lg md:mx-24 sm:mx-1 bg-white dark:bg-fpDark2 flex flex-col">
        <nuxt-link :to="localePath(`/teacher/${teacher.id}`)">
          <img :src="`${baseURL}/images/${teacher.photo}`" alt="post image" class="w-full object-cover rounded-t-2xl" />
        </nuxt-link>
        <div class="px-6 h-full">
          <nuxt-link :to="localePath(`/teacher/${teacher.id}`)" class="text-4xl text-center dark:text-fpLightBack text-fp1 font-bold mt-4 block">{{
            teacher["name_" + currentLocale]
          }}</nuxt-link>
        </div>
        <div class="flex items-center justify-center">
          <span class="text-2xl text-fp3 font-bold" v-text="$t('subjects')"></span>
          <div class="flex items-center flex-wrap ms-2 whitespace-nowrap gap-x-2">
            <span v-for="subject in teacher.courses" :key="subject.id" class="text-fp2 hover:text-fp3 text-xl">{{ subject["name_" + currentLocale] }},</span>
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
const props = defineProps({
  teachers: {
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
  pagination: false,
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
