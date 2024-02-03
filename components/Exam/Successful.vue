<template>
  <section>
    <div class="container mx-auto p-0 lg:w-[1000px] relative">
      <div class="mt-6 lg:mt-40 shadow-winer rounded-3xl sm:px-6 lg:p-10 lg:pb-0">
        <button
          @click="globalStore.HashURLFile(`${baseURL}/${ExamStore.pathFile}.pdf`)"
          v-if="ExamStore.lecture.latest"
          class="lg:absolute sm:block sm:text-center start-8 top-8 text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-2xl px-2 py-2 lg:py-1.5 focus:outline-none"
        >
          {{ $t("tha_certificate_pdf") }}
          <Icon name="ic:baseline-picture-as-pdf" class="text-white text-3xl lg:text-5xl -mt-1" />
        </button>
        <button
          v-if="ExamStore.lecture.latest"
          @click="globalStore.HashURLFile(`${baseURL}/${ExamStore.pathFile}.png`)"
          class="lg:absolute sm:block sm:mt-6 sm:text-center end-8 top-8 text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-2xl px-2 py-2 lg:py-1.5 focus:outline-none"
        >
          {{ $t("tha_certificate_png") }}
          <Icon name="ic:baseline-photo-library" class="text-white text-3xl lg:text-5xl -mt-1" />
        </button>
        <img src="~/assets/images/student/cup.png" alt="" class="block mx-auto w-20 lg:w-auto lg:-mt-52" />
        <span class="text-center block text-3xl lg:text-5xl my-2 dark:text-fpLightBack">{{ $t("congratulations") }}!</span>
        <p class="text-center text-fp1 text-xl lg:text-2xl mt-4">
          {{ $t("you_have") }} <span class="text-fp2">{{ ExamStore.DetailsQuestions.score }} %</span>
        </p>
        <div class="flex flex-col lg:flex-row justify-between items-center mt-10 border-t-2 py-10 lg:py-0 lg:w-[109%] sm:mx-auto lg:-ms-10">
          <div class="flex flex-col items-center justify-center w-full lg:w-1/3">
            <img src="~/assets/images/student/success.png" alt="" />
            <span class="mt-4 text-2xl dark:text-fpLightBack">{{ ExamStore.getDetailsQuestions.trueLengs }} {{ $t("qutions_correct") }}</span>
          </div>
          <div class="flex flex-col items-center justify-center lg:w-1/3 lg:border-x-2 p-10">
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
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const ExamStore = useExamStore();
const baseURL = useRuntimeConfig().public.baseURL;
</script>
