<template>
  <section>
    <div class="lg:container lg:mx-auto my-24" v-show="StudentStore.pageShow">
      <Skeleton type="image_text" :count="6" />
    </div>
    <div v-show="!StudentStore.pageShow">
      <StudentHeader />
      <div :class="globalStore.menuMobileScreen ? 'open-menu-app' : 'close-menu-app'" class="flex container-app" id="container-app">
        <span
          @click="globalStore.menuMobileScreen = !globalStore.menuMobileScreen"
          class="close-menu overlay-menu fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm overlay-sidebar lg:hidden"
        ></span>
        <div
          class="h-full lg:h-[86.4vh] wrap-menu fixed lg:sticky z-50 lg:z-40 bg-white dark:bg-fpDark1 start-0 top-0 bottom-0 w-4/6 lg:w-1/6 border border-gray-300 dark:border-fpDark2 pt-14 lg:py-6 overflow-hidden no-scroll transition-all duration-300"
        >
          <button
            @click="globalStore.menuMobileScreen = !globalStore.menuMobileScreen"
            class="close-menu h-6 w-6 inline-flex items-center justify-center lg:hidden rounded p-1 bg-fp1 hover:bg-fp1 absolute top-2 end-2"
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 13L1 1M13 1L1 13" stroke="white" stroke-width="2" stroke-linecap="round"></path>
            </svg>
          </button>
          <StudentSidebar />
        </div>
        <div class="w-full lg:w-5/6 h-[86.4vh] overflow-y-scroll ">
          <TransitionGroup name="taps-down">
            <StudentProfile v-if="StudentStore.showStudentMenu == 'profile'" :user="StudentStore.returnData.user" />
            <StudentCourses v-if="StudentStore.showStudentMenu == 'courses'" :courses="StudentStore.returnData.courses" />
            <StudentOffers v-if="StudentStore.showStudentMenu == 'offers'" :offers="StudentStore.returnData.offers" />
            <StudentFiles v-if="StudentStore.showStudentMenu == 'files'" :courses="StudentStore.returnData.courses" />
            <StudentCertificates v-if="StudentStore.showStudentMenu == 'certificates'" :certificates="StudentStore.returnData.certificates" />
            <StudentExams v-if="StudentStore.showStudentMenu == 'exams'" :courses="StudentStore.returnData.courses" />
            <StudentInvoices v-if="StudentStore.showStudentMenu == 'invoices'" :invoices="StudentStore.returnData.invoices" />
            <StudentSettings v-if="StudentStore.showStudentMenu == 'settings'" />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useStudentStore} from "@/store/StudentStore";
import {useGlobalStore} from "@/store/GlobalStore";
const StudentStore = useStudentStore();
const globalStore = useGlobalStore();
const localePath = useLocalePath();
globalStore.showHeaders = false;
const {t} = useI18n();
useHead({
  title: t("student"),
  meta: [{name: "title", content: t("student")}],
});

if (process.client) {
  if (localStorage.getItem("user") == null) {
    navigateTo(localePath("/"));
  }
  setTimeout(() => {
    if (StudentStore.pageShow) {
      StudentStore.setValueStudentMenu("profile");
    }
  }, 500);
}
</script>
