<template>
  <section>
    <div class="container mx-auto md:flex gap-10 object-cover">
      <div class="md:w-full">
        <div class="bg-gray-50 shadow-lg overflow-hidden dark:bg-fpDark1 lg:px-10 pt-10 pb-5 rounded-lg custom-underline">
          <div class="">
            <div class="w-60 h-60 rounded-full bg-gray-200 overflow-hidden shadow-xl outline outline-4 outline-offset-2 outline-gray-200 mx-auto">
              <img
                v-if="props.user.photo"
                :src="props.user.oauth_type == null ? `${baseURL}/attachments/${props.user.photo}` : `${props.user.photo}`"
                alt=""
                class="w-full h-full object-cover"
              />
              <img
                v-else
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUS8TjFE3RRsUZV9JietSrxIY8xke14UuulctZGjudNedC9oVgaJhQK9AE2nM8IXSXvls&usqp=CAU"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <h1 class="text-center font-bold text-3xl lg:text-4xl text-fp1 mt-4">{{ user["name_" + currentLocale] }}</h1>
          </div>

          <hr class="-mr-10 my-4 w-[112%] bg-fp1 h-1" />
          <div class="flex items-center justify-between mt-10">
            <span class="text-xl lg:text-2xl dark:text-fpLightBack">{{ $t("name_user") }} :</span>
            <p class="text-md text-gray-600 dark:text-gray-300" v-text="user['name_' + currentLocale]"></p>
          </div>
          <hr class="-mr-10 mt-2 w-[109%]" />
          <div class="flex items-center justify-between mt-10">
            <span class="text-md lg:text-2xl dark:text-fpLightBack">{{ $t("email_user") }} :</span>
            <p class="text-lg text-gray-600 dark:text-gray-300" v-text="props.user.email"></p>
          </div>
          <hr class="-mr-10 mt-2 w-[109%]" />
          <div class="flex items-center justify-between mt-10">
            <span class="text-md lg:text-2xl dark:text-fpLightBack">{{ $t("status") }}:</span>
            <p class="text-lg text-gray-600 dark:text-gray-300">Approved</p>
          </div>
          <hr class="-mr-10 mt-2 w-[109%]" />
          <div class="flex items-center justify-between mt-10">
            <span class="text-md lg:text-2xl dark:text-fpLightBack">{{ $t("phone_user") }}:</span>
            <p class="text-lg text-gray-600 dark:text-gray-300" v-text="props.user.phone"></p>
          </div>
          <hr class="-mr-10 mt-2 w-[109%]" />
          <div class="flex items-center justify-between mt-10">
            <span class="text-md lg:text-2xl dark:text-fpLightBack">{{ $t("join_date") }}:</span>
            <p class="text-lg text-gray-600 dark:text-gray-300">{{ getDate(props.user.created_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const baseURL = useRuntimeConfig().public.baseURL;
const {currentLocale} = useLang();

function getDate(date) {
  var $created_at = new Date(date);
  let year = $created_at.getFullYear();
  let month = $created_at.getMonth() < 10 ? `0${$created_at.getMonth()}` : $created_at.getMonth();
  let dey = $created_at.getDay() < 10 ? `0${$created_at.getDay()}` : $created_at.getDay();

  return `${dey}-${month}-${year}`;
}
const props = defineProps({
  user: {
    type: Object,
    // required: true,
  },
});
</script>
