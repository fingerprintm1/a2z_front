<template>
  <div class="fixed start-0 top-0 w-full h-full z-[110] grid place-content-center">
    <span class="backdrop-blur-[3px] bg-[#00000087] w-full h-full absolute" @click="CourseStore.closeAttachmentsModal()"></span>
    <div class="relative mx-auto bg-white dark:bg-fpDark2 sm:py-4 sm:px-10 md:p-10 rounded-2xl w-[90vw] lg:w-[50vw]">
      <Icon
        @click="CourseStore.closeAttachmentsModal()"
        name="ic-baseline-close"
        class="absolute top-0 start-0 rtl:translate-x-[30%] ltr:translate-x-[-30%] translate-y-[-50%] bg-[#ef4444e0] transition-all hover:bg-red-600 rounded-full z-[60] text-white text-sm cursor-pointer w-8 h-8 flex justify-center items-center p-1"
      />
      <div class="">
        <div class="lg:w-full">
          <h1 class="text-center text-3xl font-bold text-fp1">{{ dataAttachments.name }}</h1>
          <button
            v-for="file in dataAttachments.attachments"
            @click="globalStore.HashURLFile(`${baseURL}/images/${file.file}`, file.name)"
            class="flex justify-between items-center gap-x-10 shadow-lg p-4 cursor-pointer hover:bg-slate-200 mb-6 w-full"
            :key="file.id"
          >
            <div class="flex items-center text-fp1">
              <Icon class="text-3xl me-2" name="ic:baseline-insert-drive-file" />
              <p>{{ file.name }}</p>
            </div>
            <div class="flex items-center text-fp1 hover:text-fp1/80 sm:hidden">
              <Icon class="text-3xl me-2" name="mdi:printer-check" />
              <p>{{ $t("download_file") }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useCourseStore} from "@/store/CourseStore";
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const CourseStore = useCourseStore();
const dataAttachments = CourseStore.getLectureAttachments;
const baseURL = useRuntimeConfig().public.baseURL;
</script>
