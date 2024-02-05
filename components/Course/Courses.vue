<template>
  <div class="grid grid-cols-1 md:grid-cols-3 h-fit mx-auto">
    <div class="rounded-2xl overflow-hidden sm:pb-20" v-for="course in props.courses" :key="course.id">
      <div class="shadow-xl lg:my-10 rounded-lg md:mx-4 sm:mx-1 bg-white dark:bg-fpDark2 flex flex-col pb-8">
        <nuxt-link :to="localePath(`/course/${course.id}`)">
          <img :src="`${baseURL}/images/${course.photo}`" alt="post image" class="w-full h-[250px] rounded-t-2xl" />
        </nuxt-link>
        <div class="px-6 h-full">
          <nuxt-link :to="localePath(`/course/${course.id}`)" class="text-nd dark:text-fpLightBack text-fp1 font-bold mt-6 block">{{ `${course.name} ` }}</nuxt-link>
          <span class="text-fpDarkGray dark:text-fpLightBack text-sm block mt-1"
            ><Icon class="text-xl text-fp1 me-1" name="ic:outline-person" />{{ $t("number_subscriptions") }} {{ course.subscribers }}</span
          >
          <nuxt-link :to="localePath(`/section/${course.section.id}`)" class="text-fp2 text-sm block mt-1"
            ><Icon class="text-xl text-fp1 me-1" name="system-uicons:panel-sectioned" />{{ $t("section") }}: {{ course.section["name_" + currentLocale] }}</nuxt-link
          >
          <span class="text-fpDarkGray dark:text-fpLightBack text-sm block mt-1">
            <Icon class="text-xl text-fp1 me-1" name="ic:twotone-discount" />{{ $t("discount") }} {{ course.discount }} {{ course.currency.name }}
          </span>

          <div class="flex justify-between items-center mt-2">
            <span class="text-fp1 flex text-xl w-full" v-if="course.price != 0">
              <p class="whitespace-nowrap">{{ course.price }} {{ course.currency.name }}</p>
              <sub class="text-red-600 ms-1 leading-10 whitespace-nowrap line-through">{{ course.sub_price }} {{ course.currency.name }}</sub>
            </span>

            <nuxt-link
              :to="localePath(`/course/${course.id}`)"
              class="text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-sm px-2 py-1.5 focus:outline-none ms-auto block"
            >
              {{ course.price != 0 ? $t("go_course") : $t("free_lecture") }}
              <Icon name="ic:baseline-check-circle-outline" class="text-white text-xl -mt-1" />
            </nuxt-link>
          </div>

          <div class="flex items-center mt-4">
            <img v-if="course.teacher.photo" :src="`${baseURL}/images/${course.teacher.photo}`" class="sm:mb-4 object-cover w-10 h-10 rounded-full inline" alt="teacher photo" />
            <img v-else src="~/assets/images/global/avatar.jpg" class="sm:mb-4 object-cover w-10 h-10 rounded-full inline" alt="teacher photo" />
            <nuxt-link :to="localePath(`/teacher/${course.teacher.id}`)" class="font-medium text-xl text-fp1 ms-2">{{ course.teacher["name_" + currentLocale] }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const props = defineProps({
  courses: {
    type: Object,
    required: true,
  },
});
</script>
