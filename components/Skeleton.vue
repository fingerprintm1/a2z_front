<template>
  <div class="">
    <div v-if="type == 'card'" :class="count == 1 ? 'grid-cols-1' : 'rid-cols-1 lg:grid-cols-2 xl:grid-cols-3'" class="grid g gap-10">
      <div v-for="i in count" class="p-4 rounded border border-gray-200 md:p-6">
        <SkeletonLoader class="mb-4 h-48 flex justify-center items-center text-gray-400"> Image </SkeletonLoader>
        <SkeletonLoader class="h-2.5 w-48 mb-4" />
        <SkeletonLoader class="h-2 mb-2.5" />
        <SkeletonLoader class="h-2 mb-2.5" />
        <SkeletonLoader class="h-2" />
        <div class="flex items-center mt-4 space-x-3">
          <SkeletonLoader type="circle" class="w-14 h-14 flex justify-center items-center text-gray-400"> Icon </SkeletonLoader>
          <div>
            <SkeletonLoader class="h-2.5 w-32 mb-2"></SkeletonLoader>
            <SkeletonLoader class="w-48 h-2" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="type == 'image_text'" :class="count == 1 ? 'grid-cols-1' : 'rid-cols-1 lg:grid-cols-2 xl:grid-cols-3'" class="grid g gap-10">
      <div v-for="i in count" class="">
        <SkeletonLoader class="flex justify-center items-center w-full h-48 sm:w-96">
          <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#f3f4f6" viewBox="0 0 640 512">
            <path
              d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
            />
          </svg>
        </SkeletonLoader>
        <div class="w-full mt-10">
          <SkeletonLoader class="h-2.5 w-48 mb-4" />
          <SkeletonLoader class="h-2 max-w-[480px] mb-2.5" />
          <SkeletonLoader class="h-2 mb-2.5" />
          <SkeletonLoader class="h-2 max-w-[440px] mb-2.5" />
          <SkeletonLoader class="h-2 max-w-[460px] mb-2.5" />
          <SkeletonLoader class="h-2 max-w-[360px]" />
        </div>
      </div>
    </div>
    <div v-if="type == 'image'" :class="count == 1 ? 'grid-cols-1' : 'rid-cols-1 lg:grid-cols-2 xl:grid-cols-3'" class="grid g gap-10">
      <div v-for="i in count" class="">
        <SkeletonLoader class="flex justify-center items-center w-full h-64 sm:w-96">
          <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#f3f4f6" viewBox="0 0 640 512">
            <path
              d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
            />
          </svg>
        </SkeletonLoader>
      </div>
    </div>
    <div v-if="type == 'text'" :class="count == 1 ? 'grid-cols-1' : 'rid-cols-1 lg:grid-cols-2 xl:grid-cols-3'" class="grid g gap-10">
      <div v-for="i in count" class="space-y-6">
        <SkeletonLoader class="w-2/12 h-5" />
        <SkeletonLoader class="w-4/12 h-4" />
        <SkeletonLoader class="w-6/12 h-2.5" />
        <SkeletonLoader class="w-8/12 h-4" />
        <SkeletonLoader class="w-10/12 h-2.5" />
        <SkeletonLoader class="w-11/12 h-2" />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});
</script>
