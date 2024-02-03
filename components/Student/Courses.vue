<template>
  <div>
    <section>
      <div class="container mx-auto mt-10 lg:px-10">
        <div class="flex items-center flex-col lg:flex-row shadow-lg rounded-3xl p-10 lg:py-4">
          <img src="~/assets/images/student/my_courses/books.svg" alt="" class="" />
          <div class="lg:ms-20">
            <h1 class="text-fp1 text-xl lg:text-4xl font-bold mt-10 lg:mt-0 mb-6">{{ $t("desc_app_student") }}</h1>
            <span class="text-2xl lg:text-3xl dark:text-fpLightBack">{{ $t("download_app") }}</span>
            <div class="flex items-center gap-x-10 mt-10">
              <a href="#">
                <img src="~/assets/images/google-play.svg" alt="" class="w-28 lg:w-48" />
              </a>
              <a href="#">
                <img src="~/assets/images/app-store.svg" alt="" class="w-28 lg:w-48" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container mx-auto py-24 lg:px-10">
        <h2 class="font-bold text-p-dark text-4xl lg:text-5xl mb-3 text-center lg:text-start dark:text-fp1">{{ $t("my_courses") }}</h2>
        <CourseCourses v-if="Object.keys(props.courses).length" :courses="props.courses" />
        <Empty v-else :message="$t('not_subscibed_courses')" />
      </div>
    </section>
  </div>
</template>
<script setup>
const props = defineProps({
  courses: {
    type: Object,
    // required: true,
  },
});
</script>
