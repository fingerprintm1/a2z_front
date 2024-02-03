import {defineStore} from "pinia";
import {useTostStore} from "@/store/TostStore";
import {useAuthStore} from "@/store/AuthStore";
import {useGlobalStore} from "@/store/GlobalStore";
const globalStore = useGlobalStore();
const auth = useAuthStore();
const tost = useTostStore();
const errors = reactive(useErrors());
export const useCourseStore = defineStore("course", {
  state: () => {
    return {
      locale: useI18n().locale,
      showTap: ref("lectures"),
      TapFilesGroups: ref("files"),
      course: ref({}),
      activeChapter: reactive({}),
      videoData: reactive({
        videoID: "",
        url: "",
        title: "",
        type_video: "",
        show: false,
      }),
      lectureAttachments: reactive({
        show: ref(false),
        name: "",
        attachments: [],
      }),
      videoURL: {
        youtube: {
          url: "https://www.youtube.com/embed/",
          query: "?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1",
        },

        server: {
          url: "https://iframe.mediadelivery.net/embed/160715/",
          query: "?autoplay=false&loop=false&muted=false&preload=true",
        },
      },
    };
  },
  getters: {
    getCourse: state => state.course,
    getVideoData: state => state.videoData,
    getLectureAttachments: state => state.lectureAttachments,
  },
  actions: {
    closeAttachmentsModal() {
      this.lectureAttachments = reactive({
        show: ref(false),
        name: "",
        attachments: [],
      });
    },
    setAttachments(attachmentsLecture, name) {
      this.lectureAttachments.attachments = attachmentsLecture;
      this.lectureAttachments.name = name;
      this.lectureAttachments.show = true;
    },
    async getCourseApi(ID) {
      try {
        let token = localStorage.getItem("user");
        await $fetch(`${useRuntimeConfig().public.apiURL}/course/${ID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
          if (!res.data) {
            tost.add({
              type: "error",
              message: res.message,
            });
            navigateTo("/");
          } else if (!res.data.status) {
            tost.add({
              type: "error",
              message: useT('course_not_avilable'),
            });
            navigateTo("/");
          } else {
            this.course = res.data;
            if (this.course.chapters.length != 0) {
              this.activeChapter[this.course.chapters[0].id] = this.course.chapters[0].id;
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
      return this.course;
    },

    setValueShowVideo(show, videoID = "", title = "", type_video = "") {
      type_video = type_video == "server_id" ? "server" : type_video;
      if (show) {
        this.videoData.videoID = videoID;
        this.videoData.title = title;
        this.videoData.type_video = type_video;
        this.videoData.url = `${this.videoURL[`${type_video}`].url}${videoID}${this.videoURL[`${type_video}`].query}`;
        setTimeout(() => {
          if (type_video == "youtube") {
            let plyr = document.querySelector(".parentPlayer .plyr");
            if (!plyr.contains(document.getElementById("watermark"))) {
              let watermark = document.createElement("div");
              watermark.id = "watermark";
              watermark.className = "watermark bg-fpDark1/70 whitespace-nowrap absolute z-[9999] rounded-xl font-bold text-xl text-white px-4 py-2 w-fit mt-2";
              watermark.innerHTML = `#${auth.user.id} ${auth.user["name_" + this.locale]}`;
              plyr.appendChild(watermark);
            }
          }
        }, 500);
      }
      this.videoData.show = show;
    },
    setValueTap(value) {
      this.showTap = value;
    },
    setTapFilesGroups(value) {
      this.TapFilesGroups = value;
    },

    setActiveChapter(value) {
      if (this.activeChapter[value] == value) {
        delete this.activeChapter[value];
      } else {
        this.activeChapter[value] = value;
      }
    },

    async commentCourse(comment) {
      try {
        await $fetch(`${useRuntimeConfig().public.apiURL}/commentCourse`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: {locale: this.locale, comment, course_id: this.course.id},
        }).then(res => {
          if (res.status) {
            tost.add({
              type: "success",
              message: "تم ارسال تعليقك لينا بنجاح ، بنشكرك",
            });
          } else {
            if (res.errCode == 422) {
              let ob = {};

              for (const [key, value] of Object.entries(res.message)) {
                ob[key] = value[0];
                tost.add({
                  type: "error",
                  message: value[0],
                });
              }
              errors.record(ob);
            } else if (res.errCode == 0) {
              tost.add({
                type: "error",
                message: res.message,
              });
              navigateTo("/login");
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    isDateNow(date) {
      date = new Date(date);
      let dateNow = new Date();
      return dateNow > date;
    },
    formatDate(date) {
      date = new Date(date);
      let today = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      if (today.getDate() == date.getDate()) {
        return `${strTime}`;
      }
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${strTime}`;
    },
  },
});
