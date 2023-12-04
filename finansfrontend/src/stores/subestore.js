import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";

export const useSubeStore = defineStore('sube',
    {
        state: () => ({
            subeler: [],
            selectedSube: null,
            id_order: "?sırala=ar_id",
            total_sube: 0,
            sayfa: 0,
            adet: 10,
            at_end: false,
        }),
        actions: {
            init() {
                this.sayfa = 0;
                this.ade = 10;
                this.at_end = false;
                this.yukle();
            },
            yukle(sayfa = 0, siralama = this.id_order) {
                const loading = useLoadingState();
                loading.yuklemeyeBasla();
                this.selectedSube = null;
                axios.get(`http://127.0.0.1:5000/api/v1/sube/s/${sayfa}/k/${this.adet}${siralama}`).then((response) => {
                    this.subeler = response.data;

                    loading.yuklemeyiBitir();
                })
            },
            get_all_kredi() {
                axios.get(`http://127.0.0.1:5000/api/v1/sube/k/100000000000`).then((response) => {
                    this.total_sube = response.data;

                })
            },
            sonraki_sayfa() {
                if (this.subeler.length === 0) {
                    return;
                }
                if (this.subeler.length < 10) {
                    this.at_end = true;
                    return;
                }
                this.at_end = false;
                this.sayfa += 1;
                this.yukle(this.sayfa);
            },
            onceki_sayfa() {
                if (this.subeler.length === 0) {
                    return;
                }
                if (this.sayfa === 0) {
                    return;
                }
                this.at_end = false;
                this.sayfa -= 1;
                this.yukle(this.sayfa);
            },
            order_by_id() {
                if (this.id_order === "?sırala=ar_id") {
                    this.sayfa = 0;
                    this.id_order = "?sırala=az_id";
                    this.yukle();
                } else {
                    this.sayfa = 0;
                    this.id_order = "?sırala=ar_id";
                    this.yukle();
                }
            }
        }
    });