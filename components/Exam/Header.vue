<template>
  <header class="pt-10">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <nuxt-link :to="localePath('/')" class="w-2/12">
          <img src="~/assets/images/global/logo.png" alt="" class="w-24" />
        </nuxt-link>
        <div v-if="ExamStore.activeSection == 'questions'" class="w-8/12 h-4 lg:h-4 relative bg-fpLightBack dark:bg-fpDark2 rounded-full">
          <span
            :style="`width: ${(ExamStore.DetailsQuestions.step / ExamStore.getDetailsQuestions.lenQuestions) * 100}%;`"
            :class="`absolute inset-y-0 bg-fp1  transition-all  rounded-full after:content-[''] center-absolute-after after:w-10/12 after:bg-gray-300/50 after:h-1 lg:after:h-2 after:rounded-full`"
          ></span>
          <span class="center-absolute bg-fpLightBack dark:bg-fpDark2 w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center">
            <img src="~/assets/images/student/strong.svg" alt="" class="w-6 lg:w-auto" />
          </span>
          <span class="absolute end-0 top-1/2 -translate-y-1/2 bg-fpLightBack dark:bg-fpDark2 w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center">
            <img src="~/assets/images/student/cup.svg" alt="" class="w-6 lg:w-auto" />
          </span>
        </div>
        <div class="w-1/12 flex items-end">
          <button class="ms-auto" @click="ExamStore.exit = !ExamStore.exit">
            <svg class="w-6 h-6 lg:w-8 lg:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.5249 16L30.2749 5.27498C30.7456 4.80422 31.0101 4.16573 31.0101 3.49998C31.0101 2.83422 30.7456 2.19573 30.2749 1.72498C29.8041 1.25422 29.1656 0.989746 28.4999 0.989746C27.8341 0.989746 27.1956 1.25422 26.7249 1.72498L15.9999 12.475L5.27485 1.72498C4.80409 1.25422 4.1656 0.989746 3.49985 0.989746C2.83409 0.989746 2.19561 1.25422 1.72485 1.72498C1.25409 2.19573 0.989618 2.83422 0.989618 3.49998C0.989618 4.16573 1.25409 4.80422 1.72485 5.27498L12.4748 16L1.72485 26.725C1.49053 26.9574 1.30454 27.2339 1.17762 27.5385C1.0507 27.8432 0.985352 28.1699 0.985352 28.5C0.985352 28.83 1.0507 29.1568 1.17762 29.4614C1.30454 29.7661 1.49053 30.0426 1.72485 30.275C1.95725 30.5093 2.23376 30.6953 2.53841 30.8222C2.84305 30.9491 3.16982 31.0145 3.49985 31.0145C3.82988 31.0145 4.15664 30.9491 4.46129 30.8222C4.76594 30.6953 5.04244 30.5093 5.27485 30.275L15.9999 19.525L26.7249 30.275C26.9573 30.5093 27.2338 30.6953 27.5384 30.8222C27.8431 30.9491 28.1698 31.0145 28.4999 31.0145C28.8299 31.0145 29.1566 30.9491 29.4613 30.8222C29.7659 30.6953 30.0424 30.5093 30.2749 30.275C30.5092 30.0426 30.6952 29.7661 30.8221 29.4614C30.949 29.1568 31.0143 28.83 31.0143 28.5C31.0143 28.1699 30.949 27.8432 30.8221 27.5385C30.6952 27.2339 30.5092 26.9574 30.2749 26.725L19.5249 16Z"
                fill="#A5A5A5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import {useExamStore} from "@/store/ExamStore";
const ExamStore = useExamStore();
</script>
