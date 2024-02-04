<template>
  <ClientOnly>
    <div>
      <div class="parent_reviews">
        <h2 class="font-bold text-fp2 text-xl lg:text-4xl">{{ $t("students_said_about_us") }}</h2>
      </div>
      <Splide :options="options" class="container px-0 mx-auto review">
        <SplideSlide class="splide__slide py-10" v-for="review in props.reviews" :key="review.id">
          <div class="shadow-md py-8 rounded-lg md:mx-4 sm:mx-1 dark:bg-fpDark2 flex flex-col h-full">
            <div class="p-3 lg:p-10 pt-10 lg:pt-20 rounded-md relative">
              <Icon class="text-8xl text-fp2 me-1 absolute end-0 -top-12 w-10 lg:w-14" name="ic:baseline-star-purple500" />
              <p
                class="whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal transition-all text-justify border-r-2 border_r show_border_r relative font-medium text-md lg:text-2xl dark:text-fpLightGray border-fp1 ps-4"
                v-html="review.comment"
              ></p>
              <div class="flex mt-10 ps-5 lg:ps-10">
                <img
                  v-if="review.user.photo"
                  :src="review.user.oauth_type == null ? `${baseURL}/images/${review.user.photo}` : `${review.user.photo}`"
                  class="w-14 h-14 lg:w-20 lg:h-20 rounded-full"
                  alt=""
                />
                <img v-else src="~/assets/images/global/avatar.jpg" alt="user photo" class="w-20 h-20 rounded-full block object-cover" />
                <div class="ms-2">
                  <p class="text-fp1 font-bold text-lg lg:text-2xl block" v-text="review.user['name_' + currentLocale]"></p>
                  <nuxt-link :to="localePath(`/section/${review.section.id}`)" class="text-fp1 font-bold text-lg lg:text-2xl block">
                    <span class="text-fpDark3">{{ $t("section") }}: </span>
                    {{ review.section.id == 1 ? $t("general") : review.section["name_" + currentLocale] }}</nuxt-link
                  >
                  <!-- <span class="text-fp1 font-medium lg:text-xl" v-text="review.user.created_at"></span> -->
                  <div class="mt-1 flex">
                    <Icon v-for="i in 5" class="text-3xl text-fp2" name="ic:baseline-star-purple500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </ClientOnly>
</template>
<script setup>
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const props = defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});

const options = {
  direction: dir.value,
  paginationDirection: dir.value,
  pagination: true,
  type: "loop",
  interval: 4000,
  autoplay: true,
  perPage: 2,
  breakpoints: {
    1024: {
      arrows: false,
      perPage: 1,
    },
  },
};
</script>
<style>
.reviews .splide__arrows {
  display: flex;
  justify-content: flex-end;
  margin-top: -65px;
  gap: 14px;
}
.reviews .splide__arrow:hover {
  background-color: #3939ff;
}
.reviews .splide__arrow {
  border-color: #3939ff;
  @apply rounded-full border-2 border-solid  flex items-center justify-center w-14 h-14;
}
.reviews .splide__arrow:hover svg {
  fill: white !important;
}
.reviews .splide__arrow splide__arrow--next {
  transform: rotate(180deg);
  margin-top: -26px;
}
.reviews .splide__arrow svg {
  fill: #3939ff;
  font-size: 12px;
}
</style>
