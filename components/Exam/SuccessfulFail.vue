<template>
  <div class="container mx-auto p-0 lg:w-[1000px] relative">
    <div class="flex items-center justify-between my-10 lg:mt-20 px-6">
      <button
        @click="ExamStore.exitExam()"
        type="button"
        class="text-white text-center text-lg xl:text-xl font-medium bg-fp1 hover:bg-fp2 focus:outline-none focus:ring-4 focus:ring-fp1/90 rounded-full px-3 xl:px-10 py-1 lg:py-4 transition shadow-xl whitespace-nowrap flex items-center"
      >
        <span class="mt-1 ms-2">{{ $t("show_course") }}</span>
      </button>
      <button
        @click="ExamStore.activeSection = 'questions'"
        type="button"
        class="text-white text-center text-lg xl:text-xl font-medium bg-fp1 hover:bg-fp2 focus:outline-none focus:ring-4 focus:ring-fp1/90 rounded-full px-3 xl:px-20 py-1 lg:py-4 transition shadow-xl whitespace-nowrap flex items-center"
      >
        <span class="mt-1 me-2">{{ $t("show_exam") }}</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import {useExamStore} from "@/store/ExamStore";
const ExamStore = useExamStore();
</script>
