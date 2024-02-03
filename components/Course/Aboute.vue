<template>
  <div>
    <a :href="`${baseURL}/images/${course.description_photo}`" target="_blank" class="flex justify-center items-center w-full">
      <img :src="`${baseURL}/images/${course.description_photo}`" class="w-auto object-cover lg:max-h-[800px]" />
    </a>
    <div class="border border-gray-300 rounded-lg mt-20">
      <h1 class="font-bold text-3xl mb-4 whitespace-nowrap text-fp1 p-4 border-b-2 border-fp1 shadow-md line-right text-center">{{ $t("course_aboute") }}</h1>
      <p class="p-4 lg:pr-10 font-bold text-md lg:text-lg space-y-2 dark:text-fpLightBack" v-html="course['description_' + currentLocale]"></p>
    </div>

    <div class="border border-gray-300 rounded-lg mt-20">
      <h1 class="font-bold text-xl lg:text-3xl mb-4 whitespace-nowrap text-fp1 p-4 border-b-2 border-fp1 shadow-md line-right text-center">{{ $t("trainers") }}</h1>
      <div class="lg:w-1/6 pb-4 mt-2 px-4 flex flex-col justify-center">
        <img v-if="course.teacher.photo" :src="`${baseURL}/images/${course.teacher.photo}`" class="rounded-lg" alt="" />
        <img v-else src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png" alt="user photo" class="rounded-lg" />
        <nuxt-link :to="localePath(`/teacher/${course.teacher.id}`)" class="text-2xl text-fp1 text-center font-bold whitespace-nowrap sm:mt-4">{{
          course.teacher["name_" + currentLocale]
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useCourseStore} from "@/store/CourseStore";
const CourseStore = useCourseStore();
const course = CourseStore.getCourse;
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
</script>
