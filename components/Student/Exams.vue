<template>
  <div>
    <!-- #2F3349 -->

    <!-- Breadcrumb -->
    <nav
      class="flex justify-center items-center px-5 py-3 text-fpDark2 sm:rounded-none border border-gray-200 rounded-b-lg sticky top-0 bg-gray-50 dark:bg-fpDark2 dark:border-fpDark3"
      aria-label="Breadcrumb"
    >
      <ol class="inline-flex items-center sm:flex-wrap space-x-1 md:space-x-3 text-xl lg:text-2xl">
        <li class="inline-flex items-center">
          <nuxt-link :to="localePath('/')" class="inline-flex leading-10 items-center font-medium text-fpDark2 hover:text-fp1 dark:text-gray-400 dark:hover:text-white">
            <Icon name="ic:sharp-house" class="text-4xl" />
            <!-- <Icon name="ic:baseline-chevron-left" class="text-xl" /> -->
            <span class="mt-2">{{ $t("home") }}</span>
          </nuxt-link>
        </li>
        <li class="inline-flex items-center" v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <button
            @click="section = `${breadcrumb.section}`"
            class="inline-flex leading-10 items-center font-medium text-fpDark2 hover:text-fp1 dark:text-gray-400 dark:hover:text-white"
          >
            <Icon name="ic:baseline-chevron-left" class="text-4xl" />
            <span class="mt-2">{{ breadcrumb.text }}</span>
          </button>
        </li>
      </ol>
    </nav>

    <section class="container mx-auto pt-10 bg-white dark:bg-fpDark1 relative">
      <TransitionGroup name="taps-down">
        <div v-if="section == 'courses'">
          <h2 class="font-bold text-p-dark text-4xl lg:text-5xl mb-3 text-center lg:text-start dark:text-fp1">{{ $t("my_all_exams") }}</h2>
          <div v-if="Object.keys(props.courses).length" class="lg:w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-center mt-10 lg:mt-16 h-fit">
            <div class="shadow-xl rounded-xl p-6 dark:bg-fpDark3" v-for="course in props.courses" :key="course.id">
              <button @click="getUserExams(course.id)">
                <svg width="100" height="134" class="mx-auto block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V7C21 7.55228 20.5523 8 20 8C19.4477 8 19 7.55228 19 7V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H11C11.5523 21 12 21.4477 12 22C12 22.5523 11.5523 23 11 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM18.25 20.75C18.25 21.4404 17.6904 22 17 22C16.3096 22 15.75 21.4404 15.75 20.75C15.75 20.0596 16.3096 19.5 17 19.5C17.6904 19.5 18.25 20.0596 18.25 20.75ZM15.1353 12.9643C15.3999 12.4596 16.0831 12 17 12C18.283 12 19 12.8345 19 13.5C19 14.1655 18.283 15 17 15C16.4477 15 16 15.4477 16 16V17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17V16.8866C19.6316 16.5135 21 15.2471 21 13.5C21 11.404 19.0307 10 17 10C15.4566 10 14.0252 10.7745 13.364 12.0357C13.1075 12.5248 13.2962 13.1292 13.7853 13.3857C14.2744 13.6421 14.8788 13.4535 15.1353 12.9643Z"
                    class="fill-fp1"
                  />
                </svg>
              </button>
              <p class="text-xl dark:text-fpLightBack">{{ $t("course_exams") }}</p>
              <h2 class="text-fp1 text-2xl font-medium mt-2 mb-4">{{ `${course.name} ` }}</h2>
              <button
                @click="getUserExams(course.id)"
                class="text-white whitespace-nowrap bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-xl px-2 py-2 focus:outline-none"
              >
                {{ $t("course_exams") }}
                <Icon name="ci:help-questionmark" class="text-white text-2xl -mt-1" />
              </button>
            </div>
          </div>
          <Empty v-else :message="$t('not_subscibed_courses')" />
        </div>
        <div v-if="section == 'exams'">
          <h2 class="font-bold text-p-dark text-2xl lg:text-5xl mb-3 text-center lg:text-start dark:text-fp1">
            {{ $t("all_course_exams") }} {{ courseExam["name_" + currentLocale] }}
          </h2>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg lg:mt-20">
            <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
              <thead class="text-white uppercase bg-fp1 dark:bg-fpDark2 dark:text-gray-400">
                <tr class="text-2xl">
                  <th scope="col" class="px-6 py-3">{{ $t("number") }}</th>
                  <th scope="col" class="px-6 py-3">{{ $t("score") }}</th>
                  <th scope="col" class="px-6 py-3">{{ $t("correct") }}</th>
                  <th scope="col" class="px-6 py-3">{{ $t("mistake") }}</th>
                  <th scope="col" class="px-6 py-3">{{ $t("result") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="detailExam in detailExams"
                  :key="detailExam.id"
                  class="text-xl whitespace-nowrap cursor-pointer bg-white text-gray-600 border-b dark:bg-fpDark1 dark:border-fpDark2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="userShowAnswers(detailExam.course_id, detailExam.id)"
                >
                  <td class="px-6 py-4">
                    <button
                      @click="userShowAnswers(detailExam.course_id, detailExam.id)"
                      class="lg:w-1/2 mx-auto bg-gradient-to-b from-fp1 to-fp1/70 hover:bg-gradient-to-t transition font-bold rounded-lg text-md px-2 py-1.5 focus:outline-none block text-white"
                    >
                      {{ detailExam.id }}
                      <Icon name="ic:baseline-remove-red-eye" class="text-white text-2xl -mt-0.5" />
                    </button>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="detailExam.score >= score ? 'bg-[#9bffbfe6]' : 'bg-[#ff9b9be6]'" class="lg:w-1/2 block rounded-md font-bold mx-auto">{{ detailExam.score }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-[#9bffbfe6] lg:w-1/2 block rounded-md font-bold mx-auto">{{ detailExam.correct }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-[#ff9b9be6] lg:w-1/2 block rounded-md font-bold mx-auto">{{ detailExam.mistake }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-[#9bffbfe6] lg:w-1/2 block rounded-md font-bold mx-auto">{{ detailExam.score >= score ? "إجتاز اﻹمتحان" : "لم يجتاز اﻹمتحان" }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="section == 'answers'">
          <h2 class="font-bold text-p-dark text-2xl lg:text-5xl mb-3 text-center lg:text-start dark:text-fp1">
            {{ $t("qutions") }} {{ `${course.name} ` }} {{ $t("number") }} => {{ examID }}
          </h2>
          <div v-for="(question, index) in questions" :key="question.id" class="lg:w-2/3 mx-auto shadow-xl p-6 h-auto">
            <p class="text-xl lg:text-2xl text-fp1 font-semibold text-center w-5/6 mx-auto mt-6" v-html="question['question_' + currentLocale]"></p>
            <p class="text-xl lg:text-2xl text-fp2 font-semibold text-start w-5/6 mx-auto mt-6" v-text="`${$t('note')}${question.Justify}`"></p>
            <div class="mt-10" v-for="(answer, indexAnswer) in question.answers" :key="answer.id">
              <button
                :class="[
                  (answersIDS.includes(answer.id) && answer.status == 1) || answer.status == 1
                    ? ' border-green-400 after:border-green-400 before:bg-green-400 text-green-400'
                    : 'after:border-gray-300 before:bg-gray-300 dark:text-fpLightBack',
                  answersIDS.includes(answer.id) && answer.status == 0 ? 'border-red-400 after:border-red-400 before:bg-red-400 text-red-400' : 'dark:text-fpLightBack',
                ]"
                class="block w-full text-start border-2 rounded-lg lg:rounded-full transition-all py-2 lg:py-4 ps-16 lg:ps-20 relative after:absolute after:start-5 lg:after:start-8 after:top-1/2 after:-translate-y-1/2 after:w-8 after:h-8 after:border-2 after:rounded-full after:border-dashed before:absolute before:start-7 lg:before:start-10 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full"
              >
                <span class="text-md lg:text-xl" v-text="answer.answer"></span>
              </button>
              <!-- {{ indexAnswer }} -->
              <!-- <div>
                <div v-if="activeAnswers[question.id] == answer.id && done == true && answer.status == 1">
                  <button class="flex items-center text-green-400 mt-10">
                    <span class="ms-3 -mb-1 text-2xl">
                      <svg width="42" height="42" class="inline" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M21.0232 22.2207L34.7128 8.53109C35.1441 8.09984 35.7441 7.879 36.3524 7.929C36.9607 7.97692 37.517 8.28942 37.8753 8.78525C37.8753 8.78525 37.9274 8.86025 37.9316 8.86442C40.3857 12.2832 41.8337 16.4728 41.8337 20.9998C41.8337 32.4978 32.4982 41.8332 21.0003 41.8332C9.50241 41.8332 0.166992 32.4978 0.166992 20.9998C0.166992 9.50192 9.50241 0.166504 21.0003 0.166504C24.3253 0.166504 27.4712 0.947754 30.2607 2.33734C31.292 2.84775 31.7107 4.09984 31.1982 5.129C30.6857 6.15817 29.4357 6.579 28.4066 6.0665C26.1753 4.95609 23.6587 4.33317 21.0003 4.33317C11.8024 4.33317 4.33366 11.8019 4.33366 20.9998C4.33366 30.1978 11.8024 37.6665 21.0003 37.6665C30.1982 37.6665 37.667 30.1978 37.667 20.9998C37.667 18.2373 36.9941 15.629 35.8003 13.3353L22.4982 26.6394C21.6837 27.454 20.3649 27.454 19.5503 26.6394L13.3003 20.3894C12.4878 19.5769 12.4878 18.2561 13.3003 17.4436C14.1149 16.6311 15.4337 16.6311 16.2482 17.4436L21.0232 22.2207Z"
                          fill="#3FDB77"
                        />
                      </svg>
                      رائع! أجابتك صحيحة :
                    </span>
                    <p class="text-md lg:text-2xl text-green-400 ms-2" v-text="answer.answer"></p>
                  </button>
                </div>
                <div v-if="activeAnswers[question.id] != answer.id && done == true && answer.status == 1">
                  <button class="flex items-center text-red-500 mt-10">
                    <span class="ms-3 -mb-1 text-2xl text-red-500">
                      <svg width="42" height="42" viewBox="0 0 42 42" class="inline" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.5064 14.4088C16.2082 14.4092 15.9169 14.4984 15.6697 14.665C15.4224 14.8316 15.2305 15.0681 15.1183 15.3443C15.0061 15.6206 14.9787 15.9239 15.0398 16.2157C15.1008 16.5076 15.2474 16.7746 15.4609 16.9828L19.4749 20.9968L15.4609 25.0108C15.3176 25.1492 15.2033 25.3147 15.1247 25.4977C15.0461 25.6807 15.0047 25.8775 15.003 26.0767C15.0013 26.2759 15.0392 26.4733 15.1146 26.6577C15.1901 26.842 15.3014 27.0096 15.4423 27.1504C15.5831 27.2913 15.7506 27.4026 15.9349 27.478C16.1193 27.5534 16.3168 27.5914 16.516 27.5897C16.7151 27.588 16.912 27.5465 17.095 27.4679C17.278 27.3893 17.4435 27.275 17.5819 27.1318L21.5959 23.1179L25.6129 27.1318C25.7512 27.275 25.9167 27.3893 26.0998 27.4679C26.2828 27.5465 26.4796 27.588 26.6788 27.5897C26.8779 27.5914 27.0754 27.5534 27.2598 27.478C27.4441 27.4026 27.6116 27.2913 27.7525 27.1504C27.8933 27.0096 28.0047 26.842 28.0801 26.6577C28.1555 26.4733 28.1935 26.2759 28.1917 26.0767C28.19 25.8775 28.1486 25.6807 28.07 25.4977C27.9914 25.3147 27.8771 25.1492 27.7339 25.0108L23.7199 20.9968L27.7339 16.9828C27.9503 16.772 28.0981 16.5009 28.1578 16.2047C28.2175 15.9086 28.1864 15.6013 28.0685 15.3231C27.9507 15.0449 27.7516 14.8087 27.4973 14.6456C27.243 14.4825 26.9453 14.4 26.6434 14.4088C26.2541 14.4203 25.8845 14.5828 25.6129 14.8619L21.5959 18.8759L17.5819 14.8619C17.442 14.7183 17.2747 14.6042 17.09 14.5264C16.9052 14.4486 16.7068 14.4087 16.5064 14.4088Z"
                          fill="#ED2B2B"
                        />
                        <circle cx="21" cy="21" r="20" stroke="#ED2B2B" stroke-width="2" />
                      </svg>
                      خطاء الحل الصحيح هوا :
                    </span>
                    <p class="text-md lg:text-3xl text-green-400 ms-2" v-text="answer.answer"></p>
                  </button>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </TransitionGroup>
    </section>
  </div>
</template>
<script setup>
import {useTostStore} from "@/store/TostStore";
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const score = useRuntimeConfig().public.score;
const tost = useTostStore();
const {t} = useI18n();
const props = defineProps({
  courses: {
    type: Object,
    // required: true,
  },
});
let breadcrumbs = ref([{text: t("my_all_exams"), section: "courses"}]);
let detailExams = ref([]);
let section = ref("courses");
let courseExam = ref({});
let questions = ref([]);
let answersIDS = ref([]);
let course = ref({});
let user = ref({});
let examID = ref(0);
const getUserExams = course_id => {
  $fetch(`${useRuntimeConfig().public.apiURL}/userExams`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user")}`,
    },
    body: {course_id},
  }).then(res => {
    if (res.status) {
      detailExams.value = res.data.detailExams;
      courseExam.value = res.data.course;
      breadcrumbs.value = [
        {text: t("my_all_exams"), section: "courses"},
        {text: `${t("all_course_exams")} ${res.data.course.subject["name_" + currentLocale.value]}`, section: "exams"},
      ];
      section.value = "exams";
    } else {
      tost.add({
        type: "error",
        message: res.message,
      });
    }
  });
};
const userShowAnswers = (course_id, exam_id) => {
  $fetch(`${useRuntimeConfig().public.apiURL}/userShowAnswers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user")}`,
    },
    body: {course_id, exam_id},
  }).then(res => {
    if (res.status) {
      questions.value = res.data.questions;
      answersIDS.value = res.data.answersIDS;
      course.value = res.data.course;
      user.value = res.data.user;
      examID.value = exam_id;
      breadcrumbs.value = [
        {text: t("my_all_exams"), section: "courses"},
        {text: `${t("all_course_exams")} ${res.data.course.subject["name_" + currentLocale.value]}`, section: "exams"},
        {text: exam_id, section: "answers"},
      ];
      section.value = "answers";
    } else {
      tost.add({
        type: "error",
        message: res.message,
      });
    }
  });
};
</script>
