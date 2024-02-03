<template>
  <section v-if="Object.keys(ExamStore.getCourse).length">
    <section>
      <div class="container mx-auto relative">
        <div class="mt-6 lg:mt-32 shadow-winer rounded-3xl pt-6 lg:pt-20">
          <img src="~/assets/images/student/rocket.png" alt="" class="block mx-auto w-20 lg:w-auto lg:-mt-32 mb-5" />
          <div class="py-4 flex items-center justify-center flex-wrap">
            <a class="font-medium text-p-dark text-lg lg:text-3xl dark:text-fpLightBack"> {{ course.section["name_" + currentLocale] }}</a>
            <span class="w-3 h-3 rounded-full bg-gray-300 mx-2 lg:mx-4"></span>
            <a class="font-medium text-fp1 text-lg lg:text-2xl"> {{ `${course.name} ` }} </a>
          </div>
          <span class="flex items-center justify-center text-xl lg:text-5xl font-medium text-fp1 mt-6">
            {{ $t("increase_enthusiasm") }}
            <img src="~/assets/images/student/dumbbell.png" alt="" class="ms-2 w-6 lg:w-auto" />
          </span>
          <p class="text-gray-600 bg-yellow-300/50 lg:text-xl mt-4 mb-6 px-4 py-2 rounded-lg w-fit mx-auto dark:text-white">
            <Icon name="ooui:notice" class="text-start text-yellow-400" /> {{ $t("confirm_name") }}
          </p>
          <!-- <p class="text-gray-600 bg-yellow-300/50 lg:text-xl mt-4 mb-6 px-4 py-2 rounded-lg w-fit mx-auto dark:text-white">
            <Icon name="ooui:notice" class="text-start text-yellow-400" /> {{ $t("if_not_passed") }} {{ lecture.re_exam_count }} {{ $t("minutes") }} {{ $t("re_exam") }}
          </p> -->
          <div class="flex flex-col lg:flex-row justify-between items-center mt-10 border-t-2 py-10 lg:py-0" :class="ExamStore.related == 'exams' ? '' : 'justify-center'">
            <div v-if="ExamStore.related == 'exams'" class="flex flex-col items-center justify-center w-full lg:w-1/3 lg:px-14 lg:py-11">
              <img src="~/assets/images/student/time.png" alt="" />
              <span class="mt-8 text-2xl dark:text-fpLightBack" v-text="`${$t('duration_exam')}  ${+lecture.duration_exam} ${$t('minutes')}`"> </span>
            </div>
            <div class="flex flex-col items-center justify-center lg:w-1/3 lg:border-x-2 lg:px-14 py-12">
              <img src="~/assets/images/student/question-mark.png" alt="" />
              <span class="mt-8 text-2xl dark:text-fpLightBack" v-text="`${$t('count_qutions')} ${ExamStore.getDetailsQuestions.lenQuestions}`"></span>
            </div>
            <div v-if="ExamStore.related == 'exams'" class="flex flex-col items-center justify-center lg:w-1/3">
              <img src="~/assets/images/student/analysis.png" alt="" />
              <span class="mt-8 text-2xl dark:text-fpLightBack">{{ $t("try_number") }} {{ lecture.re_exam_count }} </span>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center my-10 lg:mt-20 mx-auto px-6">
          <button
            @click="ExamStore.questionStart()"
            type="button"
            class="text-white text-center text-xl font-medium bg-fp1 hover:bg-fp2 focus:outline-none focus:ring-4 focus:ring-fp1/90 rounded-full py-2 lg:py-4 transition shadow-xl whitespace-nowrap flex items-center w-4/6 lg:w-1/2"
          >
            <span class="mt-1 me-2 w-full text-center">{{ $t("start_test") }}</span>
          </button>
        </div>
      </div>
    </section>
  </section>
</template>
<script setup>
import {useExamStore} from "@/store/ExamStore";
const ExamStore = useExamStore();
const course = ExamStore.getCourse;
const lecture = ExamStore.getLecture;
const {currentLocale, dir} = useLang();
</script>
<style scoped>
.justify-center {
  justify-content: center !important;
}
</style>
