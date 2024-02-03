<template>
  <div class="w-full xl:w-2/12 flex justify-between xl:justify-end items-center gap-x-4">
    <button
      :title="t('change_language')"
      @click.stop="changelocal()"
      type="button"
      class="hidden xl:inline-flex items-center font-bold justify-center px-4 py-2 rounded-lg cursor-pointer bg-gray-200 dark:bg-fpDark2 xl:dark:bg-fpDark1 hover:bg-fp1 text-fp1 dark:text-fp2 hover:dark:text-white hover:text-white relative z-50 transition"
    >
      <Icon :name="locale == 'ar' ? 'openmoji-flag-us-outlying-islands' : 'twemoji-flag-saudi-arabia'" class="text-2xl" />
      <span class="text-xl ms-2">{{ locale == "ar" ? "English" : "العربية" }} </span>
    </button>
    <button
      title="Dark mode and Light mode"
      :class="auth.isLoggedIn ? '' : 'ms-auto'"
      @click.stop="globalStore.toggleDarkmode()"
      class="bg-gray-200 hover:bg-fp1 dark:bg-fpDark2 xl:dark:bg-fpDark1 text-fp3 dark:text-fp2 hover:dark:text-white hover:text-white rounded-full p-1"
    >
      <Icon class="text-4xl" name="ph-moon-fill" v-show="globalStore.mode == 'light'" />
      <Icon id="toggleMode" class="text-4xl" name="ph-sun-fill" v-show="globalStore.mode == 'dark'" />
    </button>
    <button
      v-if="auth.isLoggedIn"
      title="إشحن محفظتك الأن"
      type="button"
      @click.stop="auth.openModalWallet = true"
      class="text-fp3 dark:text-fp2 hover:dark:text-white hover:text-white bg-gray-50 dark:bg-fpDark2 xl:dark:bg-fpDark1 rounded-full p-1 grid place-content-center lg:hidden"
    >
      <Icon name="ic:baseline-account-balance-wallet" class="text-4xl" :class="locale == 'ar' ? 'rotate-180' : ''" />
    </button>
    <HeaderNotifications />
    <HeaderProfile />

    <button
      :title="t('logout')"
      type="button"
      @click="auth.logout()"
      class="bg-gray-200 hover:bg-fp1 dark:bg-fpDark2 xl:dark:bg-fpDark1 text-fp3 dark:text-fp2 hover:dark:text-white hover:text-white rounded-full p-1 grid place-content-center"
      v-if="auth.isLoggedIn"
    >
      <Icon name="ic-twotone-log-out" class="text-4xl" :class="locale == 'ar' ? 'rotate-180' : ''" />
    </button>
  </div>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const auth = useAuthStore();
const baseURL = useRuntimeConfig().public.baseURL;
const {currentLocale} = useLang();
const {t, locale, setLocale} = useI18n();
const changelocal = () => {
  setLocale(locale.value == "ar" ? "en" : "ar");
};
</script>
