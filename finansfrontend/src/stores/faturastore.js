import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";
import {useHareketStore} from "@/stores/hareketsotre";
import {useMusteriStore} from "@/stores/musteristore";

/**
 * @module FaturaStore
 * @description Fatura ile ilgili işlemlerin yapıldığı store
 * @property {Fatura[]} faturalar
 * @property {Fatura} selectedFatura
 * @property {string} id_order
 * @property {number} total_fatura
 * @property {number} sayfa
 * @property {number} adet
 * @property {boolean} at_end
 * @property {boolean} net_error
 * @property {null} bakiye_update
 * @property {boolean} not_enough
 * @property {Fatura} all_fatura_list
 * @property {Fatura} all_hesap_list
 * @returns {{id_order: string, bakiye_update: null, not_enough: boolean, sayfa: number, net_error: boolean, all_fatura_list, faturalar, selectedFatura: null, at_end: boolean, total_fatura: number, adet: number}}
 * */
export const useFaturaStore = defineStore("fatura", {
    state: () => ({
        faturalar: [],
        selectedFatura: null,
        id_order: "?sırala=ar_id",
        total_fatura: 0,
        sayfa: 0,
        adet: 10,
        at_end: false,
        net_error: false,
        bakiye_update: null,
        not_enough: false,
        all_fatura_list: [],
    }),
    actions: {
        /** @function init
         *  @description Bu store'un init fonksiyonu. Varsayılan değerleri atar çağrılır.
         */
        init() {
            this.sayfa = 0;
            this.adet = 10;
            // this.id_order = "?sırala=az_id";
            this.at_end = false;
            this.yukle();
        },
        /**
         * @function yukle
         * @description Fatura listesini yükler
         * @param sayfa
         * @param siralama
         */
        yukle(sayfa = 0, siralama = this.id_order) {
            const loading = useLoadingState();
            loading.yuklemeyeBasla();
            this.selectedFatura = null;
            axios.get(
                `http://127.0.0.1:5000/api/v1/fatura/s/${sayfa}/k/${this.adet}${siralama}`,
            )
                .then((response) => {
                    if (response.status === 200) {
                        this.net_error = false;
                    }
                    this.at_end = false;
                    this.faturalar = response.data;
                    loading.yuklemeyiBitir();
                })
                .catch(error => {
                    if (!error.response) {
                        // network error
                        this.net_error = true;
                        this.total_fatura = 0;
                        console.log("Network Error");
                    } else {
                        this.net_error = false;
                    }

                });

        },
        /** @function get_all_fatura
         *  @description Tüm faturaları yükler, toplam fatura sayısını kaydeder.
         */
        get_all_fatura() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/fatura/k/0`)
                .then((response) => {
                    this.all_hesap_list = response.data;
                    this.total_fatura = response.data.length;
                });
        },
        /**
         * @function get_all_fatura_by_musteri
         * @description Müşteriye ID'sine özel faturaları yükler, toplam fatura sayısını kaydeder.
         * @param siralama
         */
        get_all_fatura_by_musteri(siralama) {
            axios
                .get(`http://127.0.0.1:5000/api/v1/fatura/k/0${siralama}`)
                .then((response) => {
                    this.all_fatura_list = response.data;
                    this.total_fatura = response.data.length;
                    for (let i = 0; i < this.all_fatura_list.length; i++) {
                        // console.log(this.all_fatura_list[i]['fatura_durum'])
                        if (this.all_fatura_list[i]['fatura_durum'] === "Ödendi") {
                            this.all_fatura_list.splice(i, 1);
                            i--;
                        }
                    }
                });
        },
        /**
         * @function faturaEkle
         * @description Fatura ekler
         * @param fatura
         */
        faturaEkle(fatura) {
            console.log(fatura);
            axios
                .post("http://127.0.0.1:5000/api/v1/fatura/", fatura)
                .then((response) => {
                    const fatura = response.data;
                    this.faturalar.push(fatura);
                    const musteri = useMusteriStore();
                    musteri.kredi_skor_guncelle(fatura["fatura_musteri_id"])
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
         * @function faturaDuzenle
         * @description Fatura düzenler
         * @param fatura
         * @param fatura_id
         */
        faturaDuzenle(fatura, fatura_id) {
            axios.put('http://127.0.0.1:5000/api/v1/fatura/' + fatura_id, fatura).then((response) => {
                const fatura = response.data;
                console.log(fatura);
                this.yukle(this.sayfa = 0);
            })
        },
        /**
         * @function faturaSil
         * @description Fatura siler
         * @param fatura
         */
        faturaSil(fatura) {
            axios.delete('http://127.0.0.1:5000/api/v1/fatura/' + fatura["id"]).then((response) => {
                const fatura = response.data;
                console.log(fatura);
                this.yukle();
                const musteri = useMusteriStore();
                musteri.kredi_skor_guncelle(fatura["fatura_musteri_id"])
            })

            this.sayfa = 0;
            this.total_fatura -= 1;
        },
        /**
         * @function faturaOdeme
         * @description Fatura ödemesi yapar
         * @param fatura
         */
        faturaOdeme(fatura) {
            axios.get('http://127.0.0.1:5000/api/v1/fatura/odeme/' + fatura.id).then((response) => {
                const fatura = response.data;
                this.yukle(this.sayfa = 0);
            })
            const musteri = useMusteriStore();
            musteri.kredi_skor_guncelle(fatura["fatura_musteri_id"])
            const hareket = useHareketStore()
            const {hareketEkle} = hareket;
            hareketEkle("Fatura Ödemesi", fatura.fatura_miktar, fatura.fatura_musteri_id)
        },
        /**
         * @function find_fatura_by_id
         * @description Fatura ID'sine göre faturayı bulur
         * @param id
         * @returns {string|undefined}
         */
        find_fatura_by_id(id) {
            for (let i = 0; i < this.all_hesap_list.length; i++) {
                if (this.all_hesap_list[i]['id'] === id) {
                    return (this.all_hesap_list[i]['hesap_musteri_id'])
                }
            }


        },
        /**
         * @function sonraki_sayfa
         * @description Sonraki sayfayı yükler
         */
        sonraki_sayfa() {
            // console.log((this.sayfa+1) * this.adet)
            // console.log(this.total_sube.length)
            if ((this.sayfa + 1) * this.adet >= this.total_fatura) {

                this.at_end = true;
                return;
            }
            if (this.faturalar.length === 0) {
                this.at_end = true
                return;
            }
            if (this.faturalar.length < 10) {
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
            if (this.faturalar.length === 0) {
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
         * @description Faturaları ID'ye göre sıralar
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
