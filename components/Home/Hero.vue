<template>
  <section class="lg:pt-5 relative hero-section" :style="`background-image: url('${baseURL}/images/${globalStore.appSettings.bg_hero}')`">
    <div class="container mx-auto flex flex-col lg:flex-row relative z-10 h-full">
      <div class="lg:w-1/2 mt-8">
        <div class="flex flex-col justify-center" v-if="Object.keys(globalStore.appSettings).length > 0">
          <h1 class="text-3xl lg:text-6xl py-2 font-bold text-white text-reflect type-writer" v-text="globalStore.appSettings.title_hero"></h1>
          <h3 class="" v-html="globalStore.appSettings.description_hero"></h3>
        </div>

        <div class="flex items-center sm:flex-wrap sm:justify-between sm:gap-y-6 gap-x-2 lg:gap-x-10 w-full my-10">
          <nuxt-link
            v-if="!auth.isLoggedIn"
            :to="localePath('/login')"
            class="lg:hidden text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
          >
            {{ $t("login") }}
            <Icon name="mdi-lock-open" class="text-white text-xl -mt-1" />
          </nuxt-link>
          <nuxt-link
            v-if="!auth.isLoggedIn"
            :to="localePath('/register')"
            class="lg:hidden text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-5 lg:px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
          >
            {{ $t("create_new_account") }}
            <Icon name="mdi-account-plus" class="text-white text-xl -mt-1" />
          </nuxt-link>
          <nuxt-link
            :to="localePath('/contact')"
            class="text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-6 lg:px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
          >
            {{ $t("contact") }}
            <Icon name="ic:outline-contact-mail" class="text-white text-xl -mt-1" />
          </nuxt-link>
          <!-- <nuxt-link
              :to="localePath('/subjects')"
              class="text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-5 lg:px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
            >
              {{ $t("all_courses") }}
              <Icon name="ic:baseline-ondemand-video" class="text-white text-xl" />
            </nuxt-link> -->
          <nuxt-link
            :to="localePath('/offers')"
            class="text-white whitespace-nowrap bg-fp2 hover:bg-fp3 dark:bg-fp1 dark:hover:bg-fp2 transition font-bold rounded-lg text-md lg:text-lg text-center px-4 py-2 lg:py-2.5 block focus:outline-none dark:focus:ring-fp2"
          >
            {{ $t("all_offers") }}
            <Icon name="ic:round-card-giftcard" class="text-white text-xl" />
          </nuxt-link>
        </div>
      </div>
      <div class="lg:w-1/2">
        <img :src="`${baseURL}/images/${globalStore.appSettings.avatar_hero}`" alt="hero web" class="w-10/12 mx-auto lg:ms-auto" />
      </div>
    </div>
    <svg class="xl:-mt-60 hidden dark:hidden lg:block" width="1919" height="169" viewBox="0 0 1919 169" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_103_401)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1919 169V26.5172C1856.18 8.84278 1791.64 -6.09849e-06 1727.1 -6.09849e-06C1662.56 -6.09849e-06 1598.02 8.84278 1535.2 26.5172L1533.5 26.9967C1408.94 61.7211 1277.66 61.7211 1153.1 26.9967L1151.4 26.5172L1147.99 25.5805C1024.51 -8.51386 894.49 -8.51386 771.01 25.5805L767.6 26.5172L765.9 26.9967C641.34 61.7211 510.06 61.7211 385.5 26.9967L383.8 26.5172C320.98 8.84278 256.44 -6.09849e-06 191.9 -6.09849e-06C127.36 -6.09849e-06 62.82 8.84278 0 26.5172V169H1919Z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="clip0_103_401">
          <rect width="1919" height="169" fill="white" transform="matrix(1 0 0 -1 0 169)" />
        </clipPath>
      </defs>
    </svg>
  </section>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useGlobalStore} from "@/store/GlobalStore";
const auth = useAuthStore();
const globalStore = useGlobalStore();
const baseURL = useRuntimeConfig().public.baseURL;
</script>
