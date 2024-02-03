<template>
  <section :class="classes" class="grid place-content-center">
    <div class="container py-3 mx-auto">
      <div class="bread-crumbs flex justify-center items-center relative z-50">
        <nuxt-link to="/">
          <Icon name="bx:home" class="text-inherit lg:text-5xl" />
        </nuxt-link>
        <div class="flex items-center justify-center" v-for="(text, i) in props.contents" :key="i">
          <Icon
            class="text-inherit lg:text-4xl mx-1 md:mx-4"
            :name="currentLocale == 'ar' ? 'ic:baseline-keyboard-double-arrow-left' : 'ic:baseline-keyboard-double-arrow-right'"
          />
          <a class="text-inherit lg:text-3xl font-medium md:font-semibold"> {{ text }} </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const props = defineProps({
  contents: {
    type: Array,
    // required: true,
  },
  classes: {
    type: String,
    default: "",
  },
});
await useAsyncData("items", async () => {
  return props.contents;
});

const {currentLocale} = useLang();
</script>
