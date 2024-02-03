import {defineStore} from "pinia";
import {useTostStore} from "@/store/TostStore";
import {useAuthStore} from "@/store/AuthStore";
import {useGlobalStore} from "@/store/GlobalStore";
const auth = useAuthStore();
const tost = useTostStore();

export const useExamStore = defineStore("ExamStore", {
  state: () => {
    return {
      activeSection: ref("details"),
      questions: ref({}),
      lecture: ref({}),
      course: ref({}),
      exit: ref(false),
      related: ref("exams"),
      pathFile: ref(""),
      userAnswers: reactive([]),
      activeAnswers: reactive({}),
      DetailsQuestions: reactive({
        lenQuestions: ref(0),
        trueLengs: ref(0),
        falseLengs: ref(0),
        step: ref(1),
        score: ref(0),
        done: ref(false),
      }),
      TimeQuestions: reactive({
        interval: ref(null),
        textTime: ref(`00:00:00`),
        roundedBg: ref(``),
        rotatePoint: ref(``),
      }),
    };
  },
  getters: {
    getCourse: state => state.course,
    getLecture: state => state.lecture,
    getQuestions: state => state.questions,
    getTimeQuestions: state => state.TimeQuestions,
    getDetailsQuestions: state => state.DetailsQuestions,
  },
  actions: {
    async getQuestionsApi(course_id, lecture_id, related) {
      this.related = related;
      try {
        await $fetch(`${useRuntimeConfig().public.apiURL}/getQuestions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: {course_id, lecture_id, related},
        }).then(res => {
          if (res.status) {
            this.questions = res.data.questions;
            this.lecture = res.data.lecture;
            this.course = res.data.course;

            if (this.questions.length == 0) {
              tost.add({
                type: "error",
                message: "مفيش أسئلة في الوقت الحالي ، ممكن تلاقي قريب",
              });
              navigateTo(`/course/${this.course.id}`);
            }
            if (res.data.available_re_exam) {
              tost.add({
                type: "error",
                message: "إنتهت كل محاولاتك المسموح بها،حاول مجددا غدا",
              });
              useGlobalStore().showHeaders = true;
              this.exitExam();
            }
            this.DetailsQuestions.lenQuestions = this.questions.length;
          } else {
            navigateTo(`/`);
            tost.add({
              type: "error",
              message: res.message,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
      return this.lecture;
    },

    async registerExam(data) {
      try {
        return await $fetch(`${useRuntimeConfig().public.apiURL}/registerUserExam`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: data,
        }).then(res => {
          if (res.status) {
            this.pathFile = res.data.file;
          } else {
            tost.add({
              type: "error",
              message: res.message,
            });
          }
          return res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    doneQuestions(submission) {
      if (submission && this.userAnswers.length >= this.DetailsQuestions.lenQuestions) {
        tost.add({
          type: "error",
          message: `تم حل ${this.userAnswers.length} أسئلة من ${this.DetailsQuestions.lenQuestions} يجب حل جميع الأسئلة`,
        });
        return;
      }
      this.userAnswers.forEach(element => {
        if (element.status == 1) {
          this.DetailsQuestions.trueLengs++;
        } else {
          this.DetailsQuestions.falseLengs++;
        }
      });
      this.DetailsQuestions.score = parseFloat((this.DetailsQuestions.trueLengs / this.DetailsQuestions.lenQuestions) * 100).toFixed(2);
      this.DetailsQuestions.done = true;
      clearInterval(this.TimeQuestions.interval);
      if (this.related === "exams") {
        this.registerExam({
          course_id: this.course.id,
          lecture_id: this.lecture.id,
          answers: this.userAnswers,
          score: this.DetailsQuestions.score,
          correct: this.DetailsQuestions.trueLengs,
          mistake: this.DetailsQuestions.falseLengs,
          latest: this.lecture.latest,
        }).then(res => {
          if (res.available_re_exam) {
            tost.add({
              type: "error",
              message: "إنتهت كل محاولاتك المسموح بها،حاول مجددا غدا",
            });
            this.exitExam();
          }
        });
      }
      if (+this.DetailsQuestions.score >= useRuntimeConfig().public.score) {
        this.activeSection = "successful";
      } else {
        this.activeSection = "fail";
      }
    },
    countDown(menuts) {
      let countDownDate = new Date().getTime() + menuts * 60 * 1000;
      let num = 1;
      this.TimeQuestions.interval = setInterval(() => {
        let dateNow = new Date().getTime();
        let dateDiff = countDownDate - dateNow;
        let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours
        let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
        let seconds = Math.ceil((dateDiff % (1000 * 60)) / 1000); // Seconds
        num += 360 / (menuts * 60);

        let hoursText = hours < 10 ? `0${hours}` : hours;
        let minutesText = minutes < 10 ? `0${minutes}` : minutes;
        let secondsText = seconds < 10 ? `0${seconds}` : seconds;
        this.TimeQuestions.textTime = `${hoursText}:${minutesText}:${secondsText}`;
        this.TimeQuestions.roundedBg = `conic-gradient(#ffbb22 ${Math.abs(num - 360)}deg , transparent 0deg)`;
        this.TimeQuestions.rotatePoint = `rotate(${Math.abs(num - 360)}deg)`;
        // console.log(`hours:${hours}:minutes:${minutes}:seconds:${seconds}`);
        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
          this.doneQuestions();
          // clearInterval(interval);
        }
      }, 1000);
    },
    checkAnswer(data) {
      if (this.DetailsQuestions.done == false) {
        this.userAnswers = this.userAnswers.filter(ele => ele.question_id != data.question_id);
        this.userAnswers.push(data);
        this.activeAnswers[data.question_id] = data.answer_id;
      } else {
        tost.add({
          type: "error",
          message: "إنتهي اﻹمتحان",
        });
      }
    },
    questionStart() {
      this.activeSection = "questions";
      if (this.related === "exams") {
        this.countDown(+this.lecture.duration_exam);
      }
    },
    reTest() {
      this.activeSection = "details";
      this.userAnswers = reactive([]);
      this.activeAnswers = reactive({});
      this.exit = false;
      this.DetailsQuestions = reactive({
        lenQuestions: ref(this.DetailsQuestions.lenQuestions),
        trueLengs: ref(0),
        falseLengs: ref(0),
        step: ref(1),
        score: ref(0),
        done: ref(false),
      });
      clearInterval(this.TimeQuestions.interval);
      this.TimeQuestions = reactive({
        interval: ref(null),
        textTime: ref(`00:00:00`),
        roundedBg: ref(``),
        rotatePoint: ref(``),
      });
    },
    exitExam() {
      this.reTest();
      navigateTo(`/course/${this.course.id}`);
    },
    switchTaps(type) {
      if (type == "next" && this.DetailsQuestions.lenQuestions != this.DetailsQuestions.step) {
        this.DetailsQuestions.step++;
      } else if (type == "prev") {
        this.DetailsQuestions.step--;
      } else {
        this.DetailsQuestions.step = type;
      }
    },
  },
});
