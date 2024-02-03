<template>
  <div
    :title="$t('profile')"
    class="bg-gray-200 hover:bg-fp1 dark:bg-fpDark2 xl:dark:bg-fpDark1 text-fp3 dark:text-fp2 hover:dark:text-white relative flex items-center text-sm font-medium text-center rounded-full p-1 transition cursor-pointer group"
    @click="globalStore.hoverProfile = !globalStore.hoverProfile"
    @mouseleave="globalStore.hoverProfile = false"
    v-if="auth.isLoggedIn"
  >
    <Icon name="ph-user-circle-fill" class="text-4xl group-hover:text-white" />
    <transition name="menu-down" v-show="globalStore.hoverProfile">
      <!-- style="display: none" -->
      <div
        class="bg-gray-50 dark:text-gray-300 dark:bg-fpDark1 fixed lg:absolute top-16 lg:top-10 end-0 lg:-end-20 w-full lg:w-72 z-[110] rounded-lg shadow-xl dark:border-t dark:border-t-fp2"
      >
        <div class="flex items-center gap-x-3 border-b border-b-fpLightGray dark:border-b-fpDark2 pb-2 p-4">
          <div>
            <img v-if="auth.user.photo" :src="`${baseURL}/images/${auth.user.photo}`" class="sm:mb-4 object-cover w-14 h-14 rounded-full inline" alt="user photo" />
            <img v-else src="~/assets/images/global/avatar.jpg" class="sm:mb-4 object-cover w-14 h-14 rounded-full inline" alt="user photo" />
          </div>
          <div>
            <p v-text="auth.user['name_' + currentLocale]" class="text-xl"></p>
            <p v-text="auth.user.email" class="text-md text-start text-fpDarkGray"></p>
            <p class="mt-2 text-start text-md text-green-500">
              الرصيد :
              <span class="font-bold">{{ auth.user.balance }}</span>
              جنية
            </p>
          </div>
        </div>
        <!-- student -->
        <ul class="flex flex-col divide-y divide-gray-200 dark:divide-fpDark2 overflow-y-scroll no-scroll">
          <li>
            <nuxt-link
            :to="localePath(`/student`)"
              @click="StudentStore.setValueStudentMenu('profile')"
              class="bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 w-full text-start px-4 py-2 transition block"
            >
              <Icon name="ic:baseline-account-box" class="text-4xl" />
              <span class="text-lg ms-2">{{ $t("profile") }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath(`/student`)"
              @click="StudentStore.setValueStudentMenu('courses')"
              class="bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 w-full text-start px-4 py-2 transition block"
            >
              <Icon name="ic:outline-ondemand-video" class="text-4xl" />
              <span class="text-lg ms-2">{{ $t("my_courses") }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath(`/student`)"
              @click="StudentStore.setValueStudentMenu('offers')"
              class="bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 w-full text-start px-4 py-2 transition block"
            >
              <Icon name="ic:baseline-card-giftcard" class="text-4xl" />
              <span class="text-lg ms-2">{{ $t("my_offers") }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath(`/student`)"
              @click="StudentStore.setValueStudentMenu('files')"
              class="bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 w-full text-start px-4 py-2 transition block"
            >
              <Icon name="ph:files-bold" class="text-4xl" />
              <span class="text-lg ms-2">{{ $t("my_files") }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath(`/student`)"
              @click="StudentStore.setValueStudentMenu('certificates')"
              class="bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 w-full text-start px-4 py-2 transition block"
            >
              <Icon name="fluent:certificate-24-regular" class="text-4xl" />
              <span class="text-lg ms-2">{{ $t("my_certificates") }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath(`/student`)"
              @click="StudentStore.setValueStudentMenu('exams')"
              class="bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 w-full text-start px-4 py-2 transition block"
            >
              <Icon name="ic:outline-help-center" class="text-4xl" />
              <span class="text-lg ms-2">{{ $t("my_exams") }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath(`/student`)"
              @click="StudentStore.setValueStudentMenu('invoices')"
              class="bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 w-full text-start px-4 py-2 transition block"
            >
              <Icon name="fa6-solid:file-invoice-dollar" class="text-4xl" />
              <span class="text-lg ms-2">{{ $t("invoices") }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath(`/student`)"
              @click="StudentStore.setValueStudentMenu('settings')"
              class="bg-gray-100 hover:bg-gray-200 dark:bg-fpDark2 dark:hover:bg-fpDark3 w-full text-start px-4 py-2 transition block"
            >
              <Icon name="ic:outline-settings" class="text-4xl" />
              <span class="text-lg ms-2">{{ $t("settings") }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useGlobalStore} from "@/store/GlobalStore";
import {useStudentStore} from "@/store/StudentStore";
const StudentStore = useStudentStore();
const globalStore = useGlobalStore();
const auth = useAuthStore();
const baseURL = useRuntimeConfig().public.baseURL;
const {currentLocale} = useLang();
</script>
