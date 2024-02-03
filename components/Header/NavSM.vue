<template>
  <nav class="bg-white dark:bg-fpDark2 dark:text-fpLightBack fixed inset-y-0 end-0 w-5/6 z-50 px-4 pt-4 flex flex-col overflow-y-scroll">
    <div class="lg:hidden">
      <div class="flex items-center justify-between gap-x-2">
        <button type="button" class="outline-gray-100 outline rounded-md" @click="globalStore.toggleMenu = !globalStore.toggleMenu">
          <Icon name="ic-round-close" class="text-4xl font-bold" />
        </button>
        <img src="~/assets/images/global/logo.png" alt="logo" class="w-16" />
      </div>
    </div>
    <ul class="flex flex-col divide-y dark:divide-fpDark2 mt-6 h-full text-md font-normal">
      <li class="py-3">
        <nuxt-link :to="localePath('/')" @click="globalStore.closeMenu()" class="text-fpDark2 dark:text-gray-300 flex items-center justify-between">
          <span>{{ $t("home") }}</span>
          <Icon class="text-3xl ms-auto" name="ic-baseline-house" />
        </nuxt-link>
      </li>
      <li class="py-3">
        <nuxt-link :to="localePath('/sections')" @click="globalStore.closeMenu()" class="text-fpDark2 dark:text-gray-300 flex items-center justify-between">
          <span>{{ $t("classes") }}</span>
          <Icon class="text-3xl" name="uis:window-section" />
        </nuxt-link>
      </li>
      <li class="py-3">
        <nuxt-link :to="localePath('/teachers')" @click="globalStore.closeMenu()" class="text-fpDark2 dark:text-gray-300 flex items-center justify-between">
          <span>{{ $t("teachers") }}</span>
          <Icon class="text-3xl" name="game-icons:teacher" />
        </nuxt-link>
      </li>
      <li class="py-3">
        <nuxt-link :to="localePath('/subjects')" @click="globalStore.closeMenu()" class="text-fpDark2 dark:text-gray-300 flex items-center justify-between">
          <span>{{ $t("subjects") }}</span>
          <Icon class="text-3xl" name="mdi:book-open-page-variant-outline" />
        </nuxt-link>
      </li>

      <li class="py-3">
        <nuxt-link :to="localePath('/offers')" @click="globalStore.closeMenu()" class="offers text-fpDark2 dark:text-gray-300 flex items-center justify-between"
          ><span>{{ $t("offers") }}</span>
          <Icon class="text-3xl" name="ic:baseline-card-giftcard" />
        </nuxt-link>
      </li>

      <li class="py-3">
        <nuxt-link :to="localePath('/about')" @click="globalStore.closeMenu()" class="text-fpDark2 dark:text-gray-300 flex items-center justify-between">
          <span>{{ $t("about") }}</span>
          <Icon class="text-3xl" name="mdi-account-box-multiple-outline" />
        </nuxt-link>
      </li>
      <li class="py-3">
        <nuxt-link :to="localePath('/review')" @click="globalStore.closeMenu()" class="reviews text-fpDark2 dark:text-gray-300 flex items-center justify-between"
          ><span>{{ $t("reviews") }}</span>
          <Icon class="text-3xl" name="ph-users-three-bold" />
        </nuxt-link>
      </li>

      <li class="py-3">
        <nuxt-link :to="localePath('/contact')" @click="globalStore.closeMenu()" class="text-fpDark2 dark:text-gray-300 flex items-center justify-between">
          <span>{{ $t("contact") }}</span>
          <Icon class="text-3xl" name="ph-envelope-open-fill" />
        </nuxt-link>
      </li>
    </ul>
    <div class="flex flex-col justify-center items-center gap-y-3 py-4">
      <nuxt-link
        v-if="!auth.isLoggedIn"
        :to="localePath('/login')"
        @click="globalStore.closeMenu()"
        class="text-fp2 dark:text-fpLightBack bg-blue-400/20 hover:bg-blue-400/50 transition-colors focus:ring-4 font-bold rounded-lg text-lg px-2 py-2 ms-auto focus:outline-none block w-full text-center"
      >
        <Icon name="mdi-lock-open" class="text-inherit text-2xl -mt-1 me-1" />
        {{ $t("login") }}
      </nuxt-link>
      <nuxt-link
        :to="localePath('/register')"
        v-if="!auth.isLoggedIn"
        @click="globalStore.closeMenu()"
        class="text-fp2 dark:text-fpLightBack bg-blue-400/20 hover:bg-blue-400/50 transition-colors focus:ring-4 font-bold rounded-lg text-lg px-2 py-1.5 ms-auto focus:outline-none block w-full text-center"
      >
        <Icon name="mdi-account-plus" class="text-inherit text-2xl -mt-1 me-1" />
        {{ $t("create_new_account") }}
      </nuxt-link>
      <button
        @click.stop="changelocal()"
        @click="globalStore.closeMenu()"
        type="button"
        class="text-fp2 dark:text-fpLightBack w-full inline-flex items-center font-medium justify-center px-4 py-2 rounded-lg cursor-pointer bg-blue-400/20 relative"
      >
        <Icon :name="locale == 'ar' ? 'openmoji-flag-us-outlying-islands' : 'twemoji-flag-saudi-arabia'" class="text-2xl" />
        <span class="text-xl ms-2">{{ locale == "ar" ? "English" : "العربية" }} </span>
      </button>
      <ul class="flex items-center gap-x-3 justify-around border-t-2 pt-4 w-full">
        <li>
          <a :href="globalStore.appSettings.facebook" target="_blank"
            ><Icon class="text-fpDark1 dark:text-fpLightBack hover:text-[#1877f2] transition hover:scale-110 text-4xl" name="uil-facebook"
          /></a>
        </li>
        <li>
          <a :href="globalStore.appSettings.instagram" target="_blank"
            ><Icon class="text-fpDark1 dark:text-fpLightBack hover:text-[#c13584] transition hover:scale-110 text-4xl" name="ri-instagram-fill"
          /></a>
        </li>
        <li>
          <a :href="globalStore.appSettings.youtube" target="_blank"
            ><Icon class="text-fpDark1 dark:text-fpLightBack hover:text-red-600 transition hover:scale-110 text-4xl" name="formkit:youtube"
          /></a>
        </li>
        <li>
          <a :href="`http://wa.me/${globalStore.appSettings.whatsapp}`" target="_blank"
            ><Icon class="text-fpDark1 dark:text-fpLightBack hover:text-[#4aae20] transition hover:scale-110 text-4xl" name="ri-whatsapp-fill"
          /></a>
        </li>
        <li>
          <a :href="`${globalStore.appSettings.telegram}`" target="_blank"
            ><Icon class="text-fpDark1 dark:text-fpLightBack hover:text-blue-600 transition hover:scale-110 text-4xl" name="ic:round-telegram"
          /></a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const auth = useAuthStore();
const {t, locale, setLocale} = useI18n();
const changelocal = () => {
  setLocale(locale.value == "ar" ? "en" : "ar");
};
</script>
