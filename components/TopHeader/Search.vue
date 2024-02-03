<template>
  <div class="w-full lg:w-1/3 relative" :class="auth.isLoggedIn ? 'sm:hidden' : ''">
    <div class="relative h-fit w-full lg:w-5/6 mx-auto">
      <input
        @input="e => searchCourses(e.target.value)"
        id="posts-search"
        type="text"
        :placeholder="$t('search')"
        class="focus:outline-none bg-slate-50 focus:bg-slate-100 dark:bg-fpDark2 text-black placeholder:text-fpLightGray rounded-t-xl p-6 py-2 font-bold text-xl w-full"
      />
      <Icon name="ic-baseline-search" class="absolute bg-fp3 w-10 h-full end-0 top-0 grid place-items-center text-4xl text-white rounded-te-lg" />
    </div>
    <div
      v-if="resultSearch.length > 0"
      id="dropdown"
      class="z-[101] bg-white divide-y divide-gray-100 rounded-b w-5/6 mx-auto dark:bg-fpDark2 absolute top-10 inset-x-0 shadow-lg max-h-[200px] overflow-y-auto"
    >
      <ul class="py-1 text-sm text-fpDark2 dark:text-gray-200 divide-y-2" aria-labelledby="dropdown-button">
        <li v-for="course in resultSearch">
          <NuxtLink
            :to="localePath(`/course/${course.id}`)"
            type="button"
            class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            v-text="course.name"
          ></NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
const auth = useAuthStore();
let resultSearch = ref([]);
const {currentLocale} = useLang();
const searchCourses = async value => {
  if (value == "") {
    return (resultSearch.value = []);
  }
  try {
    await $fetch(`${useRuntimeConfig().public.apiURL}/searchCourses`, {
      method: "POST",
      body: {locale: currentLocale.value, search: value},
    }).then(res => {
      resultSearch.value = res.data;
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
