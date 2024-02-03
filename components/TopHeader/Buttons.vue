<template>
  <div class="w-1/3 hidden lg:flex items-center justify-end gap-x-2">
    <nuxt-link
      :to="localePath('/login')"
      class="text-fp3 bg-slate-100 hover:bg-slate-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 dark:text-white transition-colors text-center focus:ring-4 focus:ring-fp3 font-bold rounded-lg text-md px-2 py-1.5 block focus:outline-none dark:focus:ring-fp3 w-1/3"
      v-if="!auth.isLoggedIn"
    >
      <Icon name="mdi-lock-open" class="text-fp3 dark:text-white text-2xl me-1" />
      {{ $t("login") }}
    </nuxt-link>
    <nuxt-link
      :to="localePath('/register')"
      class="text-fp3 bg-slate-100 hover:bg-slate-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 dark:text-white transition-colors text-center focus:ring-4 focus:ring-fp3 font-bold rounded-lg text-md px-2 py-1.5 block focus:outline-none dark:focus:ring-fp3 w-1/3"
      v-if="!auth.isLoggedIn"
    >
      <Icon name="mdi-account-plus" class="text-fp3 dark:text-white text-2xl me-1" />
      {{ $t("create_new_account") }}
    </nuxt-link>
    <button
      @click.stop="auth.openModalWallet = true"
      v-if="auth.isLoggedIn"
      class="text-fp3 bg-slate-100 hover:bg-slate-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 dark:text-white transition-colors text-center focus:ring-4 focus:ring-fp3 font-bold rounded-lg text-md px-2 py-1.5 block focus:outline-none dark:focus:ring-fp3 w-fit"
    >
      <Icon name="game-icons:wallet" class="text-green-400 text-2xl me-1" />
      إشحن محفظتك الأن
    </button>
  </div>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
const auth = useAuthStore();
const {currentLocale} = useLang();
</script>
