<template>
  <div class="flex sm:flex-col justify-between gap-x-10">
    <div class="shadow-lg w-full lg:w-1/6 p-4 rounded-lg h-fit">
      <button
        @click="CourseStore.setTapFilesGroups('files')"
        :class="[
          CourseStore.TapFilesGroups == 'files' ? 'fill-fp1 text-fp1 dark:fill-fp1 dark:text-fp1 bg-gray-200 dark:bg-fpDark2 ' : ' dark:fill-fpLightGray dark:text-fpLightGray',
        ]"
        class="font-bold text-start px-2 hover:bg-gray-200 dark:hover:bg-fpDark2 w-full text-xl rounded-lg py-2 hover:fill-fp1 dark:hover:fill-fp1 dark:hover:text-fp1 hover:text-fp1 transition whitespace-nowrap"
      >
        <Icon class="text-3xl" name="ph:files-fill" /> {{ $t("files") }}
      </button>

      <button
        @click="CourseStore.setTapFilesGroups('groups')"
        :class="[CourseStore.TapFilesGroups == 'groups' ? 'fill-fp1 text-fp1 bg-gray-200 dark:bg-fpDark2' : 'dark:fill-fpLightGray dark:text-fpLightGray']"
        class="font-bold text-start px-2 mt-2 hover:bg-gray-200 dark:hover:bg-fpDark2 w-full text-xl rounded-lg py-2 hover:fill-fp1 dark:hover:fill-fp1 dark:hover:text-fp1 hover:text-fp1 transition whitespace-nowrap"
      >
        <Icon class="text-3xl" name="ic:round-telegram" /> {{ $t("course_groups") }}
      </button>
    </div>
    <transition name="taps-right" v-if="CourseStore.TapFilesGroups == 'files'">
      <div class="w-full lg:w-5/6 sm:mt-10">
        <div class="shadow-lg border-t-2 border-fp1 py-4 rounded-lg space-y-4">
          <div v-if="course.attachments.length == 0" class="lg:w-5/6 lg:ml-auto h-fit p-6">
            <h4 class="text-center text-2xl font-bold dark:text-white">{{ $t("sorry") }}</h4>
            <p class="text-center text-yellow-500 text-2xl mt-4">{{ $t("not_found_files") }}</p>
          </div>
          <div v-for="file in course.attachments" :key="file.id">
            <button
              v-if="course.subscribed"
              @click="globalStore.HashURLFile(`${baseURL}/images/${file.file}`, file.name)"
              class="flex justify-between items-center hover:bg-gray-200 dark:hover:bg-fpDark2 p-4 cursor-pointer w-full"
            >
              <div class="flex items-center text-fp1">
                <Icon class="text-3xl me-2" name="ic:baseline-insert-drive-file" />
                <p>{{ file.name }}</p>
              </div>
              <div class="flex items-center text-fp1 hover:text-fp2">
                <Icon class="text-3xl me-2" name="mdi:printer-check" />
                <p>{{ $t("download_file") }}</p>
              </div>
            </button>
            <button @click="notOpenFile()" v-else class="flex justify-between items-center hover:bg-gray-200 dark:hover:bg-fpDark2 p-4 cursor-pointer w-full">
              <div class="flex items-center text-fp1">
                <Icon class="text-3xl me-2" name="ic:baseline-insert-drive-file" />
                <p>{{ file.name }}</p>
              </div>
              <div class="flex items-center text-fp1 hover:text-fp2">
                <Icon class="text-3xl me-2" name="mdi:printer-check" />
                <p>{{ $t("download_file") }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="taps-right">
      <div class="w-full lg:w-5/6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-center sm:mt-10" v-if="CourseStore.TapFilesGroups == 'groups'">
        <div class="shadow-xl rounded-xl p-6">
          <a target="_blank" :href="`${course.whatsapp}`">
            <Icon class="text-fp1 text-8xl" name="ic:baseline-whatsapp" />
          </a>
          <h2 class="text-fp1 text-xl font-medium my-2">{{ $t("join_groups") }}</h2>
          <div class="flex justify-between items-center mt-4">
            <a
              :href="`${course.whatsapp}`"
              target="_blank"
              class="text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-md px-2 py-2 focus:outline-none block w-full"
            >
              {{ $t("join_now") }}
              <Icon name="ic:baseline-whatsapp" class="text-white text-2xl -mt-1" />
            </a>
          </div>
        </div>
        <div class="shadow-xl rounded-xl p-6">
          <a target="_blank" :href="`${course.telegram}`">
            <Icon class="text-fp1 text-8xl" name="ic:baseline-telegram" />
          </a>
          <h2 class="text-fp1 text-xl font-medium my-2">{{ $t("join_telegram") }}</h2>
          <div class="flex justify-between items-center mt-4">
            <a
              :href="`${course.telegram}`"
              target="_blank"
              class="text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-md px-2 py-2 focus:outline-none block w-full"
            >
              {{ $t("join_now") }}
              <Icon name="ic:baseline-telegram" class="text-white text-2xl -mt-1" />
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import {useCourseStore} from "@/store/CourseStore";
import {useGlobalStore} from "@/store/GlobalStore";
import {useTostStore} from "@/store/TostStore";
const tost = useTostStore();
const globalStore = useGlobalStore();
const CourseStore = useCourseStore();
const course = CourseStore.getCourse;
const baseURL = useRuntimeConfig().public.baseURL;
const notOpenFile = () => {
  tost.add({
    type: "error",
    message: "انت لست مشترك في الكورس",
  });
};
</script>
