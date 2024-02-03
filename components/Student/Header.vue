<template>
  <header class="body-font shadow-lg py-4 sticky top-0 start-0 bg-white dark:bg-fpDark1 z-50">
    <div class="container mx-auto">
      <div class="hidden lg:flex items-center gap-x-10">
        <nuxt-link :to="localePath(`/`)" class="flex items-center font-medium text-gray-900 lg:me-20">
          <img src="~/assets/images/global/logo.png" alt="" class="w-64 lg:w-36" />
        </nuxt-link>
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-4 flex items-center ps-3 pointer-events-none">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="bg-gray-100 border border-gray-300 text-gray-900 text-xl rounded-2xl focus:outline-blue-500 block w-full ps-20 h-16 dark:bg-fpDark2 dark:border-fpDark3"
            :placeholder="$t('search')"
          />
        </div>
        <div class="flex items-center gap-x-3">
          <!-- <button class="border-2 border-gray-400 rounded-full p-2 border-dotted relative w-16">
            <span class="flex justify-center items-center w-4 h-4 bg-red-500 rounded-full absolute -top-1 start-0 text-white text-xs font-bold">0</span>
            <img src="~/assets/images/student/notification.svg" alt="" class="w-10" />
          </button> -->
          <div class="text-end dark:text-fpLightBack">
            <span class="font-bold whitespace-nowrap">{{ auth.user["name_" + currentLocale] }}</span>
            <p class="">{{ auth.user.email }}</p>
          </div>
          <button class="relative">
            <Icon name="ic-outline-edit" class="text-2xl absolute bottom-0 -right-2 cursor-pointer dark:text-fp2" @click="showInputImage()" />
            <input type="file" hidden id="image" @change="e => getImage(e)" accept="image/*" />
            <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden shadow-xl outline outline-4 outline-offset-2 outline-gray-200">
              <img
                v-if="auth.user.photo"
                :src="auth.user.oauth_type == null ? `${baseURL}/images/${auth.user.photo}` : `${auth.user.photo}`"
                alt=""
                class="w-full h-full object-cover"
              />
              <img
                v-else
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUS8TjFE3RRsUZV9JietSrxIY8xke14UuulctZGjudNedC9oVgaJhQK9AE2nM8IXSXvls&usqp=CAU"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>
      <div class="lg:hidden flex items-center justify-between">
        <nuxt-link :to="localePath(`/`)" class="flex items-center font-medium text-gray-900">
          <img src="~/assets/images/global/logo.png" alt="" class="w-14" />
        </nuxt-link>
        <!-- <button class="border-2 border-gray-400 rounded-full p-1.5 border-dotted relative">
          <span class="flex justify-center items-center w-4 h-4 bg-red-500 rounded-full absolute -top-1 start-0 text-white text-xs font-bold">2</span>
          <img src="~/assets/images/student/notification.svg" alt="" class="w-8" />
        </button> -->
        <button @click="globalStore.menuMobileScreen = !globalStore.menuMobileScreen" class="open-menu flex items-center font-medium text-gray-900">
          <img src="~/assets/images/student/menu.svg" alt="" class="w-12" />
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useTostStore} from "@/store/TostStore";
import {useGlobalStore} from "@/store/GlobalStore";
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const apiURL = useRuntimeConfig().public.apiURL;
const globalStore = useGlobalStore();
const auth = useAuthStore();
const tost = useTostStore();
const {t} = useI18n();

const showInputImage = () => {
  document.getElementById("image").click();
};
const getImage = async e => {
  const file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("photo", file);
  // update image
  await useAsyncData("updateImage", () =>
    $fetch(`${apiURL}/auth/updateImage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
      body: formData,
    }).then(res => {
      if (res.status) {
        auth.setUser(res.user);

        tost.add({
          type: "success",
          message: currentLocale.value == "ar" ? t("update_image_message") : `success update your image`,
        });
        document.getElementById("photo-user").src = res.user.photo;
      } else {
        console.log(res);
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
    })
  );
};
</script>
