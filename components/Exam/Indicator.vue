<template>
  <div :dir="dir == 'rtl' ? 'ltr' : 'rtl'" class="flex flex-wrap justify-center items-center gap-4 my-8 pb-4 rounded-full shadow-xl px-4">
    <button
      v-for="i in ExamStore.getDetailsQuestions.lenQuestions"
      class="hover:bg-fp1 hover:text-white transition text-lg font-bold leading-4 w-8 h-8 pt-1 rounded-full flex justify-center items-center"
      :class="ExamStore.getDetailsQuestions.step == i || ExamStore.getDetailsQuestions.step > i ? 'bg-fp1 text-white' : 'bg-slate-200'"
      @click="ExamStore.switchTaps(i)"
      v-text="i"
    ></button>
  </div>
</template>
<script setup>
import {useExamStore} from "@/store/ExamStore";
const ExamStore = useExamStore();
const {currentLocale, dir} = useLang();
// const questions = ExamStore.getQuestions;
</script>
