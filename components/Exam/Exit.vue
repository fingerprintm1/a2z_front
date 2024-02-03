<template>
  <div>
    <span @click="ExamStore.exit = !ExamStore.exit" :class="ExamStore.exit ? 'open' : ''" class="overlay-leave fixed inset-0 z-50 bg-black/80 hidden backdrop-blur-sm"></span>
    <div
      id="alert-leave"
      :class="ExamStore.exit ? 'open' : ''"
      class="alert-leave transition-all duration-300 fixed inset-x-0 z-50 py-10 lg:py-16 lg:px-20 bg-white dark:bg-fpDark2 flex flex-col lg:flex-row items-center justify-between"
    >
      <div>
        <p class="text-3xl font-medium dark:text-fpLightBack">{{ $t("confirm_exit") }}</p>
        <span class="text-gray-500 dark:text-fpLightGray">{{ $t("com_back_soon") }}</span>
      </div>
      <div class="flex items-center mt-6 lg:mt-0">
        <button
          @click="ExamStore.exit = !ExamStore.exit"
          type="button"
          id="button-leave"
          class="me-4 text-fp2 hover:text-white hover:bg-fp2 border-2 border-fp2 focus:outline-none focus:ring-4 focus:ring-fp2/70 font-medium rounded-3xl py-2 transition text-center lg:text-xl w-40"
        >
          {{ $t("keep") }}
        </button>
        <button
          @click="ExamStore.exitExam()"
          type="button"
          class="text-white bg-fp1 hover:bg-fp2 border-2 border-fp2 focus:outline-none focus:ring-4 focus:ring-fp2/70 font-medium rounded-3xl py-2 transition text-center lg:text-xl w-40"
        >
          {{ $t("exit") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useExamStore} from "@/store/ExamStore";
const ExamStore = useExamStore();
</script>
