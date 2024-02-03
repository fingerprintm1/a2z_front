<template>
  <section>
    <section class="container lg:w-[800px] mx-auto mt-10 lg:mt-16 relative">
      <div
        v-if="ExamStore.related === 'exams'"
        class="relative lg:absolute right-36 lg:right-auto lg:-left-[10%] xl:-left-[30%] lg:top-10 w-20 h-20 outline-2 outline-offset-[-1px] outline-fp1 outline-dotted rounded-full mb-4"
      >
        <span
          :style="`transform: ${ExamStore.getTimeQuestions.rotatePoint}`"
          class="rotate-point absolute -top-0.5 -right-0.5 w-[104%] h-[105%] rounded-full bg-transparent before:absolute before:inset-0 before:w-3 before:-top-1 before:right-1/2 before:translate-x-1/2 before:h-3 before:rounded-full before:bg-fp1 before:z-50 z-10 transition-all duration-1000 ease-linear"
        ></span>
        <span
          :style="`background: ${ExamStore.getTimeQuestions.roundedBg}`"
          class="rounded-bg absolute -top-0.5 -right-0.5 w-[104%] h-[105%] rounded-full after:absolute after:content-[''] after:top-1 after:right-1 after:w-[90%] after:h-[90%] after:bg-white after:rounded-full"
        >
        </span>
        <span class="text-time rounded-full flex items-center justify-center text-fp1 dark:text-fpLightBack dark:bg-fpDark2 w-full h-full relative z-50">{{
          ExamStore.getTimeQuestions.textTime
        }}</span>
      </div>
      <h3 class="text-center text-2xl text-fp1 sm:my-6">{{ $t("qution") }} {{ ExamStore.getDetailsQuestions.step }} / {{ ExamStore.getDetailsQuestions.lenQuestions }}</h3>
      <TransitionGroup name="questions" tag="div" class="flex overflow-hidden h-auto">
        <div v-for="(question, index) in ExamStore.getQuestions" :key="question.id" v-show="ExamStore.getDetailsQuestions.step == ++index" class="c-w-full">
          <p
            v-if="question.type == 'text'"
            class="text-xl text-center w-1/2 mx-auto lg:mt-6 dark:text-fpLightBack question_html flex-col"
            v-html="question['question_' + currentLocale]"
          ></p>
          <audio controls v-else-if="question.type == 'audio'" class="w-full">
            <source :src="`${baseURL}/images/${question.file}`" type="audio/ogg" />
            <source :src="`${baseURL}/images/${question.file}`" type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
          <div v-else-if="question.type == 'video'" class="relative h-72">
            <iframe
              :src="`${baseURL}/images/${question.file}`"
              loading="lazy"
              class="border-0 w-full h-full relative"
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowfullscreen="true"
            ></iframe>
          </div>
          <img v-else-if="question.type == 'image'" :src="`${baseURL}/images/${question.file}`" class="w-full object-cover" />
          <div class="mt-10" v-for="(answer, indexAnswer) in question.answers_random" :key="answer.id">
            <button
              @click="ExamStore.checkAnswer({answer_id: answer.id, status: answer.status, question_id: question.id})"
              :class="[
                ExamStore.activeAnswers[question.id] == answer.id && ExamStore.getDetailsQuestions.done == false
                  ? ' border-fp1 after:border-fp1 before:bg-fp1 text-fp1'
                  : 'after:border-gray-300 before:bg-gray-300',
                ExamStore.getDetailsQuestions.done && answer.status == 1 ? ' border-green-400 after:border-green-400 before:bg-green-400 text-green-400' : '',
                ExamStore.activeAnswers[question.id] == answer.id && ExamStore.getDetailsQuestions.done == true && answer.status == 0
                  ? ' border-red-400 after:border-red-400 before:bg-red-400 text-red-400'
                  : '',
                answer.answer_type == 'image'
                  ? 'after:start-1/2 after:translate-x-1/2  before:start-1/2 before:translate-x-1/2'
                  : 'py-2 lg:py-4 ps-16 lg:ps-20 rounded-lg lg:rounded-full after:start-5 lg:after:start-8 before:start-7 lg:before:start-10',
              ]"
              class="dark:text-fpLightBack block w-full text-start border-2 transition-all relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-8 after:h-8 after:border-2 after:rounded-full after:border-dashed before:absolute before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full"
            >
              <span class="text-md lg:text-xl" v-if="answer.answer_type == 'text'" v-text="answer.answer"></span>
              <img v-else-if="answer.answer_type == 'image'" :src="`${baseURL}/images/${answer.answer}`" class="lg:w-1/2 mx-auto object-cover" />
            </button>
            <!-- {{ indexAnswer }} -->
            <div>
              <div v-if="ExamStore.activeAnswers[question.id] == answer.id && ExamStore.getDetailsQuestions.done == true && answer.status == 1">
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
                    {{ $t("answer_correct") }} :
                  </span>
                  <p class="text-md lg:text-2xl text-green-400 ms-2" v-text="answer.answer"></p>
                </button>
                <p class="text-md lg:text-3xl text-green-400 ms-2 block mt-6" v-text="question.Justify"></p>
              </div>
              <div v-if="ExamStore.activeAnswers[question.id] != answer.id && ExamStore.getDetailsQuestions.done == true && answer.status == 1">
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
                    {{ $t("answer_wrong") }} :
                  </span>
                  <p v-if="answer.answer_type == 'text'" class="text-md lg:text-3xl text-green-400 ms-2" v-text="answer.answer"></p>
                  <img v-else-if="answer.answer_type == 'image'" :src="`${baseURL}/images/${answer.answer}`" class="lg:w-2/6 mx-auto object-cover" />
                </button>
                <p class="text-md lg:text-3xl text-green-400 ms-2 block mt-6" v-text="question.Justify"></p>
              </div>
            </div>
          </div>
          <!-- <div class="mt-6">
                <button class="flex items-center text-red-500">
                  <svg width="20" height="19" class="inline" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.7734 17.1613L11.1015 0.91125C10.9951 0.711565 10.8364 0.544554 10.6425 0.428081C10.4485 0.311608 10.2265 0.250053 10.0003 0.25H9.99905C9.53783 0.25 9.11535 0.50375 8.89787 0.91L0.18716 17.16C0.0852665 17.3505 0.0343658 17.5641 0.0394032 17.78C0.0444405 17.996 0.105245 18.207 0.215909 18.3925C0.327169 18.5776 0.484373 18.7308 0.672273 18.8372C0.860174 18.9437 1.07239 18.9997 1.28834 19H18.6698C18.8857 19.0002 19.0981 18.9444 19.2861 18.8381C19.4741 18.7318 19.6313 18.5785 19.7425 18.3933C19.8537 18.2081 19.9149 17.9973 19.9204 17.7814C19.9258 17.5654 19.8752 17.3518 19.7734 17.1613ZM1.28834 17.75L9.99905 1.5L18.671 17.75H1.28834ZM8.74913 7.77V11.52C8.74913 11.8515 8.88081 12.1695 9.11522 12.4039C9.34963 12.6383 9.66755 12.77 9.99905 12.77C10.3305 12.77 10.6485 12.6383 10.8829 12.4039C11.1173 12.1695 11.249 11.8515 11.249 11.52V7.77C11.249 7.43848 11.1173 7.12054 10.8829 6.88612C10.6485 6.6517 10.3305 6.52 9.99905 6.52C9.66755 6.52 9.34963 6.6517 9.11522 6.88612C8.88081 7.12054 8.74913 7.43848 8.74913 7.77ZM8.74913 15.25C8.74913 15.4142 8.78146 15.5767 8.84427 15.7284C8.90708 15.88 8.99915 16.0178 9.11522 16.1339C9.23129 16.25 9.36908 16.342 9.52072 16.4049C9.67237 16.4677 9.83491 16.5 9.99905 16.5C10.3305 16.5 10.6485 16.3683 10.8829 16.1339C10.9989 16.0178 11.091 15.88 11.1538 15.7284C11.2166 15.5767 11.249 15.4142 11.249 15.25C11.249 14.9185 11.1173 14.6005 10.8829 14.3661C10.6485 14.1317 10.3305 14 9.99905 14C9.66755 14 9.34963 14.1317 9.11522 14.3661C8.88081 14.6005 8.74913 14.9185 8.74913 15.25Z"
                      fill="#ED2B2B"
                    />
                  </svg>
                  <span class="ms-3 -mb-1"> إبلاغ عن خطأ </span>
                </button>
              </div> -->
        </div>
      </TransitionGroup>
      <button
        v-if="ExamStore.getDetailsQuestions.step == ExamStore.getDetailsQuestions.lenQuestions && ExamStore.getDetailsQuestions.done == false"
        @click="ExamStore.doneQuestions(true)"
        type="button"
        class="text-white bg-fp1 hover:bg-fp2 w-1/2 lg:w-auto focus:outline-none focus:ring-4 focus:ring-fp2/70 font-medium rounded-3xl px-3 lg:px-16 py-2 lg:py-3 transition shadow-xl text-center lg:text-xl whitespace-nowrap mx-auto mt-6 block"
      >
        {{ $t("submission") }}
      </button>
      <button
        v-if="ExamStore.getDetailsQuestions.done"
        @click="+ExamStore.getDetailsQuestions.score >= score ? (ExamStore.activeSection = 'successful') : (ExamStore.activeSection = 'fail')"
        type="button"
        class="text-white bg-green-400 hover:bg-green-400/90 w-1/2 lg:w-auto focus:outline-none focus:ring-4 focus:ring-green-400/70 font-medium rounded-3xl px-3 lg:px-16 py-2 lg:py-3 transition shadow-xl text-center lg:text-xl whitespace-nowrap mx-auto mt-6 block"
      >
        {{ $t("result") }}
      </button>
      <div class="flex items-center ltr:flex-row-reverse justify-between mt-6">
        <button
          @click="ExamStore.switchTaps('next')"
          type="button"
          :class="
            ExamStore.getDetailsQuestions.step == ExamStore.getDetailsQuestions.lenQuestions
              ? 'bg-fpDarkGray cursor-not-allowed pointer-events-none focus:ring-transparent'
              : 'bg-fp1 hover:bg-fp1/90 focus:ring-fp1/90 '
          "
          class="text-white text-center md:text-sm xl:text-xl font-medium focus:outline-none focus:ring-4 rounded-full px-3 xl:px-10 py-1 lg:py-3 transition shadow-xl whitespace-nowrap flex items-center ltr:flex-row-reverse"
        >
          <img src="~/assets/images/student/video_playlist/next-arrow.svg" alt="" class="" />
          <span class="mt-1 ltr:me-2 rtl:ms-2">{{ $t("next_qution") }}</span>
        </button>
        <button
          @click="ExamStore.switchTaps('prev')"
          type="button"
          :class="
            ExamStore.getDetailsQuestions.step == 1 ? 'bg-fpDarkGray cursor-not-allowed pointer-events-none focus:ring-transparent' : 'bg-fp1 hover:bg-fp1/90 focus:ring-fp1/70'
          "
          class="text-white text-center md:text-sm xl:text-xl font-medium focus:outline-none focus:ring-4 rounded-full px-3 xl:px-10 py-1 lg:py-3 transition shadow-xl whitespace-nowrap flex items-center ltr:flex-row-reverse"
        >
          <span class="mt-1 ltr:ms-2 rtl:me-2">{{ $t("prev_qution") }}</span>
          <img src="~/assets/images/student/video_playlist/prev-arrow.svg" alt="" class="" />
        </button>
      </div>
      <ExamIndicator />
    </section>
  </section>
</template>
<script setup>
import {useExamStore} from "@/store/ExamStore";
const ExamStore = useExamStore();
const {currentLocale, dir} = useLang();
const baseURL = useRuntimeConfig().public.baseURL;
const score = useRuntimeConfig().public.score;
// const questions = ExamStore.getQuestions;
</script>
