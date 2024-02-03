<template>
  <section class="overflow-y-scroll lg:overflow-y-auto h-full no-scroll">
    <nav class="student text-gray-500 font-bold flex flex-col gap-y-2 overflow-hidden">
      <button
        @click="StudentStore.setValueStudentMenu('profile')"
        :class="[StudentStore.showStudentMenu == 'profile' ? 'active-link' : '']"
        class="relative flex items-center ps-4 py-2 group after:content-[''] after:bg-fp1 after:rounded-e-3xl after:w-0 after:transition-all after:duration-300 hover:after:w-5/6 after:absolute after:start-0 after:top-0 after:h-full after:z-[-1] before:bg-fp1 before:rounded-s-3xl before:w-2 before:h-full hover:before:translate-x-0 before:transition-all before:duration-500 before:absolute before:end-0 before:top-0 before:-translate-x-2"
      >
        <Icon name="ph-user-circle-fill" class="p-1 rounded-lg me-4 w-10 text-5xl" />
        <span class="lg:text-md group-hover:text-white group-[.active-link]:text-white transition-all duration-300">{{ $t("profile") }}</span>
      </button>
      <button
        @click="StudentStore.setValueStudentMenu('courses')"
        :class="[StudentStore.showStudentMenu == 'courses' ? 'active-link' : '']"
        class="relative flex items-center ps-4 py-2 group after:content-[''] after:bg-fp1 after:rounded-e-3xl after:w-0 after:transition-all after:duration-300 hover:after:w-5/6 after:absolute after:start-0 after:top-0 after:h-full after:z-[-1] before:bg-fp1 before:rounded-s-3xl before:w-2 before:h-full hover:before:translate-x-0 before:transition-all before:duration-500 before:absolute before:end-0 before:top-0 before:-translate-x-2"
      >
        <img src="~/assets/images/student/my-courses.svg" alt="" class="p-1 rounded-lg me-4 w-10" />
        <span class="lg:text-md group-hover:text-white group-[.active-link]:text-white transition-all duration-300">{{ $t("my_courses") }}</span>
      </button>
      <button
        @click="StudentStore.setValueStudentMenu('offers')"
        :class="[StudentStore.showStudentMenu == 'offers' ? 'active-link' : '']"
        class="relative flex items-center ps-4 py-2 group after:content-[''] after:bg-fp1 after:rounded-e-3xl after:w-0 after:transition-all after:duration-300 hover:after:w-5/6 after:absolute after:start-0 after:top-0 after:h-full after:z-[-1] before:bg-fp1 before:rounded-s-3xl before:w-2 before:h-full hover:before:translate-x-0 before:transition-all before:duration-500 before:absolute before:end-0 before:top-0 before:-translate-x-2"
      >
        <Icon name="ic:outline-card-giftcard" class="p-1 rounded-lg me-4 w-10 text-5xl" />
        <span class="lg:text-md group-hover:text-white group-[.active-link]:text-white transition-all duration-300">{{ $t("my_offers") }}</span>
      </button>
      <button
        @click="StudentStore.setValueStudentMenu('files')"
        :class="[StudentStore.showStudentMenu == 'files' ? 'active-link' : '']"
        class="relative flex items-center ps-4 py-2 group after:content-[''] after:bg-fp1 after:rounded-e-3xl after:w-0 after:transition-all after:duration-300 hover:after:w-5/6 after:absolute after:start-0 after:top-0 after:h-full after:z-[-1] before:bg-fp1 before:rounded-s-3xl before:w-2 before:h-full hover:before:translate-x-0 before:transition-all before:duration-500 before:absolute before:end-0 before:top-0 before:-translate-x-2"
      >
        <Icon name="solar:folder-with-files-linear" class="p-1 rounded-lg me-4 w-10 text-5xl" />
        <span class="lg:text-md group-hover:text-white group-[.active-link]:text-white transition-all duration-300">{{ $t("my_files") }}</span>
      </button>
      <button
        @click="StudentStore.setValueStudentMenu('certificates')"
        :class="[StudentStore.showStudentMenu == 'certificates' ? 'active-link' : '']"
        class="relative flex items-center ps-4 py-2 group after:content-[''] after:bg-fp1 after:rounded-e-3xl after:w-0 after:transition-all after:duration-300 hover:after:w-5/6 after:absolute after:start-0 after:top-0 after:h-full after:z-[-1] before:bg-fp1 before:rounded-s-3xl before:w-2 before:h-full hover:before:translate-x-0 before:transition-all before:duration-500 before:absolute before:end-0 before:top-0 before:-translate-x-2"
      >
        <Icon name="fluent:certificate-24-regular" class="p-1 rounded-lg me-4 w-10 text-5xl" />
        <span class="lg:text-md group-hover:text-white group-[.active-link]:text-white transition-all duration-300">{{ $t("my_certificates") }}</span>
      </button>
      <button
        @click="StudentStore.setValueStudentMenu('exams')"
        :class="[StudentStore.showStudentMenu == 'exams' ? 'active-link' : '']"
        class="relative flex items-center ps-4 py-2 group after:content-[''] after:bg-fp1 after:rounded-e-3xl after:w-0 after:transition-all after:duration-300 hover:after:w-5/6 after:absolute after:start-0 after:top-0 after:h-full after:z-[-1] before:bg-fp1 before:rounded-s-3xl before:w-2 before:h-full hover:before:translate-x-0 before:transition-all before:duration-500 before:absolute before:end-0 before:top-0 before:-translate-x-2"
      >
        <Icon name="ic:sharp-help-outline" class="p-1 rounded-lg me-4 w-10 text-5xl" />
        <span class="lg:text-md group-hover:text-white group-[.active-link]:text-white transition-all duration-300">{{ $t("my_exams") }}</span>
      </button>
      <button
        @click="StudentStore.setValueStudentMenu('invoices')"
        :class="[StudentStore.showStudentMenu == 'invoices' ? 'active-link' : '']"
        class="relative flex items-center ps-4 py-2 group after:content-[''] after:bg-fp1 after:rounded-e-3xl after:w-0 after:transition-all after:duration-300 hover:after:w-5/6 after:absolute after:start-0 after:top-0 after:h-full after:z-[-1] before:bg-fp1 before:rounded-s-3xl before:w-2 before:h-full hover:before:translate-x-0 before:transition-all before:duration-500 before:absolute before:end-0 before:top-0 before:-translate-x-2"
      >
        <Icon name="fa6-solid:file-invoice-dollar" class="p-1 rounded-lg me-4 w-10 text-4xl" />
        <span class="lg:text-md group-hover:text-white group-[.active-link]:text-white transition-all duration-300">{{ $t("invoices") }}</span>
      </button>
      <button
        @click="StudentStore.setValueStudentMenu('settings')"
        :class="[StudentStore.showStudentMenu == 'settings' ? 'active-link' : '']"
        class="relative flex items-center ps-4 py-2 group after:content-[''] after:bg-fp1 after:rounded-e-3xl after:w-0 after:transition-all after:duration-300 hover:after:w-5/6 after:absolute after:start-0 after:top-0 after:h-full after:z-[-1] before:bg-fp1 before:rounded-s-3xl before:w-2 before:h-full hover:before:translate-x-0 before:transition-all before:duration-500 before:absolute before:end-0 before:top-0 before:-translate-x-2"
      >
        <img src="~/assets/images/student/setting.svg" alt="" class="p-1 rounded-lg me-4 w-10" />
        <span class="lg:text-md group-hover:text-white group-[.active-link]:text-white transition-all duration-300">{{ $t("settings") }}</span>
      </button>
    </nav>
    <section class="mt-6">
      <div class="flex flex-col bg-fp1 ms-4 me-6 lg:me-10 p-4 rounded-3xl">
        <p class="text-white text-lg lg:text-xl">{{ $t("support") }} 24/7</p>
        <span class="text-white lg:text-md">{{ $t("Contact us at any time") }}</span>
        <button
          type="button"
          class="text-fp1 bg-white hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl px-8 py-2 lg:py-1 mt-2 transition text-center lg:text-xl whitespace-nowrap w-fit"
        ></button>
        <img src="~/assets/images/student/womon.svg" alt="" class="w-40 mx-auto" />
      </div>
    </section>
    <div class="mt-8">
      <button type="button" @click="auth.logout()" class="flex items-center text-2xl hover:bg-gray-100 py-4 ps-6 transition w-full">
        <img src="~/assets/images/student/sign-out.svg" alt="" class="pe-6" /> <span class="text-fpDark2">{{ $t("logout") }}</span>
      </button>
    </div>
  </section>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useStudentStore} from "@/store/StudentStore";
const StudentStore = useStudentStore();
const auth = useAuthStore();
</script>
