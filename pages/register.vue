<template>
  <!-- <BreadCrumbs :classes="' dark:text-fpLightBack'" :contents="[$t('new_account')]" /> -->
  <section class="bg-fp1/10 pt-8 pb-20 lg:pb-40">
    <div
      class="sm:pb-10 sm:mx-3 mx-auto lg:w-[1200px] flex flex-col-reverse lg:flex-row justify-center lg:items-center gap-x-10 bg-white dark:bg-fpDark1 rounded-xl overflow-hidden shadow-xl p-0"
    >
      <div class="lg:w-1/2 lg:ps-4 lg:me-auto sm:px-4">
        <h1 class="mt-10 font-bold text-center text-3xl lg:text-5xl text-fp1 dark:text-fp2">{{ $t("new_account") }}</h1>
        <p class="text-gray-600 bg-yellow-300/50 lg:text-xl mt-4 mb-6 px-4 py-2 rounded-lg dark:text-white">
          <Icon name="ooui:notice" class="text-start text-yellow-400" /> يرجا كتابة اﻹسم صحيح لانه يكتب في الشهادة
        </p>
        <form @submit.prevent="submitUserRegister" method="post" action @keydown="errors.clear($event.target.name_ar)">
          <div class="mb-6">
            <label for="name_ar" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("name_ar") }}</label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 -end-1 flex items-center h-[42px] pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                <Icon name="ic:baseline-account-box" class="text-start text-2xl" />
              </div>
              <input
                type="text"
                id="name_ar"
                class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                :placeholder="$t('name_ar')"
                v-model="register.name_ar"
                :class="errors.has('name_ar') ? 'is-invalid' : ''"
                required
              />
              <p v-if="errors.has('name_ar')" class="mt-2 text-sm text-red-500">{{ errors.get("name_ar") }}</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="name_en" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("name_en") }}</label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 -end-1 flex items-center h-[42px] pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                <Icon name="ic:baseline-account-box" class="text-start text-2xl" />
              </div>
              <input
                type="text"
                id="name_en"
                class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                :placeholder="$t('name_en')"
                v-model="register.name_en"
                :class="errors.has('name_en') ? 'is-invalid' : ''"
                required
              />
              <p v-if="errors.has('name_en')" class="mt-2 text-sm text-red-500">{{ errors.get("name_en") }}</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="phone" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("phone_user") }}</label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 -end-1 flex items-center h-[42px] pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                <Icon name="ic:baseline-phone" class="text-start text-2xl" />
              </div>
              <input
                id="phone"
                type="text"
                class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                placeholder="201090844348"
                v-model="register.phone"
                :class="errors.has('phone') ? 'is-invalid' : ''"
                required
              />
              <p v-if="errors.has('phone')" class="mt-2 text-sm text-red-500">{{ errors.get("phone") }}</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="phone_parent" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("phone_parent_user") }}</label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 -end-1 flex items-center h-[42px] pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                <Icon name="ic:baseline-phone" class="text-start text-2xl" />
              </div>
              <input
                id="phone_parent"
                type="text"
                class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                placeholder="201090844348"
                v-model="register.phone_parent"
                :class="errors.has('phone_parent') ? 'is-invalid' : ''"
                required
              />
              <p v-if="errors.has('phone_parent')" class="mt-2 text-sm text-red-500">{{ errors.get("phone_parent") }}</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="birth" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("birth_user") }}</label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 -end-1 flex items-center h-[42px] pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                <Icon name="iconoir:birthday-cake" class="text-start text-2xl" />
              </div>
              <input
                id="birth"
                type="date"
                class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 pe-16 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                placeholder="201090844348"
                v-model="register.birth"
                :class="errors.has('birth') ? 'is-invalid' : ''"
                required
              />
              <p v-if="errors.has('birth')" class="mt-2 text-sm text-red-500">{{ errors.get("birth") }}</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="section_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("select_section") }}</label>
            <select
              name="section_id"
              id="section_id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-fpDark2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="register.section_id"
              :class="errors.has('section_id') ? 'is-invalid' : ''"
              required
            >
              <option v-for="section in sections" :key="section.id" :value="section.id" v-text="section['name_' + currentLocale]"></option>
            </select>
            <p v-if="errors.has('section_id')" class="mt-2 text-sm text-red-500">{{ errors.get("section_id") }}</p>
          </div>
          <div class="mb-6">
            <label for="success" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("email_user") }}</label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 -end-1 flex items-center h-[42px] pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                <!-- <p v-text="register.email" class="text-fp2 font-bold me-2 -mb-1"></p> -->
                <Icon name="ic:baseline-mail-outline" class="text-start text-2xl" />
              </div>
              <!-- @input="e => inputEmail(e.target.value)" -->
              <input
                type="email"
                class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                v-model="register.email"
                placeholder="example@gmail.com"
                :class="errors.has('email') ? 'is-invalid' : ''"
                required
              />
              <p v-if="errors.has('email')" class="mt-2 text-sm text-red-500">{{ errors.get("email") }}</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="success" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("password_user") }}</label>
            <div class="relative">
              <button
                :class="errors.has('password') ? 'is-invalid' : ''"
                type="button"
                @click="togglePassword = !togglePassword"
                class="bg-slate-200 dark:bg-fp1 dark:text-white absolute end-0 top-0 cursor-pointer w-10 h-full rounded-e-lg"
              >
                <Icon :name="togglePassword ? 'ph-eye-slash-fill' : 'ph-eye'" class="text-xl" />
              </button>
              <input
                :type="togglePassword ? 'text' : 'password'"
                class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                placeholder="********"
                v-model="register.password"
                required
                :class="errors.has('password') ? 'is-invalid' : ''"
              />
            </div>
            <p v-if="errors.has('password')" class="mt-2 text-sm text-red-500">{{ errors.get("password") }}</p>
          </div>

          <button
            type="submit"
            class="text-white bg-fp1 hover:bg-fp1/70 transition-colors focus:ring-4 focus:ring-fp2 font-bold rounded-lg text-lg lg:text-2xl mt-6 px-4 lg:px-10 py-2 lg:py-3 mx-auto block dark:bg-fp1 dark:hover:bg-fp2 focus:outline-none dark:focus:ring-fp2"
          >
            {{ $t("create_new_account") }}
          </button>
          <!-- <div class="flex items-center justify-center mt-10">
            <span class="w-20 h-1.5 bg-fp1 rounded-full mt-1 me-4"></span>
            <p class="text-fp1 font-bold text-xl lg:text-3xl">{{ $t("or_register_from") }}</p>
            <span class="w-20 h-1.5 bg-fp1 rounded-full mt-1 ms-4"></span>
          </div>
          <div class="flex flex-col lg:flex-row sm:gap-y-4 items-center justify-between mt-10">
            <button class="border-2 px-4 py-2 rounded-lg">
              <Icon name="mdi-google" class="text-green-500" />
              <span class="">تسجيل الدخول عبر جوجل</span>
            </button>
            <button class="border-2 px-4 py-2 rounded-lg">
              <Icon name="mdi-google" class="text-green-500" />
              <span class="">تسجيل الدخول عبر جوجل</span>
            </button>
          </div> -->
          <div class="text-md lg:text-xl mt-5 lg:my-10">
            <span class="dark:text-gray-300">{{ $t("have_account") }}</span>
            <nuxt-link :to="localePath(`/login`)" class="text-fp1 font-bold ms-1">{{ $t("login") }}</nuxt-link>
          </div>
        </form>
      </div>
      <div class="lg:w-1/2 lg:h-[900px]">
        <div class="sm:py-10 w-full h-full bg-gradient-to-t from-fp1 to-fp1/50 flex flex-col justify-center items-center">
          <h2 class="sm:mt-4 font-bold text-center text-3xl lg:text-5xl text-white mb-10">{{ $t("welcome_back") }}</h2>
          <img class="w-5/6" :src="`${baseURL}/images/${globalStore.appSettings.bg_register}`" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useTostStore} from "@/store/TostStore";
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const route = useRoute();
const baseURL = useRuntimeConfig().public.baseURL;
const apiUrl = useRuntimeConfig().public.apiURL + "/auth";
const errors = reactive(useErrors());
const {currentLocale, dir} = useLang();
const auth = useAuthStore();
const tost = useTostStore();
const {t} = useI18n();
const localePath = useLocalePath();
let togglePassword = ref(false);

useHead({
  title: t("new_account"),
  meta: [{name: "title", content: t("new_account")}],
});
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
getSections();
let register = reactive({
  name_ar: "",
  name_en: "",
  phone: "",
  phone_parent: "",
  section_id: null,
  birth: "",
  email: "",
  password: "",
  roles_name: [null],
});

if (route.query.roles_name == "trainer") {
  register.roles_name = ["trainer"];
}

async function submitUserRegister() {
  if (register.name_ar.split(" ").length < 3) {
    tost.add({
      type: "error",
      message: "يجل ان يكون الإسم عربي ثلاثي",
    });
    errors.record({name_ar: "يجل ان يكون الإسم عربي ثلاثي"});
    return false;
  }
  if (register.name_en.split(" ").length < 3) {
    tost.add({
      type: "error",
      message: "يجل ان يكون الإسم إنجليزي ثلاثي",
    });
    errors.record({name_en: "يجل ان يكون الإسم إنجليزي ثلاثي"});
    return false;
  }
  try {
    await useAsyncData("register", () =>
      $fetch(`${apiUrl}/register`, {
        method: "POST",
        body: {locale: currentLocale.value, ...register},
      }).then(res => {
        if (res.status) {
          auth.setUser(res.user);
          tost.add({
            type: "success",
            message: currentLocale.value == "ar" ? `تم انشاء الحساب ${res.user.name_ar}` : `success create ${res.user.name_en}`,
          });
          navigateTo(localePath("/"));
        } else {
          if (res.errCode == 422) {
            let ob = {};
            for (const [key, value] of Object.entries(res.message)) {
              ob[key] = value[0];
              tost.add({
                type: "error",
                message: value[0],
              });
            }
            errors.record(ob);
          }
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
}
</script>
