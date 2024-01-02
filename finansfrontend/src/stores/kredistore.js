import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";
import {useMusteriStore} from "@/stores/musteristore";
import {useHareketStore} from "@/stores/hareketsotre";

/**
 * @module KrediStore
 * @description Kredi ile ilgili işlemlerin yapıldığı store
 * @property {Kredi} krediler
 * @property {Kredi} selectedCredit
 * @property {string} id_order
 * @property {number} total_credits
 * @property {number} sayfa
 * @property {number} adet
 * @property {boolean} at_end
 * @property {boolean} net_error
 * @returns {{id_order: string, sayfa: number, net_error: boolean, krediler, total_credits: number, at_end: boolean, selectedCredit: null, adet: number}}
 *
 */
export const useKrediStore = defineStore("kredi", {
    /**
     * Bu store'da kullanılan değişkenler
     * @property {Kredi} krediler
     * @property {Kredi} selectedCredit
     * @property {string} id_order
     * @property {number} total_credits
     * @property {number} sayfa
     * @property {number} adet
     * @property {boolean} at_end
     * @property {boolean} net_error
     * @returns {{id_order: string, sayfa: number, net_error: boolean, krediler, total_credits: number, at_end: boolean, selectedCredit: null, adet: number}}
     */
    state: () => ({
        krediler: [],
        selectedCredit: null,
        id_order: "?sırala=ar_id",
        total_credits: 0,
        sayfa: 0,
        adet: 10,
        at_end: false,
        net_error: false,
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
         * @description Kredi listesini yükler
         * @param sayfa
         * @param siralama
         */
        yukle(sayfa = 0, siralama = this.id_order) {
            const loading = useLoadingState();
            loading.yuklemeyeBasla();
            this.selectedCredit = null;
            axios
                .get(
                    `http://127.0.0.1:5000/api/v1/kredi/s/${sayfa}/k/${this.adet}${siralama}`,
                )
                .then((response) => {
                    if (response.status === 200) {
                        this.net_error = false;
                    }
                    this.at_end = false;
                    this.krediler = response.data;
                    loading.yuklemeyiBitir();
                })
                .catch(error => {
                    if (!error.response) {
                        // network error
                        this.net_error = true;
                        this.total_credits = 0;
                        console.log("Network Error");
                    } else {
                        this.net_error = false;
                    }

                });
        },
        /**
         * @function get_all_kredi
         * @description Tüm kredileri yükler
         */
        get_all_kredi() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/kredi/k/0`)
                .then((response) => {
                    this.total_credits = response.data.length;
                });
        },
        /**
         * @function krediEkle
         * @description Kredi ekler
         * @param kredi
         */
        krediEkle(kredi) {

            if (kredi.kredi_son_tarih < new Date().toISOString().slice(0, 10)) {
                alert("Kredi son tarihi bugünden küçük olamaz.");
                return;
            }
            axios
                .post("http://127.0.0.1:5000/api/v1/kredi/", kredi)
                .then((response) => {
                    const kredi = response.data;
                    const musteri = useMusteriStore();
                    musteri.kredi_skor_guncelle(kredi["kredi_musteri_id"])
                    this.krediler.push(kredi);
                }).catch(error => {
                if (!error.response) {
                    // network error
                    this.net_error = true;
                    this.total_credits = 0;
                    console.log("Network Error");
                } else {
                    this.net_error = false;
                }

            });
            const hareket = useHareketStore()
            const {hareketEkle} = hareket;

            hareketEkle("Kredi Alımı", kredi.kredi_tutar, kredi.kredi_musteri_id)
        },
        /**
         * @function krediDuzenle
         * @description Kredi düzenler
         * @param kredi
         * @param kredi_id
         */
        async krediDuzenle(kredi, kredi_id) {
            axios.put('http://127.0.0.1:5000/api/v1/kredi/' + kredi_id, kredi).then((response) => {
                const kredi = response.data;
                this.yukle(this.sayfa = 0);
            })

        },
        /**
         * @function krediSil
         * @description Kredi siler
         * @param kredi
         */
        krediSil(kredi) {
            if (confirm("Krediyi silmek istediğinize emin misiniz?")) {
                console.log(kredi["id"]);
                axios.delete('http://127.0.0.1:5000/api/v1/kredi/' + kredi["id"]).then((response) => {
                    const kredi = response.data;
                    const musteri = useMusteriStore();
                    // console.log(kredi.silinen.kredi_musteri_id)
                    musteri.kredi_skor_guncelle(kredi.silinen.kredi_musteri_id)
                    this.yukle(this.sayfa=0);
                })
                const hareket = useHareketStore()
                const {hareketEkle} = hareket;
                hareketEkle("Kredi Ödenmesi", kredi.kredi_tutar, kredi.kredi_hesap_id)
                // console.log(this.total_credits)
                this.total_credits -= 1;
            }
        },
        /**
         * @function kredi_ode
         * @description Kredi ödemesi yapar
         * @param kredi
         */
        kredi_ode(kredi) {
            if (kredi.kredi_durum === "Ödendi") {
                alert("Kredi zaten ödenmiş.");
                return;
            }
            if (kredi.kredi_durum === "Pasif") {
                alert("Kredi pasif durumda.");
                return;
            }

            kredi.kredi_durum = "Ödendi";
            this.krediDuzenle(kredi, kredi.id).then(
                () => {
                    const musteri = useMusteriStore();
                    musteri.kredi_skor_guncelle(kredi.silinen.kredi_musteri_id)
                }
            )

        },
        /**
         * @function sonraki_sayfa
         * @description Sonraki sayfaya geçer
         */
        sonraki_sayfa() {
            if ((this.sayfa + 1) * this.adet >= this.total_credits) {
                this.at_end = true;
                return;
            }
            if (this.krediler.length === 0) {
                this.at_end = true;
                return;
            }
            if (this.krediler.length < 10) {
                this.at_end = true;
                return;
            }
            this.sayfa += 1;
            this.yukle(this.sayfa);
        },
        /**
         * @function onceki_sayfa
         * @description Önceki sayfaya geçer
         */
        onceki_sayfa() {
            if (this.krediler.length === 0) {
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
         * @description Kredileri ID'ye göre sıralar
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
