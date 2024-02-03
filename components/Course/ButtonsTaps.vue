<template>
  <div class="shadow-lg pt-4">
    <div class="container mx-auto flex sm:flex-col sm:gap-y-5 justify-between sm:border-t sm:pt-5">
      <button
        @click="CourseStore.setValueTap('aboute')"
        :class="[CourseStore.showTap == 'aboute' ? 'border-fp1 text-fp1/90' : 'border-transparent text-fpDarkGray']"
        class="hover:text-fp1 transition duration-200 font-bold text-xl border-b-4 hover:border-fp1 pb-4 px-10"
      >
        {{ $t("course_aboute") }}
      </button>
      <button
        @click="CourseStore.setValueTap('lectures')"
        :class="[CourseStore.showTap == 'lectures' ? 'border-fp1 text-fp1/90' : 'border-transparent text-fpDarkGray']"
        class="hover:text-fp1 transition duration-200 font-bold text-xl border-b-4 hover:border-fp1 pb-4 px-10"
      >
        {{ $t("course_lectures") }}
      </button>
      <button
        @click="CourseStore.setValueTap('files')"
        :class="[CourseStore.showTap == 'files' ? 'border-fp1 text-fp1/90' : 'border-transparent text-fpDarkGray']"
        class="hover:text-fp1 transition duration-200 font-bold text-xl border-b-4 hover:border-fp1 pb-4 px-10"
      >
        {{ $t("course_files") }}
      </button>
      <button
        @click="CourseStore.setValueTap('comments')"
        :class="[CourseStore.showTap == 'comments' ? 'border-fp1 text-fp1/90' : 'border-transparent text-fpDarkGray']"
        class="hover:text-fp1 transition duration-200 font-bold text-xl border-b-4 hover:border-fp1 pb-4 px-10"
      >
        {{ $t("course_comments") }}
      </button>
    </div>
  </div>
</template>
<script setup>
import {useCourseStore} from "@/store/CourseStore";
const CourseStore = useCourseStore();
</script>
