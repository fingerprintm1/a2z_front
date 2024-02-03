<template>
  <div class="lg:ml-auto h-fit bg-gray-50 dark:bg-fpDark2 shadow-lg p-6">
    <h4 class="text-center text-2xl font-bold dark:text-white">{{ $t("sorry") }}</h4>
    <p class="text-center text-yellow-500 font-bold text-3xl mt-4" v-text="props.message"></p>
  </div>
</template>
<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>
