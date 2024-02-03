<template>
  <section class="py-8 lg:pb-24">
    <div class="container mx-auto">
      <div class="mt-10">
        <h2 class="text-3xl lg:text-5xl text-fp2 dark:text-fp1 font-bold border-b-2 border-fp2 w-fit mx-auto pb-2 lg:pb-6 mb-16">{{ $t("classes") }}</h2>
        <Skeleton type="image" :count="3" v-if="sections.length == 0" />
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          <nuxt-link
            :to="localePath(`/section/${section.id}`)"
            v-for="section in sections"
            class="link_classe relative z-20 hover:scale-105 shadow-lg transition-all overflow-hidden border-0"
          >
            <img :src="`${baseURL}/images/${section.photo}`" alt="post image" class="object-cover rounded-2xl" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
let sections = ref([]);
const getSections = () => {
  $fetch(`${useRuntimeConfig().public.apiURL}/sections`).then(res => {
    if (res.status) {
      sections.value = res.data;
    } else {
      tost.add({
        type: "error",
        message: res.message,
      });
    }
  });
};

await useAsyncData("getSections", async () => {
  return getSections();
});
</script>
<style scoped>
.link_classe:hover img {
  filter: saturate(1.7);
  transform: scale(1.1);
}
</style>
