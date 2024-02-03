export function useLang() {
  const nuxtApp = useNuxtApp();
  const i18n = nuxtApp.$i18n;
  // const currentLocale = ref(locale)
  // const dir = ref(locales.value.find((l) => (l.code = locale).dir))

  const currentLocale = computed(() => {
    return i18n.locale.value;
  });

  const dir = computed(() => {
    if (i18n.locale.value == "ar") {
      return "rtl";
    } else {
      return "ltr";
    }
  });

  return {currentLocale, dir};
}
