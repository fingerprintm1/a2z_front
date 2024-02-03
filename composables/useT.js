export function useT(key) {
  return useNuxtApp().$i18n.t(key);
}
