<template>
  <section>
    <div class="container mx-auto lg:mt-10 lg:px-10">
      <div class="lg:w-full">
        <div v-if="props.courses.length" class="shadow-lg border-t-2 border-fp2 py-4 rounded-lg space-y-4 mt-10" v-for="course in props.courses">
          <h1 class="text-center text-3xl font-bold text-fp1">{{ `${course.name} ` }}</h1>
          <button
            v-for="file in course.attachments"
            @click="globalStore.HashURLFile(`${baseURL}/images/${file.file}`, file.name)"
            class="flex justify-between items-center hover:bg-gray-200 p-4 cursor-pointer w-full"
            :key="file.id"
          >
            <div class="flex items-center text-fp2">
              <Icon class="text-3xl me-2" name="ic:baseline-insert-drive-file" />
              <p>{{ file.name }}</p>
            </div>
            <div class="flex items-center text-fp2 hover:text-fp2/80">
              <Icon class="text-3xl me-2" name="mdi:printer-check" />
              <p>{{ $t("download_file") }}</p>
            </div>
          </button>
          <Empty v-if="course.attachments.length == 0" :message="$t('not_files_courses')" />
        </div>
        <Empty v-else :message="$t('not_subscibed_courses')" />
      </div>
    </div>
  </section>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const props = defineProps({
  courses: {
    type: Object,
    // required: true,
  },
});
</script>
