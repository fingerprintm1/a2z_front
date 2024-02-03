<template>
  <div class="bg-cover backdrop overlay lg:py-24" :style="`background-image: url('${baseURL}/images/${props.bg_course}')`">
    <div class="lg:container lg:mx-auto flex sm:flex-col-reverse gap-x-10 sm:items-center relative z-50 sm:bg-white dark:sm:bg-fpDark1 sm:px-4">
      <div class="w-full lg:w-1/3">
        <button @click="CourseStore.setValueTap('lectures')" class="bg-white overflow-hidden lg:rounded-lg shadow-xl transform hover:scale-105 duration-150 w-full">
          <img :src="`${baseURL}/images/${course.photo}`" class="h-[300px] w-full" />
        </button>
        <!-- <vue-plyr class="bg-white overflow-hidden lg:rounded-lg shadow-xl transform hover:scale-105 duration-150 w-full">
            <div data-plyr-provider="youtube" :data-plyr-embed-id="course.video"></div>
          </vue-plyr> -->
        <button
          @click="PayStore.setValueOrder('course', course.id, course.price)"
          v-if="CourseStore.getCourse.subscribed == 0"
          class="w-full whitespace-nowrap transition font-bold rounded-lg text-lg px-2 py-3 focus:outline-none mt-4 block text-center bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t text-white"
        >
          <span>{{ course.price != 0 ? $t("subscription") : $t("click_free_course") }}</span>
          <Icon name="ic:baseline-check-circle-outline" class="text-xl -mt-1" />
        </button>
        <button v-else class="w-full whitespace-nowrap transition font-bold rounded-lg text-lg px-2 py-3 focus:outline-none mt-4 block text-center bg-green-600 text-green-200">
          <span>{{ $t("subscriber") }}</span>
          <Icon name="ic:baseline-check-circle-outline" class="text-xl -mt-1" />
        </button>
      </div>
      <div class="lg:w-2/3 sm:container sm:mx-auto hero_course p-6 lg:rounded-lg 2xl:h-[300px]">
        <div class="sm:flex-col flex justify-between items-center mb-4">
          <h2 class="text-fp1 lg:text-white text-4xl font-semibold">{{ `${course.name} ` }}</h2>
          <span class="flex mt-4" v-if="course.price != 0">
            <span class="text-4xl font-bold text-green-400">{{ course.price }} {{ course.currency.name }}</span>
            <sub class="text-red-600 ms-1 leading-10 line-through text-xl">{{ course.sub_price }} {{ course.currency.name }}</sub>
          </span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-8">
          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-1" name="ic:outline-person" />
              <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-2xl -mb-2">{{ $t("number_subscriptions") }} ({{ course.subscribers }}) ✅</p>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-2" name="ic:outline-ondemand-video" />
              <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-2xl">{{ $t("count_videos") }} ({{ course.count_videos }})</p>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-2" name="ic:sharp-question-answer" />
              <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-2xl">{{ $t("count_exams") }} ({{ course.count_exams }})</p>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-2" name="ic:baseline-alarm-on" />
              <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-2xl">{{ $t("exam_duration") }} ({{ course.duration_exams }}) {{ $t("minutes") }}</p>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-2" name="ph:files-fill" />
              <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-2xl -mb-2">{{ $t("count_files") }} ({{ course.count_attachments }})</p>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-2" name="ic:outline-insert-comment" />
              <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-2xl">{{ $t("count_comments") }} ({{ course.comments.length }})</p>
            </div>
          </div>

          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-2" name="system-uicons:panel-sectioned" />
              <nuxt-link
                :to="localePath(`/section/${course.section.id}`)"
                class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-xl hover:text-fp1 -mb-2"
                >{{ course.section["name_" + currentLocale] }}</nuxt-link
              >
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-2" name="ic:sharp-menu-book" />
              <p class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-xl -mb-2">{{ $t("subject") }} ({{ course.subject["name_" + currentLocale] }})</p>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <Icon class="text-4xl text-fp2 me-2" name="ic:outline-person" />
              <nuxt-link :to="localePath(`/teacher/${course.teacher.id}`)" class="text-fpDark1 dark:sm:text-white lg:text-white text-lg font-bold lg:text-xl hover:text-fp1 -mb-2"
                >{{ $t("coach") }} {{ course.teacher["name_" + currentLocale] }}</nuxt-link
              >
            </div>
          </div>
        </div>
        <!-- <nuxt-link
            :to="localePath(`/exam/${course.id}`)"
            v-if="course.subscribed == 1"
            class="w-full whitespace-nowrap transition font-bold rounded-lg text-sm lg:text-lg px-2 py-3 focus:outline-none mt-4 block text-center bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t text-white"
          >
            <span>{{ $t("exam") }}</span>
            <Icon name="mdi:certificate-outline" class="text-4xl text-fp2 -mt-1 ms-2" />
          </nuxt-link> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import {useCourseStore} from "@/store/CourseStore";
import {usePayStore} from "@/store/PayStore";
const PayStore = usePayStore();
const CourseStore = useCourseStore();
const course = CourseStore.getCourse;
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const route = useRoute();
const props = defineProps({
  bg_course: {
    type: String,
    required: true,
  },
});
</script>
