<template>
  <section class="py-8 lg:pb-24">
    <div class="container mx-auto">
      <div class="">
        <div class="flex flex-col-reverse lg:flex-row lg:justify-center items-center">
          <div class="lg:w-5/12 sm:text-center">
            <Skeleton type="text" v-if="Object.keys(teacher).length == 0" />
            <h1 class="text-fp2 text-3xl font-bold" v-text="teacher['name_' + currentLocale]"></h1>
            <p class="text-2xl lg:text-4xl text-fp3 mt-2" v-text="teacher['description_' + currentLocale]"></p>
          </div>
          <div class="lg:w-5/12">
            <Skeleton type="image" v-if="Object.keys(teacher).length == 0" />
            <img v-if="Object.keys(teacher).length != 0" :src="`${baseURL}/images/${teacher.photo}`" alt="post image" class="object-cover rounded-t-2xl" />
          </div>
        </div>
      </div>
      <TransitionGroup name="taps-down">
        <div class="mt-10 lg:mt-28" v-show="!showSection">
          <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-2 lg:pb-6 mb-16">{{ $t("classes") }}</h2>
          <Skeleton type="image" :count="3" v-if="Object.keys(teacher).length == 0" />
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-10">
            <button
              @click="setData(section.courses)"
              v-for="section in teacher.sections"
              class="link_classe relative z-20 hover:scale-105 shadow-lg transition-all group overflow-hidden border-0 mb-10"
            >
              <!-- <p
                class="absolute z-10 inset-x-0 -top-20 bg-white dark:bg-fpDark2 text-fp2 text-center text-3xl font-bold py-2 transition-all group-hover:top-0"
                v-text="teacher['name_' + currentLocale]"
              ></p> -->
              <img :src="`${baseURL}/images/${section.photo}`" alt="post image" class="object-cover rounded-t-2xl" />
              <p
                class="absolute z-10 inset-x-0 -bottom-20 bg-white dark:bg-fpDark2 text-fp3 text-center text-xl font-bold py-2 transition-all group-hover:bottom-0"
                v-text="section['name_' + currentLocale]"
              ></p>
            </button>
          </div>
        </div>
        <div class="mt-10 lg:mt-28" v-show="showSection">
          <div class="flex justify-between items-center mb-10">
            <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto">{{ $t("courses") }}</h2>
            <button
              @click="showSection = false"
              class="text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-5 lg:px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
            >
              {{ $t("all_courses") }}
              <Icon name="ph:student-fill" class="text-white text-xl" />
            </button>
          </div>
          <CourseCourses v-if="Object.keys(courses).length" :courses="courses" />
        </div>
        <p v-show="courses.length == 0 && showSection" class="text-center text-yellow-500 text-2xl lg:text-5xl font-bold mt-20 shadow-lg py-2">{{ $t("not_found_courses") }}</p>
      </TransitionGroup>
    </div>
  </section>
</template>
<script setup>
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const route = useRoute();
let teacher = ref([]);
let showSection = ref(false);
let courses = ref([]);
const getTeacher = () => {
  $fetch(`${useRuntimeConfig().public.apiURL}/teacher/${route.params.id}`).then(res => {
    if (res.status) {
      teacher.value = res.data;
    } else {
      tost.add({
        type: "error",
        message: res.message,
      });
    }
  });
};
await useAsyncData("getTeacher", async () => {
  return getTeacher();
});
const setData = data => {
  courses.value = data;
  showSection.value = true;
};
</script>
<style scoped>
.link_classe:hover img {
  filter: saturate(1.7);
  transform: scale(1.1);
}
</style>
