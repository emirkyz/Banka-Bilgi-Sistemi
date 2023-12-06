import { ref } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("tema", () => {
  const secili_tema = ref("light_mode");

  return { secili_tema };
});
