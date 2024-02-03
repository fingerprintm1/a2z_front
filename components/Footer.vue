<template>
  <section class="relative bg-slate-100 dark:bg-fpDark2">
    <footer class="bg-header py-10 relative">
      <div class="container mx-auto 2xl:px-0 flex flex-col items-center lg:flex-row lg:items-start gap-x-10">
        <div class="lg:w-1/4 text-center lg:text-start lg:flex flex-col justify-center items-center">
          <div class="flex items-center gap-x-2">
            <div class="border-e-4 pe-2">
              <p class="text-fp3 text-3xl font-bold">{{ $t(`site_name`) }}</p>
              <p class="text-black dark:text-white text-xs mt-4 whitespace-nowrap">{{ $t("small_text_footer") }}</p>
            </div>
            <div class="">
              <img src="~/assets/images/global/logo-regtangle.png" alt="background footer" class="" />
            </div>
          </div>
          <p class="text-black dark:text-white text-justify sm:mt-6" v-html="globalStore.appSettings.description_footer"></p>
        </div>
        <div class="lg:w-1/4 text-center lg:text-start xl:flex flex-col justify-center items-center sm:mt-6">
          <h2 class="text-fp1 text-4xl font-bold">{{ $t("quick_links") }}</h2>
          <ul class="mt-4 space-y-2 text-xl w-[188px]">
            <li>
              <nuxt-link class="text-black hover:text-fp1 dark:text-white hover:dark:text-fp1 transition" :to="localePath(`/sections`)">{{ $t("sections") }} </nuxt-link>
            </li>
            <li>
              <nuxt-link class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition" :to="localePath(`/teachers`)">{{ $t("teachers") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition" :to="localePath(`/subjects`)">{{ $t("subjects") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition" :to="localePath(`/offers`)">{{ $t("offers") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition" :to="localePath(`/about`)">{{ $t("about") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition" :to="localePath(`/review`)">{{ $t("reviews") }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="lg:w-1/4 text-center lg:text-start xl:flex flex-col justify-center items-center sm:mt-6">
          <h2 class="text-fp1 text-4xl font-bold">{{ $t("important_links") }}</h2>
          <ul class="mt-4 space-y-2 text-xl">
            <li>
              <nuxt-link :to="localePath('/privacyPolicy')" class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition">{{ $t("privacy_policy") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/CommonQuestions')" class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition">{{
                $t("Frequently_asked_questions")
              }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/review')" class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition">{{ $t("number_ratings") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/contact')" class="text-black dark:text-white hover:text-fp1 hover:dark:text-fp1 transition">{{ $t("contact") }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="lg:w-1/4 -mt-3 text-center lg:text-start xl:flex flex-col justify-center items-center relative sm:mt-6">
          <h2 class="text-fp1 text-4xl font-bold">{{ $t("contact") }}</h2>
          <a :href="`mailto:${globalStore.appSettings.email}`" target="_blank" class="text-black dark:text-white text-xl hover:text-fp1 hover:dark:text-fp1 transition mt-4 block"
            ><Icon class="text-xl text-inherit" name="ic-sharp-email" />{{ globalStore.appSettings.email }}</a
          >
          <a :href="`tel: ${globalStore.appSettings.phone}`" target="_blank" class="text-black dark:text-white text-xl hover:text-fp1 hover:dark:text-fp1 transition mt-2 block"
            ><Icon class="text-xl text-inherit" name="ic-baseline-phone-enabled" />{{ globalStore.appSettings.phone }}</a
          >
          <a
            :href="`http://wa.me/${globalStore.appSettings.whatsapp}`"
            target="_blank"
            class="text-black dark:text-white text-xl hover:text-fp1 hover:dark:text-fp1 transition mt-2 block"
            ><Icon class="text-xl text-inherit" name="ic-outline-admin-panel-settings" /> {{ $t("contact_manege") }}</a
          >
          <ul class="flex items-center justify-center gap-x-3 mt-4">
            <li>
              <a :href="globalStore.appSettings.facebook" target="_blank"
                ><Icon class="text-black dark:text-white hover:text-[#1877f2] hover:dark:text-[#1877f2] transition hover:scale-110 text-4xl" name="uil-facebook"
              /></a>
            </li>
            <li>
              <a :href="globalStore.appSettings.instagram" target="_blank"
                ><Icon class="text-black dark:text-white hover:text-[#c13584] hover:dark:text-[#c13584] transition hover:scale-110 text-4xl" name="ri-instagram-fill"
              /></a>
            </li>
            <li>
              <a :href="globalStore.appSettings.youtube" target="_blank"
                ><Icon class="text-black dark:text-white hover:text-red-600 hover:dark:text-red-600 transition hover:scale-110 text-4xl" name="formkit:youtube"
              /></a>
            </li>
            <li>
              <a :href="`http://wa.me/${globalStore.appSettings.whatsapp}`" target="_blank"
                ><Icon class="text-black dark:text-white hover:text-[#4aae20] hover:dark:text-[#4aae20] transition hover:scale-110 text-4xl" name="ri-whatsapp-fill"
              /></a>
            </li>
            <li>
              <a :href="`${globalStore.appSettings.telegram}`" target="_blank"
                ><Icon class="text-black dark:text-white hover:text-blue-600 hover:dark:text-blu-600 transition hover:scale-110 text-4xl" name="ic:round-telegram"
              /></a>
            </li>
          </ul>
          <ul class="flex items-center flex-wrap gap-3 mt-4 bg-white py-4 ps-4 rounded-lg">
            <li class="w-1/6">
              <img src="~/assets/images/global/visa.png" alt="background footer" class="" />
            </li>
            <li class="w-1/6">
              <img src="~/assets/images/global/wallet.png" alt="background footer" class="w-4/6" />
            </li>
            <li class="w-1/6 bg-white">
              <img src="~/assets/images/global/mastercard.png" alt="background footer" class="" />
            </li>
            <li class="w-1/6">
              <img src="~/assets/images/global/mada.png" alt="background footer" class="" />
            </li>
            <li class="w-1/6">
              <img src="~/assets/images/global/qr_code.png" alt="background footer" class="w-5/6" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <div class="bg-fp1 dark:bg-fpDark1 py-2">
      <p class="text-center text-gray-50 text-xl">
        {{ $t("text_footer") }} {{ $t("site_name") }} {{ $t("by") }}
        <a href="https://fingerprintm.com/" target="_blank" class="text-fp2 font-bold text-2xl">{{ $t("fingerprint") }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {currentLocale, dir} = useLang();
</script>
