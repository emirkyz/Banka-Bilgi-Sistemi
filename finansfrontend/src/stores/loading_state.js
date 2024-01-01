import {defineStore} from "pinia";

/**
 * @module LoadingState
 * @description Loading state'i için store
 */
export const useLoadingState = defineStore("loading", {
    state: () => ({loading: false}),
    actions: {
        /**
         * @function yuklemeyeBasla
         * @description Loading state'i true yapar. Loading state'i true olunca loading spinner gösterilir
         */
        yuklemeyeBasla() {
            this.loading = true;
        },
        /**
         * @function yuklemeyiBitir
         * @description Loading state'i false yapar. Loading state'i false olunca loading spinner gizlenir
         */
        yuklemeyiBitir() {
            this.loading = false;
        },
    },
});
