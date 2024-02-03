<template>
  <section>
    <div class="container mx-auto mt-10 lg:px-10">
      <div class="bg-fp2/10 dark:bg-fpDark1 rounded-xl p-6">
        <form @submit.prevent="onSubmitUpdate" method="post" action @keydown="errors.clear($event.target.name)">
          <h1 class="text-center text-2xl lg:text-4xl dark:text-fp2 mb-10">{{ $t("edit_account") }}</h1>
          <div class="flex flex-wrap -m-2">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 sm:w-full md:w-1/2">
                <label for="name_ar" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("name_ar") }}</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                    <Icon name="ic:baseline-account-box" class="text-start text-2xl" />
                  </div>
                  <input
                    type="text"
                    id="name_ar"
                    class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                    :placeholder="$t('name_ar')"
                    v-model="updateValue.name_ar"
                    :class="errors.has('name_ar') ? 'is-invalid' : ''"
                    required
                  />
                  <p v-if="errors.has('name_ar')" class="mt-2 text-sm text-red-500">{{ errors.get("name_ar") }}</p>
                </div>
              </div>
              <div class="p-2 sm:w-full md:w-1/2">
                <label for="name_en" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("name_en") }}</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                    <Icon name="ic:baseline-account-box" class="text-start text-2xl" />
                  </div>
                  <input
                    type="text"
                    id="name_en"
                    class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                    :placeholder="$t('name_en')"
                    v-model="updateValue.name_en"
                    :class="errors.has('name_en') ? 'is-invalid' : ''"
                    required
                  />
                  <p v-if="errors.has('name_en')" class="mt-2 text-sm text-red-500">{{ errors.get("name_en") }}</p>
                </div>
              </div>
              <div class="p-2 sm:w-full md:w-1/2">
                <label for="phone" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("phone_user") }}</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                    <Icon name="ic:baseline-phone" class="text-start text-2xl" />
                  </div>
                  <input
                    id="phone"
                    type="text"
                    class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                    placeholder="201090844348"
                    v-model="updateValue.phone"
                    :class="errors.has('phone') ? 'is-invalid' : ''"
                    required
                  />
                  <p v-if="errors.has('phone')" class="mt-2 text-sm text-red-500">{{ errors.get("phone") }}</p>
                </div>
              </div>
              <div class="p-2 sm:w-full md:w-1/2">
                <label for="birth" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("birth_user") }}</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                    <Icon name="iconoir:birthday-cake" class="text-start text-2xl" />
                  </div>
                  <input
                    id="birth"
                    type="date"
                    class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 pe-16 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                    placeholder="201090844348"
                    v-model="updateValue.birth"
                    :class="errors.has('birth') ? 'is-invalid' : ''"
                    required
                  />
                  <p v-if="errors.has('birth')" class="mt-2 text-sm text-red-500">{{ errors.get("birth") }}</p>
                </div>
              </div>
              <div class="p-2 sm:w-full md:w-1/2">
                <label for="success" class="block mb-2 text-sm lg:text-md font-medium text-fpDark2 dark:text-gray-300">{{ $t("email_user") }}</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-slate-200 dark:bg-fp1 dark:text-white px-2 rounded-e-lg">
                    <!-- <p v-text="updateValue.email" class="text-fp2 font-bold me-2 -mb-1"></p> -->
                    <Icon name="ic:baseline-mail-outline" class="text-start text-2xl" />
                  </div>
                  <!-- @input="e => inputEmail(startValueEmail)" -->
                  <input
                    type="email"
                    class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                    placeholder="yourname"
                    v-model="updateValue.email"
                    :class="errors.has('email') ? 'is-invalid' : ''"
                    required
                  />
                  <p v-if="errors.has('email')" class="mt-2 text-sm text-red-500">{{ errors.get("email") }}</p>
                </div>
              </div>

              <div class="p-2 sm:w-full md:w-1/2">
                <div class="relative">
                  <label for="oldPassword" class="leading-7 text-sm text-gray-600 dark:text-fpLightBack">{{ $t("old_password") }}</label>
                  <div class="relative">
                    <button
                      :class="errors.has('password') ? 'is-invalid' : ''"
                      type="button"
                      @click="togglePassword = !togglePassword"
                      class="bg-fp1 absolute end-0 top-0 cursor-pointer w-10 h-full rounded-e-lg"
                    >
                      <Icon :name="togglePassword ? 'ph-eye-slash-fill' : 'ph-eye'" class="text-xl text-white" />
                    </button>
                    <input
                      id="oldPassword"
                      name="old_password"
                      :placeholder="t('old_password')"
                      class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                      v-model="updateValue.old_password"
                      :type="togglePassword ? 'text' : 'password'"
                      :class="errors.has('password') ? 'is-invalid' : ''"
                    />
                  </div>
                  <p v-if="errors.has('password')" class="mt-2 text-sm text-red-500">{{ errors.get("password") }}</p>
                </div>
              </div>
              <div class="p-2 sm:w-full md:w-1/2">
                <label for="password" class="leading-7 text-sm text-gray-600 dark:text-fpLightBack">{{ $t("new_password") }}</label>
                <div class="relative">
                  <button
                    :class="errors.has('password') ? 'is-invalid' : ''"
                    type="button"
                    @click="togglePassword = !togglePassword"
                    class="bg-slate-200 dark:bg-fp1 dark:text-white absolute end-0 top-0 cursor-pointer w-10 h-full rounded-e-lg"
                  >
                    <Icon :name="togglePassword ? 'ph-eye-slash-fill' : 'ph-eye'" class="text-xl" />
                  </button>
                  <input
                    :type="togglePassword ? 'text' : 'password'"
                    class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                    placeholder="********"
                    v-model="updateValue.password"
                    :class="errors.has('password') ? 'is-invalid' : ''"
                  />
                  <p v-if="errors.has('password')" class="mt-2 text-sm text-red-500">{{ errors.get("password") }}</p>
                </div>
              </div>
              <div class="p-2 sm:w-full md:w-1/2">
                <label for="cpassword" class="leading-7 text-sm text-gray-600 dark:text-fpLightBack">{{ $t("confirm_password") }}</label>
                <div class="relative">
                  <button
                    :class="errors.has('password') ? 'is-invalid' : ''"
                    type="button"
                    @click="togglePassword = !togglePassword"
                    class="bg-slate-200 dark:bg-fp1 dark:text-white absolute end-0 top-0 cursor-pointer w-10 h-full rounded-e-lg"
                  >
                    <Icon :name="togglePassword ? 'ph-eye-slash-fill' : 'ph-eye'" class="text-xl" />
                  </button>
                  <input
                    :type="togglePassword ? 'text' : 'password'"
                    class="bg-gray-50 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 dark:bg-fpDark2 dark:text-gray-300 outline outline-1 outline-gray-200 dark:outline-none dark:focus:border-gray-500 focus:border"
                    placeholder="********"
                    v-model="updateValue.password_confirmation"
                    :class="errors.has('password') ? 'is-invalid' : ''"
                  />
                  <p v-if="errors.has('password')" class="mt-2 text-sm text-red-500">{{ errors.get("password") }}</p>
                </div>
              </div>
            </div>
            <div class="lg:p-2 w-full mt-10 flex justify-between">
              <button
                type="submit"
                class="transition bg-fp1 hover:bg-fp2 bg-flBlue hover:bg-flBlue2 text-white border-0 py-2 sm:px-2 md:px-8 focus:outline-none rounded text-lg font-medium block"
              >
                <Icon name="dashicons-update2" class="md:ml-4 text-2xl" /> {{ $t("update_account") }}
              </button>
              <button
                type="button"
                @click="StudentStore.setValueStudentMenu('profile')"
                class="transition bg-fp1 hover:bg-fp2 bg-flBlue hover:bg-flBlue2 text-white border-0 py-2 sm:px-2 md:px-8 focus:outline-none rounded text-lg font-medium block cursor-pointer"
              >
                <Icon name="ri:user-3-fill" class="md:ml-4" /> {{ $t("profile") }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useAuthStore} from "@/store/AuthStore";
import {useTostStore} from "@/store/TostStore";
import {useStudentStore} from "@/store/StudentStore";
const StudentStore = useStudentStore();
const apiUrl = useRuntimeConfig().public.apiURL + "/auth";
const auth = useAuthStore();
const errors = reactive(useErrors());
const {currentLocale, dir} = useLang();
const {t} = useI18n();
let togglePassword = ref(false);
let startValueEmail = ref(auth.user.email.slice(0, auth.user.email.indexOf("@")));
const tost = useTostStore();
let updateValue = reactive({
  name_ar: auth.user.name_ar,
  name_en: auth.user.name_en,
  phone: auth.user.phone,
  birth: auth.user.birth,
  email: auth.user.email,
  old_password: "",
  password: "",
  password_confirmation: "",
});

const onSubmitUpdate = async () => {
  if (updateValue.old_password == "" || updateValue.password == "" || updateValue.password_confirmation == "") {
    delete updateValue.old_password;
    delete updateValue.password;
    delete updateValue.password_confirmation;
  }
  try {
    await useAsyncData("update", () =>
      $fetch(`${apiUrl}/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: {locale: currentLocale.value, ...updateValue},
      }).then(res => {
        if (res.status) {
          auth.setUser(res.user);
          tost.add({
            type: "success",
            message:
              currentLocale.value == "ar" ? `تم تعديل المستخدم ${res.user["name_" + currentLocale.value]}` : `success update user ${res.user["name_" + currentLocale.value]}`,
          });
        } else {
          if (res.errCode == 422) {
            let ob = {};
            for (const [key, value] of Object.entries(res.message)) {
              ob[key] = value[0];
              /* tost.add({
                type: "error",
                message: value[0],
              }); */
            }
            errors.record(ob);
          }
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
};
</script>
