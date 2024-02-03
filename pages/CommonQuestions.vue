<template>
  <section class="bg-fp2/10 privacy-policy">
    <!-- <BreadCrumbs :classes="'bg-breadcrumb h-28 lg:h-[500px] text-white'" :contents="['اﻷسئلة الشائعة']" /> -->
    <div class="container mx-auto bg-gray-100 dark:bg-gray-900 my-box-shadow pt-24 pb-10">
      <h1 class="text-center text-4xl font-bold text-main_color_2 border-b-2 w-fit mx-auto dark:text-fp2 border-fp1 text-fp1">اﻷسئلة الشائعة</h1>
      <div class="mt-20" v-show="asks.length > 0">
        <div v-for="ask in asks" :key="ask.id">
          <h2 id="accordion-collapse-heading-1 ">
            <button
              @click="setValueActive(ask.id)"
              type="button"
              :class="[active[ask.id] == ask.id ? 'text-fp3 fill-fp3' : 'text-gray-500 ']"
              class="flex items-center justify-between w-full text-2xl font-semibold p-5 text-start border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-fpDark1 dark:border-fpDark2 dark:text-fp1 hover:bg-gray-200 dark:hover:bg-fpDark2"
            >
              <span v-text="ask['title_' + currentLocale]"></span>
              <Icon
                :class="[active[ask.id] == ask.id ? 'rotate-0 fill-fp3' : 'rotate-180 text-gray-500']"
                class="text-3xl transition-all duration-300"
                name="zondicons-cheveron-down"
              />
            </button>
          </h2>
          <div v-show="active[ask.id] == ask.id">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-fpDark2 dark:bg-gray-900">
              <p class="mb-2 text-gray-500 dark:text-gray-300 text-xl" v-html="ask['description_' + currentLocale]"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useTostStore} from "@/store/TostStore";
const {currentLocale, dir} = useLang();
const tost = useTostStore();
const {t} = useI18n();
useHead({
  title: t("Frequently_asked_questions"),
  meta: [{name: "title", content: t("Frequently_asked_questions")}],
});
let active = reactive({});
let asks = ref([]);
let show = ref("1");
const getAsks = () => {
  $fetch(`${useRuntimeConfig().public.apiURL}/getAsks`).then(res => {
    if (res.status) {
      asks.value = res.data;
      active[asks.value[0].id] = asks.value[0].id;
    } else {
      tost.add({
        type: "error",
        message: res.message,
      });
    }
  });
};

await useAsyncData("getAsks", async () => {
  return getAsks();
});
const setValueActive = value => {
  if (active[value] == value) {
    delete active[value];
  } else {
    active[value] = value;
  }
};
</script>
<style>
.bg-breadcrumb {
  background-image: url("~/assets/images/home/hero.png");
  background-size: cover;
}
</style>
