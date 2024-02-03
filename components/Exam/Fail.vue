<template>
  <section>
    <div class="container mx-auto p-0 lg:w-[1000px] relative">
      <div class="mt-6 lg:mt-40 shadow-winer rounded-3xl lg:p-10 pb-0">
        <button @click="ExamStore.reTest()" class="absolute start-2 lg:start-8 top-2 lg:top-8 flex flex-col lg:flex-row items-center">
          <svg width="50" height="50" viewBox="0 0 50 50" class="w-10 lg:w-16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 17.9688V2.34375L32.8125 10.1562L25 17.9688Z" fill="#FF8000" />
            <path d="M25 32.0312V47.6562L17.1875 39.8438L25 32.0312Z" fill="#3EBBDD" />
            <path class="fill-fpDark1 dark:fill-fpLightBack" d="M6.25 34.375H4.6875V9.375H32.8125V10.9375H6.25V34.375Z" />
            <path
              class="fill-fpDark1 dark:fill-fpLightBack"
              d="M25.5523 18.5212L24.4477 17.4165L31.7078 10.1563L24.4477 2.89619L25.5523 1.7915L33.9172 10.1563L25.5523 18.5212ZM45.3125 40.6251H17.1875V39.0626H43.75V15.6251H45.3125V40.6251Z"
            />
            <path d="M24.4479 48.2087L16.083 39.8438L24.4479 31.479L25.5525 32.5837L18.2924 39.8438L25.5525 47.104L24.4479 48.2087Z" />
          </svg>
          <span class="ms-2 mt-1 text-md lg:text-2xl font-medium dark:text-fpLightBack">{{ $t("re_test") }}</span>
        </button>
        <img src="~/assets/images/student/sad.png" alt="" class="block mx-auto w-20 lg:w-auto lg:-mt-28" />
        <span class="text-center block text-3xl lg:text-5xl mt-6 dark:text-fpLightBack">{{ $t("good_luck") }}</span>
        <p class="text-center text-fp1 text-xl lg:text-2xl mt-4">
          {{ $t("you_have") }} <span class="text-fp2">{{ ExamStore.DetailsQuestions.score }} %</span>
        </p>
        <div class="flex flex-col lg:flex-row justify-between items-center mt-10 border-t-2 py-10 lg:py-0">
          <div class="flex flex-col items-center justify-center lg:w-1/3">
            <img src="~/assets/images/student/success.png" alt="" />
            <span class="mt-4 text-2xl dark:text-fpLightBack">{{ ExamStore.getDetailsQuestions.trueLengs }} {{ $t("qutions_correct") }}</span>
          </div>
          <div class="flex flex-col items-center justify-center w-full lg:w-1/3 lg:border-x-2 p-10">
            <img src="~/assets/images/student/error.png" alt="" />
            <span class="mt-4 text-2xl dark:text-fpLightBack">{{ ExamStore.DetailsQuestions.falseLengs }} {{ $t("qutions_mistake") }}</span>
          </div>
          <div class="flex flex-col items-center justify-center lg:w-1/3">
            <img src="~/assets/images/student/question-mark.png" alt="" />
            <span class="mt-4 text-2xl dark:text-fpLightBack">{{ ExamStore.getDetailsQuestions.lenQuestions }} {{ $t("qutions") }} </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useExamStore} from "@/store/ExamStore";
const ExamStore = useExamStore();
</script>
