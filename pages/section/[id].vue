<template>
  <section class="py-8 lg:pb-24">
    <div class="container mx-auto">
      <div class="">
        <div class="flex flex-col-reverse lg:flex-row lg:justify-center lg:items-center">
          <div class="lg:w-5/12 sm:text-center">
            <Skeleton type="text" v-if="section.length == 0" />
            <h1 class="text-fp2 text-4xl lg:text-6xl font-bold sm:mt-10" v-if="section.length != 0" v-text="section['name_' + currentLocale]"></h1>
            <p class="text-4xl text-fp3 mt-2" v-if="section.length != 0" v-html="section['description_' + currentLocale]"></p>
          </div>
          <div class="lg:w-5/12">
            <Skeleton type="image" v-if="section.length == 0" />
            <img v-if="section.length != 0" :src="`${baseURL}/images/${section.photo}`" alt="post image" class="object-cover rounded-2xl" />
          </div>
        </div>
      </div>

      <TransitionGroup name="taps-down">
        <div class="mt-10 lg:mt-28" v-show="showSection == 'subjects'">
          <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-2 lg:pb-6 mb-16">{{ $t("subjects") }}</h2>
          <Skeleton type="card" :count="3" v-if="!section.subjects" />
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-10">
            <button
              v-for="subject in section.subjects"
              @click="setData('teachers', subject.teachers)"
              class="link_classe relative z-20 hover:scale-105 shadow-lg rounded-lg transition-all overflow-hidden border-0"
            >
              <div class="sm:mx-1 bg-white dark:bg-fpDark2 flex flex-col lg:pb-8">
                <div>
                  <img :src="`${baseURL}/images/${subject.photo}`" alt="post image" class="w-full h-[250px] object-cover rounded-t-2xl" />
                </div>
                <div class="px-6 h-full">
                  <b class="text-2xl dark:text-fpLightBack text-fp1 font-bold mt-6 block">{{ subject["name_" + currentLocale] }}</b>
                </div>
                <button
                  class="text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-sm px-2 py-2 sm:mb-4 mt-4 w-fit mx-auto focus:outline-none"
                >
                  {{ $t("teachers") }}
                  <Icon name="ic:baseline-check-circle-outline" class="text-white text-xl -mt-1" />
                </button>
              </div>
            </button>
          </div>
        </div>
        <div class="mt-10 lg:mt-28" v-show="showSection == 'teachers'">
          <div class="flex justify-between items-start">
            <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-2 lg:pb-6 mb-16">{{ $t("teachers") }}</h2>
            <button
              @click="showSection = 'subjects'"
              class="text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-5 lg:px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
            >
              {{ $t("subjects") }}
              <Icon name="ic:sharp-menu-book" class="text-white text-xl" />
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <button @click="setData('courses', teacher.courses)" v-for="teacher in teachers" class="rounded-lg md:mx-24 sm:mx-1 bg-white dark:bg-fpDark2 flex flex-col">
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
        <div class="mt-10 lg:mt-28" v-show="showSection == 'courses'">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto">{{ $t("courses") }}</h2>
            <button
              @click="showSection = 'teachers'"
              class="text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-5 lg:px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
            >
              {{ $t("teachers") }}
              <Icon name="ph:student-fill" class="text-white text-xl" />
            </button>
          </div>
          <CourseCourses v-if="Object.keys(courses).length" :courses="courses" />
        </div>
        <p v-show="courses.length == 0 && showSection === 'courses'" class="text-center text-yellow-500 text-2xl lg:text-5xl font-bold mt-20 shadow-lg py-2">
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
let section = ref([]);
let showSection = ref("subjects");
let teachers = ref([]);
let courses = ref([]);
const getSection = () => {
  $fetch(`${useRuntimeConfig().public.apiURL}/section/${route.params.id}`).then(res => {
    if (res.status) {
      section.value = res.data;
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
const setData = (type, data) => {
  if (type === "teachers") {
    teachers.value = data;
  } else if (type === "courses") {
    courses.value = data;
  }
  showSection.value = type;
};
</script>
<style scoped>
.link_classe:hover img {
  filter: saturate(1.7);
  transform: scale(1.1);
}
</style>
