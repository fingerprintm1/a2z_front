<template>
  <transition name="button-up" v-show="showButton">
    <button
      @click="scrollUp()"
      class="button-up bg-fpDark1 dark:bg-fpDark2 dark:hover:bg-fpDark2/70 hover:bg-gray-950 shadow-xl rounded-lg lg:p-2 fixed justify-center items-center start-4 lg:start-8 bottom-4 lg:bottom-8 z-51 transition-all duration-300 border-none flex"
    >
      <Icon name="mdi-chevron-up" class="text-white text-4xl" />
    </button>
  </transition>
</template>

<script setup>
let showButton = ref(false);
onMounted(() => {
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 1000) {
      showButton.value = true;
    } else {
      showButton.value = false;
    }
  });
});
const scrollUp = () => {
  window.scrollTo({top: 0});
};
</script>

<style>
.z-51 {
  z-index: 51;
}
.button-up-enter-active,
.button-up-leave-active {
  transition: all 0.2s linear;
}
.button-up-enter-from,
.button-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
