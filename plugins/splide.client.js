import VueSplide from "@splidejs/vue-splide";
import {Splide, SplideSlide} from "@splidejs/vue-splide";

// Default theme
import "@splidejs/vue-splide/css";

// theme & core styles
import "@splidejs/vue-splide/css/skyblue";
import "@splidejs/vue-splide/css/core";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueSplide, {});
  nuxtApp.vueApp.use(Splide, {});
  nuxtApp.vueApp.use(SplideSlide, {});
  // nuxtApp.vueApp.use(SplideTrack, {});
});
