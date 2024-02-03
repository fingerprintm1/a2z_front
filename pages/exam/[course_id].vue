<template>
  <main class="" v-if="Object.keys(ExamStore.getQuestions).length">
    <ExamHeader />
    <TransitionGroup name="questions">
      <ExamDetails v-if="ExamStore.activeSection == 'details'" />
      <ExamQuestions v-if="ExamStore.activeSection == 'questions'" />
      <ExamSuccessful v-if="ExamStore.activeSection == 'successful'" />
      <ExamFail v-if="ExamStore.activeSection == 'fail'" />
      <ExamSuccessfulFail v-if="ExamStore.activeSection == 'fail' || ExamStore.activeSection == 'successful'" />
    </TransitionGroup>
    <ExamExit />
  </main>
</template>
<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
import {useTostStore} from "@/store/TostStore";
import {useExamStore} from "@/store/ExamStore";
const ExamStore = useExamStore();
const globalStore = useGlobalStore();
const route = useRoute();
const tost = useTostStore();
const localePath = useLocalePath();
const {t} = useI18n();
if (route.query.plan == undefined || route.query.plan == "" || route.query.related == undefined || route.query.related == "") {
  navigateTo(localePath(`/course/${route.params.course_id}`));
}

globalStore.showHeaders = false;
await ExamStore.getQuestionsApi(route.params.course_id, atob(route.query.plan), atob(route.query.related)).then(res => {
  try {
    useHead({
      title: `${t("exam")} ${res.title}`,
      meta: [{name: "title", content: res.title}],
    });
  } catch (error) {
    console.log(error);
  }
});

if (process.client) {
  if (localStorage.getItem("user") == null) {
    tost.add({
      type: "error",
      message: t("login_first"),
    });
    navigateTo(localePath("/login"));
  }
}
</script>
