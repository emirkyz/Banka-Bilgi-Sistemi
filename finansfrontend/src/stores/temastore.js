import {ref} from "vue";
import {defineStore} from "pinia";

/**
 * @module ThemeStore
 * @description Hangi temanın seçili olduğunu tutan store.
 */
export const useThemeStore = defineStore("tema", () => {
    const secili_tema = ref("light_mode");

    return {secili_tema};
});
