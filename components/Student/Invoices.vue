<template>
  <div>
    <section class="container mx-auto pt-10 bg-white dark:bg-fpDark1 relative">
      <div>
        <h2 class="font-bold text-p-dark text-2xl lg:text-5xl mb-3 text-center lg:text-start dark:text-fp1">
          {{ $t("all_inovoices") }}
        </h2>

        <div v-if="invoices.length > 0" class="relative overflow-x-auto shadow-md sm:rounded-lg lg:mt-20">
          <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead class="text-white uppercase bg-fp1 dark:bg-fpDark2 dark:text-gray-400">
              <tr class="text-2xl">
                <th scope="col" class="px-6 py-3">{{ $t("number") }}</th>
                <th scope="col" class="px-6 py-3">{{ $t("course") }}/{{ $t("offer") }}/{{ $t("lecture") }}</th>
                <th scope="col" class="px-6 py-3">{{ $t("currency") }}</th>
                <th scope="col" class="px-6 py-3">{{ $t("price") }}</th>
                <th scope="col" class="px-6 py-3">{{ $t("code") }}</th>
                <th scope="col" class="px-6 py-3">{{ $t("status") }}</th>
                <th scope="col" class="px-6 py-3">{{ $t("photo_invoice") }}</th>
                <th scope="col" class="px-6 py-3">{{ $t("invoice_created_at") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="invoice in invoices"
                :key="invoice.id"
                class="text-xl whitespace-nowrap bg-white text-gray-600 border-b dark:bg-fpDark1 dark:border-fpDark2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td class="px-6 py-4" v-text="invoice.id"></td>
                <td class="px-6 py-4">
                  <nuxt-link
                    :to="localePath(`/${invoice.data_type}/${invoice[invoice.data_type].id}`)"
                    v-if="invoice.data_type == 'course' || invoice.data_type == 'offer'"
                    class="mx-auto bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-md px-2 py-1.5 focus:outline-none block text-white"
                  >
                    {{ invoice.data_type == "course" ? `${invoice.course.name} ${invoice.course.subject["name_" + currentLocale]}` : invoice.offer["name_" + currentLocale] }}
                  </nuxt-link>
                  <nuxt-link
                    :to="localePath(`/course/${invoice.lecture.course_id}`)"
                    v-else
                    class="mx-auto bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-md px-2 py-1.5 focus:outline-none block text-white"
                  >
                    {{ invoice.lecture.title }}
                  </nuxt-link>
                </td>
                <td class="px-6 py-4">
                  <span class="bg-[#9bffbfe6] block rounded-md font-bold mx-auto">{{ invoice.currency.name }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="bg-[#9bffbfe6] block rounded-md font-bold mx-auto">{{ invoice.price }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="bg-[#9bffbfe6] block rounded-md font-bold mx-auto">{{ invoice.code == "null" || invoice.code == null ? "--" : invoice.code }}</span>
                </td>
                <td class="px-6 py-4">
                  <span :class="invoice.status == 1 ? 'bg-[#9bffbfe6]' : 'bg-[#ff9b9be6]'" class="block rounded-md font-bold mx-auto">{{ invoice.status }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="block rounded-md font-bold mx-auto">
                    <button @click="globalStore.HashURLFile(`${invoice.photo != null ? `${baseURL}/images/${invoice.photo}` : ``}`)" target="_blank">
                      <img v-if="invoice.photo" :src="`${baseURL}/images/${invoice.photo}`" class="sm:mb-4 object-cover w-14 h-14 rounded-full inline" alt="user photo" />
                      <img v-else src="~/assets/images/global/avatar.jpg" class="sm:mb-4 object-cover w-14 h-14 rounded-full inline" alt="user photo" />
                    </button>
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="bg-[#9bffbfe6] block rounded-md font-bold mx-auto">{{
                    new Date(invoice.created_at)
                      .toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                      .split(" ")
                      .join("/")
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Empty v-else :message="$t('not_inovoices')" />
      </div>
    </section>
  </div>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const props = defineProps({
  invoices: {
    type: Array,
    // required: true,
  },
});
</script>
