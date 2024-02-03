<template>
  <section class="py-8 lg:pb-24">
    <div class="container mx-auto">
      <div class="mt-10">
        <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-2 lg:pb-6 mb-16">{{ $t("teachers") }}</h2>
        <Skeleton type="image_text" :count="3" v-if="teachers.length == 0" />
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          <nuxt-link
            :to="localePath(`/teacher/${teacher.id}`)"
            v-for="teacher in teachers"
            class="link_classe relative z-20 hover:scale-105 shadow-lg rounded-lg transition-all overflow-hidden border-0"
          >
            <img :src="`${baseURL}/images/${teacher.photo}`" alt="post image" class="object-cover rounded-2xl" />
            <p class="text-4xl text-center dark:text-fpLightBack text-fp1 font-bold my-2 block px-6">{{ teacher["name_" + currentLocale] }}</p>
            <div class="flex items-center justify-center pb-4">
              <span class="text-2xl text-fp3 font-bold" v-text="$t('subjects')"></span>
              <div class="flex items-center flex-wrap ms-2 whitespace-nowrap gap-x-2">
                <span v-for="subject in teacher.courses" :key="subject.id" class="text-fp2 hover:text-fp3 text-xl">{{ subject["name_" + currentLocale] }},</span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
let teachers = ref([]);
const getTeachers = () => {
  $fetch(`${useRuntimeConfig().public.apiURL}/teachers`).then(res => {
    if (res.status) {
      teachers.value = res.data;
    } else {
      tost.add({
        type: "error",
        message: res.message,
      });
    }
  });
};

await useAsyncData("getTeachers", async () => {
  return getTeachers();
});
</script>
<style scoped>
.link_classe:hover img {
  filter: saturate(1.7);
  transform: scale(1.1);
}
</style>
