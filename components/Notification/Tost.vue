<template>
  <div class="flex items-center w-full md:w-80 p-3 bg-white dark:bg-fpDark2 rounded-md shadow-xl mb-4 border-t-4" :class="`border-${notification.type}`">
    <div class="me-4" :class="`text-${notification.type}`">
      <Icon v-if="notification.type == 'success'" name="ic:round-check-circle-outline" size="2rem" />
      <Icon v-if="notification.type == 'error'" name="mdi:close-circle-outline" size="2rem" />
      <Icon v-if="notification.type == 'warning'" name="ic:baseline-error-outline" size="2rem" />
      <Icon v-if="notification.type == 'info'" name="ic:outline-info" size="2rem" />
    </div>
    <div class="me-2">
      <h4 class="text-lg md:text-xl font-semibold" :class="`text-${notification.type}`">
        <span v-if="notification.type == 'success'">{{ $t("success") }}</span>
        <span v-if="notification.type == 'error'">{{ $t("error") }}</span>
        <span v-if="notification.type == 'warning'">{{ $t("warning") }}</span>
        <span v-if="notification.type == 'info'">{{ $t("info") }}</span>
      </h4>

      <p class="mb-2 text-sm text-slate-500 dark:text-fpLightBack">{{ notification.message }}</p>
    </div>

    <div class="ms-auto">
      <button @click="deleteTost(notification)" type="button" class="text-flDarkGray" data-dismiss="alert" aria-label="Close">
        <Icon name="ic:round-close" size="2rem" />
      </button>
    </div>
  </div>
</template>

<script setup>
import {useTostStore} from "@/store/TostStore";

const props = defineProps({
  notification: [Object, Array],
  // id: Number,
});

const tost = useTostStore();
const timeout = ref();

function deleteTost(notification) {
  tost.remove(notification);
}

onMounted(() => {
  nextTick(() => {
    timeout.value = setTimeout(() => {
      tost.remove(props.notification);
    }, 3000);
  });
});

onBeforeUnmount(() => {
  clearTimeout(timeout.value);
});
</script>

<style scoped>
.border-success {
  color: #3fdb77;
}
.border-error {
  color: #ff375b;
}
.border-warning {
  color: #ff9040;
}
.border-info {
  color: #00acd8;
}

.text-success {
  color: #3fdb77;
}
.text-error {
  color: #ff375b;
}
.text-warning {
  color: #ff9040;
}
.text-info {
  color: #00acd8;
}
</style>
