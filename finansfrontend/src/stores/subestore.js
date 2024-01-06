import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";

/**
 * @module SubeStore
 * @description Şubeler ile ilgili işlemlerin yapıldığı store
 * @property {Sube} subeler
 * @property {Sube} selectedSube
 * @property {string} id_order
 * @property {number} total_sube
 * @property {number} sayfa
 * @property {number} adet
 * @property {boolean} at_end
 * @property {boolean} net_error
 * @returns {{id_order: string, total_sube: number, sayfa: number, net_error: boolean, at_end: boolean, subeler, selectedSube: null, adet: number}}
 *
 */
export const useSubeStore = defineStore("sube", {

    state: () => ({
        subeler: [],
        selectedSube: null,
        id_order: "?sırala=ar_id",
        total_sube: 0,
        sayfa: 0,
        adet: 10,
        at_end: false,
        net_error: false,
        all_sube_list: [],
        // cached_sube : []
    }),
    actions: {
        /**
         * @function init
         * @description Bu store'un init fonksiyonu. Varsayılan değerleri atar çağrılır.
         */
        init() {
            this.sayfa = 0;
            this.adet = 10;
            this.at_end = false;
            this.yukle();
        },
        /**
         * @function yukle
         * @description Şube listesini yükler
         * @param sayfa
         * @param siralama
         */
        yukle(sayfa = 0, siralama = this.id_order) {
            const loading = useLoadingState();
            loading.yuklemeyeBasla();
            this.selectedSube = null;
            axios.get(
                `http://127.0.0.1:5000/api/v1/sube/s/${sayfa}/k/${this.adet}${siralama}`,
            )
                .then((response) => {
                    if (response.status === 200) {
                        this.net_error = false;
                    }
                    this.at_end = false;
                    this.subeler = response.data;
                    loading.yuklemeyiBitir();
                })
                .catch(error => {
                    if (!error.response) {
                        // network error
                        this.net_error = true;
                        this.total_sube = 0;
                        console.log("Network Error");
                    } else {
                        this.net_error = false;
                    }

                });

        },
        /**
         * @function get_all_sube
         * @description Tüm şubeleri yükler
         */
        get_all_sube() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/sube/k/0`)
                .then((response) => {
                    this.all_sube_list = response.data;
                    this.total_sube = response.data.length;
                });
        },
        /**
         * @function subeEkle
         * @description Yeni şube ekler
         * @param sube
         */
        subeEkle(sube) {
            axios
                .post("http://127.0.0.1:5000/api/v1/sube/", sube)
                .then((response) => {
                    const sube = response.data;
                    this.subeler.push(sube);
                }).catch(error => {
                if (!error.response) {
                    // network error
                    this.net_error = true;
                    this.total_sube = 0;
                    console.log("Network Error");
                } else {
                    this.net_error = false;
                }

            });
        },
        /**
         * @function subeDuzenle
         * @description Şube düzenler
         * @param sube
         * @param sube_id
         */
        subeDuzenle(sube, sube_id) {
            axios.put('http://127.0.0.1:5000/api/v1/sube/' + sube_id, sube).then((response) => {
                const sube = response.data;
                console.log(sube);
                this.yukle(this.sayfa = 0);
            })
        },
        /**
         * @function subeSil
         * @description Şube siler
         * @param sube
         */
        subeSil(sube) {
            if (confirm("Bu şubeyi silmek istediğinize emin misiniz?")) {
                axios.delete('http://127.0.0.1:5000/api/v1/sube/' + sube["id"]).then((response) => {
                    const sube = response.data;
                    console.log(sube);
                    this.yukle();
                }).catch(error => {
                    if (error.code === "ERR_BAD_RESPONSE") {
                        alert("Bu şubeye ait bir müşteri var. Önce müşteriyi silin.")
                        this.get_all_sube();
                    }
                }) // TODO: hata mesajı API ye istek atmadan önce verilecek.
                this.sayfa = 0;
                // console.log(this.total_sube)
                this.total_sube -= 1;
            }

        },
        /**
         * @function subeSec
         * @description Sonraki sayfaya geçer
         */
        sonraki_sayfa() {
            // console.log((this.sayfa+1) * this.adet)
            // console.log(this.total_sube.length)
            if ((this.sayfa + 1) * this.adet >= this.total_sube) {
                console.log("burdayım")
                this.at_end = true;
                return;
            }
            if (this.subeler.length === 0) {
                this.at_end = true
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
        /**
         * @function onceki_sayfa
         * @description Önceki sayfaya geçer
         */
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
        /**
         * @function order_by_id
         * @description Şubeleri ID'ye göre sıralar
         */
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
        },
    },
});
