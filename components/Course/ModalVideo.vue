<template>
  <div class="fixed inset-0 grid place-items-center z-[110]">
    <div v-if="videoData.show" @click="CourseStore.setValueShowVideo(false)" class="overlay_element"></div>
    <div class="hero_course pt-4 px-4 w-[98%] lg:w-3/6 h-[40%] lg:h-3/6 rounded-lg relative z-[110] sm:bg-gradient-to-t sm:from-fp1/5 sm:to-fp2/20">
      <div class="flex justify-between items-center p-4 title_course">
        <h2 class="text-white text-3xl">{{ videoData.title }}</h2>
        <button @click="CourseStore.setValueShowVideo(false)"><Icon class="text-white text-3xl" name="mdi:close" /></button>
      </div>
      <div class="w-full h-[79%] lg:h-[80%] mt-4 sm:pb-[56px] relative parentPlayer">
        <vue-plyr ref="plyr" v-if="videoData.type_video == 'youtube'">
          <div data-plyr-provider="youtube" :data-plyr-embed-id="videoData.url"></div>
        </vue-plyr>
        <div v-else-if="videoData.type_video == 'server'" class="relative h-full">
          <div
            id="watermark"
            class="watermark bg-fpDark1/70 whitespace-nowrap absolute z-[9999] rounded-xl font-bold text-xl text-white px-4 py-2 w-fit mt-2"
            v-text="`${auth.user.name_ar} #${auth.user.id}`"
          ></div>
          <iframe
            :src="`${videoData.url}`"
            loading="lazy"
            class="border-0 w-full h-full relative"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowfullscreen="true"
            referrerpolicy="origin-when-cross-origin"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useCourseStore} from "@/store/CourseStore";
import {useAuthStore} from "@/store/AuthStore";
const auth = useAuthStore();
const CourseStore = useCourseStore();
const videoData = CourseStore.getVideoData;
</script>
<style>
.watermark {
  animation: watermarkAnimation 50s linear infinite;
  top: auto !important;
}
@keyframes watermarkAnimation {
  0% {
    bottom: auto;
    top: 10%;
    right: 10%;
  }
  25% {
    top: 10%;
    left: 10%;
  }
  50% {
    left: 10%;
    bottom: 10%;
  }
  75% {
    right: 10%;
    bottom: 10%;
  }
  100% {
    bottom: auto;
    top: 10%;
    right: 10%;
  }
}
</style>
