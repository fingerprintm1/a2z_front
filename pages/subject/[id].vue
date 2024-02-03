<template>
  <section class="py-8 lg:pb-24">
    <div class="container mx-auto">
      <div class="">
        <div class="flex flex-col lg:flex-row lg:justify-center items-center">
          <div class="lg:w-5/12">
            <Skeleton type="text" v-if="Object.keys(subject).length == 0" />
            <h1 class="text-fp2 text-3xl lg:text-6xl font-bold sm:mb-10" v-text="subject['name_' + currentLocale]"></h1>
            <!-- <p class="text-4xl text-fp3 mt-2" v-text="subject['description_' + currentLocale]"></p> -->
          </div>
          <div class="lg:w-5/12">
            <Skeleton type="image" v-if="Object.keys(subject).length == 0" />
            <img v-if="Object.keys(subject).length != 0" :src="`${baseURL}/images/${subject.photo}`" alt="post image" class="object-cover rounded-2xl" />
          </div>
        </div>
      </div>

      <TransitionGroup name="taps-down">
        <div class="mt-10 lg:mt-28" v-show="showSection == 'teachers'">
          <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-2 lg:pb-6 mb-16">{{ $t("teachers") }}</h2>
          <Skeleton type="image_text" :count="3" v-if="Object.keys(subject).length == 0" />
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <button @click="setData('sections', teacher.sections)" v-for="teacher in subject.teachers" class="rounded-lg md:mx-24 sm:mx-1 bg-white dark:bg-fpDark2 flex flex-col">
              <div>
                <img :src="`${baseURL}/images/${teacher.photo}`" alt="post image" class="w-full object-cover rounded-t-2xl" />
              </div>
              <div class="px-6 h-full w-full">
                <div class="text-4xl text-center dark:text-fpLightBack text-fp1 font-bold lg:mt-4 block">
                  {{ teacher["name_" + currentLocale] }}
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="mt-10 lg:mt-28" v-show="showSection == 'sections'">
          <div class="flex justify-between items-start">
            <h2 class="text-xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-2 lg:pb-6 mb-16">{{ $t("classes") }}</h2>
            <button
              @click="showSection = 'teachers'"
              class="text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-5 lg:px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
            >
              {{ $t("teachers") }}
              <Icon name="ph:student-fill" class="text-white text-xl" />
            </button>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-10">
            <button
              @click="setData('courses', section.courses)"
              v-for="section in sections"
              class="link_classe relative z-20 hover:scale-105 shadow-lg transition-all overflow-hidden border-0"
            >
              <img :src="`${baseURL}/images/${section.photo}`" alt="post image" class="object-cover rounded-2xl" />
            </button>
          </div>
          <p v-show="sections.length == 0 && showSection == 'sections'" class="text-center text-yellow-500 text-2xl lg:text-5xl font-bold mt-20 shadow-lg py-2">
            {{ $t("not_found_sections") }}
          </p>
        </div>
        <div class="mt-10 lg:mt-28" v-show="showSection == 'courses'">
          <div class="flex justify-between items-center">
            <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto">{{ $t("course") }}</h2>
            <button
              @click="showSection = 'sections'"
              class="text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-5 lg:px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
            >
              {{ $t("classes") }}
              <Icon name="ph:student-fill" class="text-white text-xl" />
            </button>
          </div>
          <CourseCourses v-if="Object.keys(courses).length" :courses="courses" />
        </div>
        <p v-show="courses.length == 0 && showSection == 'courses'" class="text-center text-yellow-500 text-2xl lg:text-5xl font-bold mt-20 shadow-lg py-2">
          {{ $t("not_found_courses") }}
        </p>
      </TransitionGroup>
    </div>
  </section>
</template>
<script setup>
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const route = useRoute();
let subject = ref([]);
let showSection = ref("teachers");
let courses = ref([]);
let sections = ref([]);
const getSection = () => {
  $fetch(`${useRuntimeConfig().public.apiURL}/subject/${route.params.id}`).then(res => {
    if (res.status) {
      subject.value = res.data;
    } else {
      tost.add({
        type: "error",
        message: res.message,
      });
    }
  });
};

await useAsyncData("getSection", async () => {
  return getSection();
});
const setData = (show, data) => {
  if (data != undefined) {
    if (show == "sections") {
      sections.value = data;
    } else if (show == "courses") {
      courses.value = data;
    }
  }
  showSection.value = show;
};
</script>
<style scoped>
.link_classe:hover img {
  filter: saturate(1.7);
  transform: scale(1.1);
}
</style>
