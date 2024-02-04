<template>
  <header class="bg-slate-100 dark:bg-fpDark2 sticky top-0 start-0 z-100 whitespace-nowrap">
    <HeaderWhatsapp />
    <div class="container flex items-center mx-auto py-2">
      <div class="w-full lg:w-1/12 flex justify-between items-center">
        <nuxt-link :to="localePath('/')">
          <img src="~/assets/images/global/logo.png" alt="logo transparent" class="w-16" />
        </nuxt-link>
        <button type="button" class="dark:bg-white rounded-xl block lg:hidden" @click="globalStore.toggleMenu = !globalStore.toggleMenu">
          <img src="~/assets/images/student/menu.svg" alt="" class="w-12" />
        </button>
      </div>
      <div v-if="globalStore.toggleMenu" class="fixed inset-0 z-20 backdrop-blur-sm bg-black/[0.3] lg:hidden" @click="globalStore.toggleMenu = !globalStore.toggleMenu"></div>
      <HeaderNavLG />
      <Transition :name="locale == 'ar' ? 'slide-left' : 'slide-right'">
        <HeaderNavSM v-if="globalStore.toggleMenu" />
      </Transition>

      <HeaderButtons class="hidden xl:flex" />
      <TransitionGroup name="lessons-down" v-if="globalStore.ModalMessage">
        <ModalMessage />
      </TransitionGroup>
    </div>
  </header>
</template>

<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {locale} = useI18n();
// "active"
onMounted(() => {
  document.documentElement.classList.add(localStorage.getItem("mode") || globalStore.mode);
  let barScroll = document.getElementById("bar-scroll");
  window.addEventListener("scroll", function () {
    barScroll.style.cssText = `width:${Math.trunc((window.pageYOffset / (document.documentElement.scrollHeight - window.outerHeight)) * 100)}%;`;
  });
});
</script>

<style>
.slide-right-enter-active {
  transition: all 0.3s ease-out;
}

.slide-right-leave-active {
  transition: all 0.4s ease-in;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0.5;
}

.slide-left-enter-active {
  transition: all 0.3s ease-out;
}

.slide-left-leave-active {
  transition: all 0.4s ease-in;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0.5;
}
.menu-down-enter-active,
.menu-down-leave-active {
  transition: all 0.2s linear;
}
.menu-down-enter-from,
.menu-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.z-100 {
  z-index: 100;
}
@media (min-width: 1024px) {
  .lg\:hidden {
    display: none !important;
  }
}
</style>
