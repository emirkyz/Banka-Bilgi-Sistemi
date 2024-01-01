import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";
import {ref} from "vue";

/**
 * @module HesapStore
 * @description Hesaplar ile ilgili işlemlerin yapıldığı store
 * @property {Hesap} hesaplar
 * @property {Hesap} selectedHesap
 * @property {string} id_order
 * @property {number} total_hesap
 * @property {number} sayfa
 * @property {number} adet
 * @property {boolean} at_end
 * @property {boolean} net_error
 * @property {null} bakiye_update
 * @property {boolean} not_enough
 * @property {Hesap} all_hesap_list
 * @returns {{hesaplar, id_order: string, bakiye_update: null, not_enough, all_hesap_list, sayfa: number, net_error: boolean, total_hesap: number, at_end: boolean, selectedHesap: null, adet: number}}
 *
 */
export const useHesapStore = defineStore("hesap", {

    state: () => ({
        hesaplar: [],
        selectedHesap: null,
        id_order: "?sırala=ar_id",
        total_hesap: 0,
        sayfa: 0,
        adet: 10,
        at_end: false,
        net_error: false,
        bakiye_update: null,
        not_enough: ref(false),
        all_hesap_list: [],
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
            this.not_enough = false;
            this.yukle();
        },
        /**
         * @function yukle
         * @description Hesap listesini yükler
         * @param sayfa
         * @param siralama
         */
        yukle(sayfa = 0, siralama = this.id_order) {
            const loading = useLoadingState();
            loading.yuklemeyeBasla();
            this.selectedHesap = null;
            axios.get(
                `http://127.0.0.1:5000/api/v1/hesap/s/${sayfa}/k/${this.adet}${siralama}`,
            )
                .then((response) => {
                    if (response.status === 200) {
                        this.net_error = false;
                    }
                    this.at_end = false;
                    this.hesaplar = response.data;
                    loading.yuklemeyiBitir();
                })
                .catch(error => {
                    if (!error.response) {
                        // network error
                        this.net_error = true;
                        this.total_hesap = 0;
                        console.log("Network Error");
                    } else {
                        this.net_error = false;
                    }

                });

        },
        /**
         * @function get_all_hesap
         * @description Tüm hesapları yükler
         */
        get_all_hesap() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/hesap/k/0`)
                .then((response) => {
                    this.all_hesap_list = response.data;
                    this.total_hesap = response.data.length;
                });
        },
        /**
         * @function hesapEkle
         * @description Hesap ekler
         * @param hesap
         */
        hesapEkle(hesap) {
            console.log(hesap);
            axios
                .post("http://127.0.0.1:5000/api/v1/hesap/", hesap)
                .then((response) => {
                    const hesap = response.data;
                    this.hesaplar.push(hesap);
                }).catch(error => {
                if (!error.response) {
                    // network error
                    this.net_error = true;

                    console.log("Network Error");
                } else {
                    this.net_error = false;
                }

            });
        },
        /**
         * @function hesapDuzenle
         * @description Hesap düzenler
         * @param hesap
         * @param hesap_id
         */
        hesapDuzenle(hesap, hesap_id) {
            axios.put('http://127.0.0.1:5000/api/v1/hesap/' + hesap_id, hesap).then((response) => {
                const hesap = response.data;
                console.log(hesap);
                this.yukle(this.sayfa = 0);
            })
        },
        /**
         * @function hesapSil
         * @description Hesap siler
         * @param hesap
         */
        hesapSil(hesap) {
            axios.delete('http://127.0.0.1:5000/api/v1/hesap/' + hesap["id"]).then((response) => {
                const hesap = response.data;
                console.log(hesap);
                this.yukle();
            })
            this.get_all_hesap();
            this.sayfa = 0;
            this.total_hesap -= 1;
        },
        /**
         * @function bakiye_arttir
         * @description Hesap bakiyesini arttırır
         * @param hesap
         * @param miktar
         * @returns {Promise<void>}
         */
        async bakiye_arttir(hesap, miktar) {
            axios.get(`http://127.0.0.1:5000/api/v1/hesap/bakiye/e/${hesap}/${miktar}`).then((response) => {
                const hesap = response.data;
                this.bakiye_update = null;
                console.log(hesap);
                this.yukle()
            })
        },
        /**
         * @function bakiye_azalt
         * @description Hesap bakiyesini azaltır
         * @param hesap
         * @param miktar
         * @returns {Promise<void>}
         */
        async bakiye_azalt(hesap, miktar) {
            await axios.get(`http://127.0.0.1:5000/api/v1/hesap/bakiye/c/${hesap}/${miktar}`)
                .then((response) => {
                    const hesap = response.data;
                    if (hesap['hata']) {
                        // console.log("if içinde");
                        console.log(hesap['hata'])
                        this.not_enough = true;
                        this.yukle()
                        return this.not_enough

                    } else {
                        // console.log("else içinde");
                        this.not_enough = false;
                        this.yukle()
                        return this.not_enough
                    }
                })
        },
        /**
         * @function find_hesap_by_id
         * @description ID'ye göre hesabı bulur
         * @param id
         * @returns {string}
         */
        find_hesap_by_id(id) {

            for (let i = 0; i < this.all_hesap_list.length; i++) {
                if (this.all_hesap_list[i]['id'] === id) {
                    return (this.all_hesap_list[i]['hesap_musteri_id'])
                }
            }
        },
        /**
         * @function get_all_hesap_by_musteri
         * @description Müşteriye göre hesapları bulur
         * @param siralama
         */
        get_all_hesap_by_musteri(siralama) {
            axios
                .get(`http://127.0.0.1:5000/api/v1/hesap/k/0${siralama}`)
                .then((response) => {
                    this.all_hesap_list = response.data;
                    this.total_hesap = response.data.length;
                });
        },
        /**
         * @function sonraki_sayfa
         * @description Sonraki sayfayı yükler
         */
        sonraki_sayfa() {
            if ((this.sayfa + 1) * this.adet >= this.total_hesap) {

                this.at_end = true;
                return;
            }
            if (this.hesaplar.length === 0) {
                this.at_end = true
                return;
            }
            if (this.hesaplar.length < 10) {
                this.at_end = true;
                return;
            }
            this.at_end = false;
            this.sayfa += 1;
            this.yukle(this.sayfa);
        },
        /**
         * @function onceki_sayfa
         * @description Önceki sayfayı yükler
         */
        onceki_sayfa() {
            if (this.hesaplar.length === 0) {
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
         * @description ID'ye göre sıralama yapar
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
