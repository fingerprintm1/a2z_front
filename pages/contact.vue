<template>
  <!-- <BreadCrumbs :classes="'bg-white dark:bg-gray-900 dark:text-fpLightBack'" :contents="[$t('contact')]" /> -->
  <section class="bg-fp1/10 pt-10 pb-20 lg:pb-40">
    <div
      class="sm:pb-10 sm:mx-3 mx-auto lg:w-[1200px] flex flex-col-reverse lg:flex-row justify-center lg:items-center gap-x-10 bg-white dark:bg-fpDark1 rounded-xl overflow-hidden shadow-xl p-0"
    >
      <div class="lg:w-1/2 lg:ps-4 lg:ms-8 sm:px-4">
        <h1 class="sm:mt-10 font-bold text-center text-3xl lg:text-4xl text-fp1 dark:text-fp2">{{ $t("contact") }}</h1>
        <p class="mt-4 text-center text-lg dark:text-fpLightBack">{{ $t("desc_contact") }}</p>
        <form @submit.prevent="sendMessage" method="post" action @keydown="errors.clear($event.target.name)">
          <div class="mb-6 mt-10">
            <label for="success" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-fpLightBack">{{ $t("title_message") }}</label>
            <input
              type="text"
              class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-fpLightBack outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
              v-model="contact.title"
              :placeholder="$t('title')"
              :class="errors.has('title') ? 'is-invalid' : ''"
              required
            />
            <p v-if="errors.has('title')" class="mt-2 text-sm text-red-500">{{ errors.get("title") }}</p>
          </div>
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("message_contact") }}</label>
            <textarea
              id="message"
              rows="4"
              class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-fpLightBack outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border resize-none h-40"
              :placeholder="$t('write_message')"
              :class="errors.has('message') ? 'is-invalid' : ''"
              v-model="contact.message"
              required
            ></textarea>
            <p v-if="errors.has('message')" class="mt-2 text-sm text-red-500">{{ errors.get("message") }}</p>
          </div>
          <button
            type="submit"
            class="text-white bg-fp1 hover:bg-fp2 transition-colors focus:ring-4 focus:ring-fp2 font-bold rounded-lg text-lg lg:text-2xl mt-6 px-4 lg:px-10 py-2 lg:py-3 mx-auto block focus:outline-none dark:focus:ring-fp2"
          >
            {{ $t("submit") }}
          </button>
          <div class="flex flex-col lg:flex-row justify-between my-8 whitespace-normal">
            <a :href="`tel: ${globalStore.appSettings.phone}`" target="_blank" class="text-2xl text-fp1 dark:text-fp1 dark:hover:text-fp2 font-bold"
              ><Icon class="text-xl text-inherit me-2" name="ic-baseline-phone-enabled" />{{ globalStore.appSettings.phone }}</a
            >
            <a :href="`mailto:${globalStore.appSettings.email}`" target="_blank" class="sm:mt-2 text-2xl text-fp1 dark:text-fp1 dark:hover:text-fp2 font-bold"
              ><Icon class="text-xl text-inherit me-2" name="ic-sharp-email" />{{ globalStore.appSettings.email }}</a
            >
          </div>
          <ul class="flex items-center gap-x-3 mt-4">
            <li>
              <a :href="globalStore.appSettings.facebook" target="_blank"
                ><Icon class="text-fpDark1 dark:text-fpLightBack dark:hover:text-[#1877f2] hover:text-[#1877f2] transition hover:scale-110 text-4xl" name="uil-facebook"
              /></a>
            </li>
            <li>
              <a :href="globalStore.appSettings.instagram" target="_blank"
                ><Icon class="text-fpDark1 dark:text-fpLightBack dark:hover:text-[#c13584] hover:text-[#c13584] transition hover:scale-110 text-4xl" name="ri-instagram-fill"
              /></a>
            </li>
            <li>
              <a :href="globalStore.appSettings.youtube" target="_blank"
                ><Icon class="text-fpDark1 dark:text-fpLightBack dark:hover:text-red-600 hover:text-red-600 transition hover:scale-110 text-4xl" name="formkit:youtube"
              /></a>
            </li>
            <li>
              <a :href="`http://wa.me/${globalStore.appSettings.whatsapp}`" target="_blank"
                ><Icon class="text-fpDark1 dark:text-fpLightBack dark:hover:text-[#4aae20] hover:text-[#4aae20] transition hover:scale-110 text-4xl" name="ri-whatsapp-fill"
              /></a>
            </li>
            <li>
              <a :href="`${globalStore.appSettings.telegram}`" target="_blank"
                ><Icon class="text-fpDark1 dark:text-fpLightBack dark:hover:text-blue-600 hover:text-blue-600 transition hover:scale-110 text-4xl" name="ic:round-telegram"
              /></a>
            </li>
          </ul>
        </form>
      </div>
      <div class="lg:w-1/2 lg:h-[800px]">
        <div class="sm:py-16 w-full h-full bg-gradient-to-t from-fp1 to-fp1/50 flex flex-col justify-center items-center">
          <h2 class="sm:mt-4 font-bold text-center text-3xl lg:text-5xl text-white mb-10">{{ $t("title_contact") }}</h2>
          <img class="w-5/6" :src="`${baseURL}/images/${globalStore.appSettings.bg_contact}`" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
import {useAuthStore} from "@/store/AuthStore";
import {useTostStore} from "@/store/TostStore";
const baseURL = useRuntimeConfig().public.baseURL;
const auth = useAuthStore();
const tost = useTostStore();
const apiUrl = useRuntimeConfig().public.apiURL;
const errors = reactive(useErrors());
const globalStore = useGlobalStore();
const {currentLocale, dir} = useLang();
const {t} = useI18n();
const localePath = useLocalePath();
useHead({
  title: t("contact"),
  meta: [{name: "title", content: t("contact")}],
});

let contact = reactive({
  title: "",
  message: "",
});
const sendMessage = async () => {
  /* if (Object.keys(auth.user).length <= 0 && localStorage.getItem("user") == null) {
    localePath("/login");
    tost.add({
      type: "error",
      message: "يجب تسجيل الدخول اولا",
    });
  } */
  try {
    await useAsyncData("sendMessage", () =>
      $fetch(`${apiUrl}/sendMessage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: {locale: currentLocale.value, ...contact},
      }).then(res => {
        if (res.status) {
          tost.add({
            type: "success",
            message: currentLocale.value == "ar" ? `تم ارسال رسالتك الي المسؤولين` : `success send your message`,
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
          } else if (res.errCode == 0) {
            navigateTo(localePath("/login"));
            tost.add({
              type: "error",
              message: res.message,
            });
          }
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
};
</script>
