<template>
  <div class="lg:container lg:mx-auto my-24" v-if="Object.keys(CourseStore.getCourse).length == 0">
    <Skeleton type="image_text" :count="6" />
  </div>
  <section class="" v-if="Object.keys(CourseStore.getCourse).length">
    <CourseHero :course="course" :bg_course="globalStore.appSettings.bg_course" />
    <div class="">
      <CourseButtonsTaps />
      <div class="container mx-auto py-10">
        <TransitionGroup name="taps-down">
          <CourseAboute v-if="CourseStore.showTap == 'aboute'" />
          <CourseLectures v-if="CourseStore.showTap == 'lectures'" />
          <CourseFiles v-if="CourseStore.showTap == 'files'" />
          <CourseComments v-if="CourseStore.showTap == 'comments'" />
        </TransitionGroup>
      </div>
    </div>
    <TransitionGroup name="lessons-down" v-if="Object.keys(globalStore.appSettings).length">
      <CourseModalVideo v-if="CourseStore.getVideoData.show" />
      <CourseModalPay v-if="PayStore.getPayData.show" :vodafone_cash="globalStore.appSettings.vodafone_cash" />
      <CourseModelAttachments v-if="CourseStore.getLectureAttachments.show && CourseStore.getLectureAttachments.attachments.length > 0" />
    </TransitionGroup>
  </section>
</template>

<script setup>
import {useGlobalStore} from "@/store/GlobalStore";
import {useCourseStore} from "@/store/CourseStore";
import {usePayStore} from "@/store/PayStore";
const PayStore = usePayStore();
const CourseStore = useCourseStore();
const globalStore = useGlobalStore();
const route = useRoute();
globalStore.showHeaders = true;
await CourseStore.getCourseApi(route.params.id).then(res => {
  try {
    useHead({
      title: res.name,
      meta: [{name: "title", content: res.name}],
    });
  } catch (error) {
    console.log(error);
  }
});
</script>
