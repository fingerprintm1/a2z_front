<template>
  <button
    :title="$t('notification_course_offer_post')"
    type="button"
    class="bg-gray-200 hover:bg-fp1 dark:bg-fpDark2 xl:dark:bg-fpDark1 text-fp3 dark:text-fp2 hover:dark:text-white hover:text-white relative flex items-center text-sm font-medium text-center rounded-full p-1 transition"
    @click="globalStore.hoverNotification = !globalStore.hoverNotification"
    @mouseleave="globalStore.hoverNotification = false"
    v-if="auth.isLoggedIn"
  >
    <Icon name="mdi-bell" class="text-4xl text-inherit" />
    <div
      v-if="Object.keys(globalStore.notifications).length"
      class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"
    >
      {{ globalStore.notifications.length }}
    </div>
    <!--  ?read=true -->
    <transition name="menu-down" v-show="globalStore.hoverNotification" v-if="Object.keys(globalStore.notifications).length > 0">
      <div
        style="display: none"
        class="bg-gray-50 dark:text-gray-300 dark:bg-fpDark1 fixed lg:absolute top-16 lg:top-10 end-0 w-full lg:w-72 z-[110] rounded-lg shadow-xl dark:border-t dark:border-t-fp2"
      >
        <div class="flex items-center justify-between border-b border-b-fpLightGray dark:border-b-fpDark2 pb-2 p-4">
          <p class="text-gray-900 dark:text-gray-300 text-xl">{{ $t("notification") }}</p>
          <button @click="globalStore.markAsRead()" type="button" class="bg-fp1 hover:bg-fp2 text-white px-2 py-1.5 rounded-full">
            {{ globalStore.notifications.length }} {{ $t("read_all") }}
          </button>
        </div>
        <ul class="flex flex-col divide-y divide-gray-200 dark:divide-fpDark2 h-[50vh] overflow-y-scroll">
          <li v-for="notification in globalStore.notifications" :key="notification.id">
            <!-- globalStore.HashURLFile(`${baseURL}/images/certificates/${notification.data.certificate.file}.pdf`); -->
            <button
              v-if="'certificate' in notification.data"
              @click="
                globalStore.removeNotificationUser('certificate', notification.id);
                globalStore.HashURLFile(`${baseURL}/images/certificates/${notification.data.certificate.file}.pdf`);
              "
              class="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 text-fp1 hover:text-fp2 p-2"
            >
              <span class="flex flex-col text-start ms-2">
                <span class="text-lg dark:text-fpLightBack" v-text="`${notification.data.certificate.message ?? ''}`"></span>
              </span>
            </button>
            <button
              v-if="'message' in notification.data"
              @click="
                globalStore.removeNotificationUser('message', notification.id);
                globalStore.messageNotification = notification.data.message;
                globalStore.ModalMessage = true;
              "
              class="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 text-fp1 hover:text-fp2 p-2"
            >
              <span class="flex flex-col text-start ms-2">
                <span class="text-lg dark:text-fpLightBack">{{ $t("message_site") }}</span>
              </span>
            </button>
            <nuxt-link
              v-if="'course' in notification.data"
              @click="globalStore.removeNotificationUser('course', notification.id)"
              :to="localePath(`/course/${notification.data.course.id}`)"
              class="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 text-fp1 hover:text-fp2 p-2"
            >
              <img :src="`${baseURL}/images/${notification.data.course.photo}`" alt="post image" class="w-12 h-12 rounded-full object-cover" />
              <span class="flex flex-col text-start ms-2">
                <span class="text-lg dark:text-fpLightBack" v-text="`${notification.data.course.message ?? ''}  ${notification.data.course.name}`"></span>
                <!-- <p class="mt-1 dark:text-gray-300 cut_text_css" v-html="String(notification.data.course['description_' + currentLocale])"></p> -->
              </span>
            </nuxt-link>
            <nuxt-link
              v-else-if="'offer' in notification.data"
              @click="globalStore.removeNotificationUser('offer', notification.id)"
              :to="localePath(`/offer/${notification.data.offer.id}`)"
              class="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 text-fp1 hover:text-fp2 p-2"
            >
              <img :src="`${baseURL}/images/${notification.data.offer.photo}`" alt="post image" class="w-12 h-12 rounded-full object-cover" />
              <span class="flex flex-col text-start ms-2">
                <span class="text-xl dark:text-fpLightBack" v-text="`${notification.data.offer.message ?? ''}   ${notification.data.offer['name_' + currentLocale]}`"></span>
                <!-- <p class="mt-1 dark:text-gray-300 cut_text_css" v-html="String(notification.data.offer['description_' + currentLocale])"></p> -->
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </button>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const auth = useAuthStore();
const baseURL = useRuntimeConfig().public.baseURL;
const {currentLocale} = useLang();
</script>
