<template>
  <section v-if="showLoader" :class="showLoader == false ? 'hidden' : ''" class="loader fixed w-full h-full top-0 bg-fp1 z-[9999999] flex justify-center items-center flex-col">
    <div class="relative sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]">
      <span class="absolute w-full h-full rounded-full"></span>
      <span class="absolute w-full h-full rounded-full"></span>
      <i class="absolute w-full h-full rounded-full"></i>
      <strong class="absolute w-full h-full rounded-full border-4 border-x-fp2"></strong>
      <img src="~/assets/images/global/logo.png" alt="" class="rounded-full w-full h-full scale-0" />
    </div>
    <h2 class="text-center font-bold text-2xl lg:text-5xl text-white whitespace-nowrap w-fit p-2 rounded-lg mx-auto mt-10">
      {{ $t("platform") }} {{ $t("site_name") }} {{ $t("educational") }}
    </h2>
  </section>
</template>
<script setup>
let showLoader = ref(true);

onMounted(() => {
  setTimeout(() => {
    showLoader.value = false;
  }, 2500);
});
</script>
<style>
.dark .loader {
  background-color: #111827;
}
.loader {
  animation: hideLoader 3.5s 1 linear both;
}

.loader h2,
.loader div img {
  box-shadow: 4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255);
  animation: loader 1.5s alternate both infinite;
}
.loader div span,
.loader div i {
  box-shadow: 4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255);
}
.loader div strong {
  animation: loader 1s linear infinite both;
}
.loader div span:nth-of-type(1) {
  animation: loader 1s 0.5s alternate both infinite;
}
.loader div span:nth-of-type(2) {
  animation: loader 0.5s 0.6s alternate both infinite;
}
@keyframes loader {
  0% {
    transform: scale(0.1);
  }
  100% {
    transform: scale(0.98);
    opacity: 0.8;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@keyframes hideLoader {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
