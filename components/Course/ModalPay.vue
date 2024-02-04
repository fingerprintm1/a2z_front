<template>
  <div class="fixed start-0 top-0 w-full h-full z-[110] grid place-content-center">
    <span class="backdrop-blur-[3px] bg-[#00000087] w-full h-full absolute" @click="PayStore.setPayData('show', false)"></span>
    <div class="relative mx-auto bg-white dark:bg-fpDark2 sm:py-4 sm:px-10 md:p-10 rounded-2xl">
      <Icon
        @click="PayStore.setPayData('show', false)"
        name="ic-baseline-close"
        class="absolute top-0 start-0 rtl:translate-x-[30%] ltr:translate-x-[-30%] translate-y-[-50%] bg-[#ef4444e0] transition-all hover:bg-red-600 rounded-full z-[60] text-white text-sm cursor-pointer w-8 h-8 flex justify-center items-center p-1"
      />
      <ul class="flex flex-col text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-fpDark2 dark:text-gray-400 w-full mb-10 whitespace-nowrap">
        <li class="">
          <button
            type="button"
            @click.stop="PayStore.setPayData('type', 'cash')"
            aria-current="page"
            class="flex items-center sm:flex-col p-4 rounded-t-lg dark:bg-fpDark1 dark:text-fp1 w-full h-full px-4"
            :class="`${payData.type == 'cash' ? 'bg-gray-200 active text-fp1' : 'hover:bg-gray-200 hover:text-fp1'}`"
          >
            <img src="~/assets/images/global/credit-card.png" alt="" class="w-8 h-8 inline-block ml-2" />
            <span class="mt-2 text-lg lg:text-md">{{ $t("pay_cash") }}</span>
          </button>
        </li>
        <li class="">
          <button
            type="button"
            @click.stop="PayStore.setPayData('type', 'code')"
            class="p-4 dark:hover:bg-fpDark1 dark:hover:text-gray-300 w-full h-full flex items-center sm:flex-col"
            :class="`${payData.type == 'code' ? 'bg-gray-200 active text-fp1' : 'hover:bg-gray-200 hover:text-main_color_hover_2'}`"
          >
            <img src="~/assets/images/global/qr_code.png" alt="" class="w-10 h-10 inline-block ml-2" />
            <span class="mt-2 text-lg lg:text-md"> الدفع عن طريق الكود</span>
          </button>
        </li>
        <li class="">
          <button
            type="button"
            @click.stop="PayStore.setPayData('type', 'wallet')"
            class="p-4 rounded-b-lg dark:hover:bg-fpDark1 dark:hover:text-gray-300 w-full h-full flex items-center sm:flex-col"
            :class="`${payData.type == 'wallet' ? 'bg-gray-200 active text-fp1' : 'hover:bg-gray-200 hover:text-main_color_hover_2'}`"
          >
            <img src="~/assets/images/global/wallet.png" alt="" class="w-10 h-10 inline-block ml-2" />
            <span class="mt-2 text-lg lg:text-md"> الدفع عن طريق المحفظة</span>
          </button>
        </li>
        <!-- <li class="w-1/2">
            <button
              type="button"
              @click.stop="payData.type = 'online'"
              href="#"
              class="p-4 rounded-tl-lg dark:hover:bg-fpDark1 dark:hover:text-gray-300 w-full flex justify-center items-center sm:flex-col"
              :class="`${payData.type == 'online' ? 'bg-gray-200 active text-fp1' : 'hover:bg-gray-200 hover:text-main_color_hover_2'}`"
            >
              <img src="~/assets/images/global/cash.png" alt="" class="w-10 h-10 inline-block ml-2" />
              <span class="mt-2"> الدفع عن طريق بطاقة الإئتمان</span>
            </button>
          </li> -->
      </ul>
      <div>
        <form class="">
          <!-- <h2 class="text-center text-3xl font-medium">أختر طريقة الدفع المناسبة لك</h2> -->
          <div class="bg-fp1 rounded-lg flex justify-evenly sm:flex-col items-center p-2 mt-4" v-if="payData.type == 'cash'">
            <p class="me-2 text-lg lg:text-xl text-white font-bold">{{ $t("pay_cash") }}:</p>
            <p class="text-2xl text-white font-bold -mb-1">{{ globalStore.appSettings.vodafone_cash }}</p>
          </div>
          <div class="bg-fp1 rounded-lg flex justify-evenly sm:flex-col items-center p-2 mt-4" v-if="payData.type == 'cash'">
            <p class="me-2 text-lg lg:text-xl text-white font-bold">{{ $t("pay_instapay") }}:</p>
            <p class="text-2xl text-white font-bold -mb-1">{{ globalStore.appSettings.instapay }}</p>
          </div>
          <div class="my-6 w-full mx-auto" v-show="payData.type == 'code' && payData.type != 'wallet'">
            <label for="code" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("code") }}</label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 end-0 flex items-center pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                <Icon name="ic:outline-card-giftcard" class="text-start text-2xl" />
              </div>
              <input
                type="text"
                id="code"
                class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                :placeholder="$t('code')"
                @input="e => PayStore.setPayData('code', e.target.value)"
                :class="errors.has('code') ? 'is-invalid' : ''"
                required
              />
            </div>
            <p v-if="errors.has('code')" class="mt-2 text-sm text-red-500">{{ errors.get("code") }}</p>
          </div>

          <p v-if="payData.type === 'wallet'" class="mt-2 text-4xl text-green-500">
            الرصيد : <span class="font-bold">{{ auth.user.balance }}</span>
          </p>
          <!-- <img src="~/assets/images/global/info_cash.jpg" alt="" /> -->
          <label
            v-show="payData.type == 'cash'"
            for="imagePay"
            class="leading-7 text-sm text-gray-600 dark:text-fpLightBack flex justify-center items-center cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-fp1 dark:hover:bg-fp2 p-2 mt-8"
          >
            <input type="file" hidden id="imagePay" @change="e => PayStore.setPayData('photo', e.target)" accept="image/*" />
            <span v-if="payData.spinnerPhoto" class="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full my-rotate ml-2"></span>
            <Icon name="ic-twotone-cloud-upload" class="text-4xl text-blue-500 ml-4" />
            <span class="text-xl md:text-2xl whitespace-nowrap">{{ payData.spinnerPhoto ? $t("process_reset") : $t("click_upload_reset") }}</span></label
          >
          <button
            type="button"
            @click.prevent="PayStore.sendDataPay()"
            class="w-full whitespace-nowrap transition font-bold rounded-lg text-lg px-2 py-3 focus:outline-none mt-4 block text-center bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t text-white"
          >
            <span>{{ $t("subscription") }}</span>
            <Icon name="ic:baseline-check-circle-outline" class="text-xl -mt-1" />
          </button>
        </form>
        <div v-if="payData.type == 'online'" class="flex justify-between items-center">
          <ul class="flex items-center">
            <li>
              <img src="~/assets/images/global/mada.png" alt="" class="w-20" />
            </li>
            <li class="mx-3">
              <img src="~/assets/images/global/visa.png" alt="" class="w-20" />
            </li>
            <li>
              <img src="~/assets/images/global/mastercard.png" alt="" class="w-20" />
            </li>
          </ul>
          <button
            id="pay-online"
            class="items-center flex sm:text-md md:text-2xl font-normal hover:border-fp1 border-2 border-white rounded-md py-3 px-4 hover:text-fp1 cursor-pointer bg-fp1 text-white transition hover:bg-transparent whitespace-nowrap"
          >
            <span class="hidden w-6 h-6 border-2 border-white border-t-transparent rounded-full my-rotate ml-2"></span> {{ $t("pay_now") }}
            <Icon name="ic-baseline-payment" class="text-2xl md:text-4xl mr-2" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
import {useAuthStore} from "@/store/AuthStore";
import {usePayStore} from "@/store/PayStore";
const PayStore = usePayStore();
const globalStore = useGlobalStore();
const payData = PayStore.getPayData;
const auth = useAuthStore();
const errors = reactive(useErrors());
</script>
