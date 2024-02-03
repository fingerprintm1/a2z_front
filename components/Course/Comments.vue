<template>
  <div>
    <h1 class="text-2xl lg:text-5xl font-bold text-center text-fp1">{{ `${course.name} ` }}</h1>
    <div class="mt-20">
      <NuxtLink :to="localePath(`/section/${course.section.id}`)" class="mb-6 text-3xl dark:text-fpLightBack block">
        <span class="text-xl lg:text-3xl font-bold">{{ $t("section") }}</span
        >: <span class="text-xl lg:text-3xl font-medium text-fp1" v-text="currentLocale == 'ar' ? course.section.name_ar : course.name_en"></span>
      </NuxtLink>
      <hr />
    </div>
    <div class="space-y-10 lg:space-y-20">
      <h6 class="mt-8 lg:mt-16 mb-10 text-2xl text-fpDark2 dark:text-gray-300">{{ $t("comments") }} ({{ course.comments.length }})</h6>
      <div class="flex lg:items-center sm:flex-col sm:justify-center sm:border-b sm:pb-10" v-for="comment in course.comments" :key="comment.id">
        <div class="lg:h-40 rounded-full sm:flex sm:h-fit items-center sm:mb-4">
          <img
            v-if="comment.user.photo"
            :src="comment.user.oauth_type == null ? `${baseURL}/images/${comment.user.photo}` : `${comment.user.photo}`"
            alt="user photo"
            class="object-cover w-10 lg:w-20 h-10 lg:h-20 rounded-full inline lg:mx-auto"
          />
          <img
            v-else
            src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png"
            alt="user photo"
            class="object-cover w-10 lg:w-20 h-10 lg:h-20 rounded-full inline lg:mx-auto"
          />

          <p class="sm:mr-6 text-fp1 lg:block dark:text-gray-300" v-text="comment.user['name_' + currentLocale]"></p>
          <span class="text-gray-400 sm:ms-auto" v-text="CourseStore.formatDate(comment.created_at)"></span>
        </div>
        <div class="lg:ms-8 sm:text-center">
          <p class="text-gray-600 dark:text-gray-300 text-xl font-medium" v-text="comment.comment"></p>
          <a href="#replay" class="text-fp1 mt-2 text-xl font-normal flex items-center sm:justify-center">
            {{ $t("reply") }}
            <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
              <path
                d="M3.75 13H16.25C21.7728 13 26.25 17.1787 26.25 22.3333V24.6667M3.75 13L11.25 20M3.75 13L11.25 6"
                stroke="#489D33"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <form class="sm:mb-16 mt-10 lg:mt-24" id="replay" @submit.prevent="CourseStore.commentCourse(comment)" method="post" action @keydown="errors.clear($event.target.name)">
      <b class="font-medium text-3xl text-fp1">{{ $t("leave_response_course") }}</b>
      <div class="w-full mt-10 mb-6">
        <div class="relative">
          <!-- <label for="message" class="mt-8 text-gray-500 dark:text-gray-300 mb-10 block sm:text-sm">{{ $t("leave_response_course") }}</label> -->
          <textarea
            id="message"
            name="message"
            class="w-full bg-gray-200 dark:bg-fpDark2 dark:text-gray-300 bg-opacity-40 rounded focus:bg-[#e5e7eb99] h-52 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            :placeholder="$t('write_comment_here')"
            :class="errors.has('comment') ? 'is-invalid' : ''"
            v-model="comment"
            required
          ></textarea>
          <p v-if="errors.has('comment')" class="mt-2 text-sm text-red-500">{{ errors.get("comment") }}</p>
        </div>
      </div>
      <button
        type="submit"
        class="mt-8 lg:mt-16 sm:mx-auto block text-xl lg:text-2xl font-normal hover:border-fp1 border-2 border-white dark:border-fp2 rounded-md py-2 px-4 lg:py-4 lg:px-14 hover:text-fp1 cursor-pointer bg-fp1 text-white transition hover:bg-transparent"
      >
        {{ $t("add_comment") }}
      </button>
    </form>
  </div>
</template>
<script setup>
import {useCourseStore} from "@/store/CourseStore";
const CourseStore = useCourseStore();
const course = CourseStore.getCourse;
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const errors = reactive(useErrors());
let comment = ref();
</script>
