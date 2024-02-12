<template>
  <div class="border border-gray-300 rounded-lg divide-y-2">
    <h1 class="font-bold text-3xl whitespace-nowrap text-fp1 p-4 shadow-md line-right">{{ $t("lectures") }}</h1>
    <div v-for="chapter in CourseStore.getCourse.chapters" :key="chapter.id">
      <div class="flex bg-fp1 relative z-50">
        <h2 id="heading-1" class="w-full" @click="CourseStore.setActiveChapter(chapter.id)">
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium bg-fp1 dark:bg-fpDark1 hover:text-fp2 transition group"
            aria-expanded="true"
            :class="[CourseStore.activeChapter[chapter.id] == chapter.id ? 'text-fp2 fill-fp2' : 'text-white ']"
          >
            <div class="flex justify-between items-center">
              <!-- <img src="" alt="" /> -->
              <!-- <img :src="'/images/student/live_lectures/light.svg'" alt="" /> -->
              <span class="ms-3 lg:text-2xl text-inherit font-bold">{{ chapter["name_" + currentLocale] }}</span>
            </div>
            <svg
              :class="[CourseStore.activeChapter[chapter.id] == chapter.id ? 'rotate-0 fill-fp3' : 'rotate-180 fill-white']"
              class="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:fill-fp2"
              viewBox="0 0 31 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="15.1522" cy="15" rx="15.1522" ry="15" fill="inherit" />
              <path
                class="transition-transform duration-300 group-hover:stroke-white"
                d="M8.88258 18.1034L15.1525 11.8965L21.4224 18.1034"
                :stroke="[CourseStore.activeChapter[chapter.id] == chapter.id ? 'white' : 'black']"
                fill="transparent"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </h2>
      </div>
      <transition name="lessons-down">
        <div v-if="CourseStore.activeChapter[chapter.id] == chapter.id">
          <div
            v-for="lecture in chapter.lectures"
            :key="lecture.id"
            class="relative py-2 lg:pr-10 flex items-center cursor-pointer border-t-white bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark2/80 transition border-b border-b-gray-300"
          >
            <button
              v-if="(lecture.type_video === 'youtube' || lecture.type_video === 'server' || lecture.type_video === 'server_id') && lecture.subscribed"
              @click="CourseStore.setValueShowVideo(true, lecture.videoID, lecture.title, lecture.type_video)"
              type="button"
              class="button_video absolute inset-0 z-50 w-full"
            ></button>

            <button v-else-if="!lecture.subscribed" @click="PayStore.setValueOrder('lecture', lecture.id)" type="button" class="absolute inset-0"></button>
            <div class="flex sm:flex-col sm:gap-y-4 sm:py-2 justify-between items-center w-full">
              <div class="flex items-center sm:w-full sm:justify-between sm:px-4">
                <Icon name="ic-baseline-play-circle" class="text-3xl lg:ms-6 dark:text-white" />
                <span class="font-bold sm:text-md md:text-xl text-fp1 lg:ms-2">{{ lecture.title }}</span>
                <span class="font-normal sm:text-md md:text-xl text-fp2 lg:ms-2" v-if="lecture.price != 0 && !course.subscribed">({{ lecture.price }} جنية)</span>
                <Icon :name="`${lecture.subscribed ? 'mdi-eye-outline' : 'ic-baseline-lock'}`" class="sm:dark:text-white text-xl lg:hidden" />
              </div>
              <div class="flex items-center gap-x-4 sm:w-full sm:justify-center sm:px-4">
                <nuxt-link
                  :to="{path: localePath(`/exam/${course.id}`), query: {plan: encodeString(lecture.id), related: encodeString('exams')}}"
                  v-if="lecture.questions_count && lecture.subscribed"
                  class="ms-auto text-green-500 text-xl font-bold relative z-50"
                >
                  <span
                    class="text-white whitespace-nowrap bg-gradient-to-b from-green-400 to-green-500/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-sm px-2 py-2.5 focus:outline-none"
                  >
                    {{ $t("exam_lecture") }}
                    <Icon name="mdi:certificate-outline" class="text-white text-xl -mt-1" />
                  </span>
                </nuxt-link>
                <nuxt-link
                  :to="{path: localePath(`/exam/${course.id}`), query: {plan: encodeString(lecture.id), related: encodeString('assignments')}}"
                  v-if="lecture.assignments_count && lecture.subscribed"
                  class="ms-auto text-green-500 text-xl font-bold relative z-50"
                >
                  <span
                    class="text-white whitespace-nowrap bg-gradient-to-b from-green-400 to-green-500/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-sm px-2 py-2.5 focus:outline-none"
                  >
                    {{ $t("assignments_lecture") }}
                    <Icon name="ic:baseline-assignment-turned-in" class="text-white text-xl -mt-1" />
                  </span>
                </nuxt-link>
                <a
                  v-if="lecture.type_video === 'zoom' && lecture.subscribed"
                  class="ms-auto text-green-500 text-xl font-bold"
                  :href="`${CourseStore.isDateNow(lecture.start_time) ? lecture.join_url : 'javascript:;'}`"
                  target="_blank"
                >
                  <span
                    v-if="CourseStore.isDateNow(lecture.start_time)"
                    class="text-white whitespace-nowrap bg-gradient-to-b from-green-400 to-green-500/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-sm px-2 py-2.5 focus:outline-none"
                  >
                    {{ $t("join_now") }}
                    <Icon name="ic:baseline-check-circle-outline" class="text-white text-xl -mt-1" />
                  </span>
                  <span v-else class="-mb-2">{{ CourseStore.formatDate(lecture.start_time) }}</span>
                </a>
                <button
                  v-if="lecture.subscribed && lecture.attachments_count"
                  @click="CourseStore.setAttachments(lecture.attachments, lecture.title)"
                  class="text-green-500 text-xl font-bold relative z-50"
                >
                  <span
                    class="text-white whitespace-nowrap bg-gradient-to-b from-green-400 to-green-500/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-sm px-2 py-2.5 focus:outline-none"
                  >
                    {{ $t("binding_assembly") }}
                    <Icon name="ph:files-bold" class="text-white text-xl -mt-1" />
                  </span>
                </button>
                <Icon :name="`${lecture.subscribed ? 'mdi-eye-outline' : 'ic-baseline-lock'}`" class="sm:text-white lg:dark:text-white text-xl mx-4 hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </transition>
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
const encodeString = string => {
  return btoa(string);
};
</script>
<style scoped>
.hidden {
  display: none !important;
}
@media (min-width: 1024px) {
  .lg\:block {
    display: block !important;
  }
}
</style>
