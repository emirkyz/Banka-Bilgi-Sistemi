import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";
import {ref, toRaw} from "vue";

/**
 * @module MusteriStore
 * @description Müşteriler ile ilgili işlemlerin yapıldığı store
 * @property {Musteri} musteriler
 * @property {Musteri} selectedMusteri
 * @property {string} id_order
 * @property {number} total_musteri
 * @property {number} sayfa
 * @property {number} adet
 * @property {boolean} at_end
 * @property {boolean} net_error
 * @property {Musteri} all_musteri_list
 * @returns {{musteriler, id_order: string, sayfa: number, net_error: boolean, selectedMusteri: null, total_musteri: number, at_end: boolean, all_musteri_list, adet: number}}
 *
 */
export const useMusteriStore = defineStore("musteri", {

    state: () => {
        return {
            musteriler: ref([]),
            selectedMusteri: null,
            id_order: "?sırala=ar_id",
            total_musteri: 0,
            sayfa: 0,
            adet: 10,
            at_end: false,
            net_error: false,
            all_musteri_list: [],
            // cached_sube : []
        };
    },
    getters: {
        get_musteriler(state) {
            return toRaw(state.musteriler);
        }
    },
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
         * @description Müşteri listesini yükler
         * @param sayfa
         * @param siralama
         * @param adet
         * @returns {Promise<void>}
         */
        async yukle(sayfa = 0, siralama = this.id_order, adet = this.adet) {
            const loading = useLoadingState();
            loading.yuklemeyeBasla();
            this.selectedMusteri = null;
            await axios.get(
                `http://127.0.0.1:5000/api/v1/musteri/s/${sayfa}/k/${adet}${siralama}`,
            )
                .then((response) => {
                    if (response.status === 200) {
                        this.net_error = false;
                    }
                    this.at_end = false;
                    this.musteriler = toRaw(response.data);
                    // console.log(response.data)
                    loading.yuklemeyiBitir();
                })
                .catch(error => {
                    if (!error.response) {
                        // network error
                        this.net_error = true;
                        this.total_musteri = 0;
                        console.log("Network Error");

                    } else {
                        this.net_error = false;
                    }
                });

        },
        /**
         * @function get_all_musteri
         * @description Tüm müşterileri yükler
         */
        get_all_musteri() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/musteri/k/0${this.id_order}`)
                .then((response) => {
                    this.all_musteri_list = response.data;
                    this.total_musteri = response.data.length;
                });
        },
        /**
         * @function musteriEkle
         * @description Müşteri ekler
         * @param musteri
         */
        musteriEkle(musteri) {
            axios
                .post("http://127.0.0.1:5000/api/v1/musteri/", musteri)
                .then((response) => {
                    const musteri = response.data;
                    this.musteriler.push(musteri);
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
         * @function musteriDuzenle
         * @description Müşteri düzenler
         * @param musteri
         * @param musteri_id
         */
        musteriDuzenle(musteri, musteri_id) {
            axios.put('http://127.0.0.1:5000/api/v1/musteri/' + musteri_id, musteri).then((response) => {
                const musteri = response.data;
                console.log(musteri);
                this.yukle(this.sayfa = 0);
            })
        },
        /**
         * @function musteriSil
         * @description Müşteri siler
         * @param musteri
         */
        musteriSil(musteri) {
            if (confirm("Müşteriyi silmek istediğinize emin misiniz?")) {
                if (musteri["musteri_total_kredi"] > 0) {
                    alert(`Müşteriye ait ${musteri['musteri_total_kredi']} (ler) bulunmaktadır. Önce Kredileri siliniz.`)
                    return;
                }
            }
            axios.delete('http://127.0.0.1:5000/api/v1/musteri/' + musteri["id"]).then((response) => {
                const musteri = response.data;
                console.log(musteri);
                this.yukle();

            })
            this.get_all_musteri();
            this.sayfa = 0;
            this.total_musteri -= 1;
        },
        /**
         * @function find_musteri
         * @description Müşteri bulur
         * @param id
         * @returns {string|undefined}
         */
        find_musteri(id) {
            for (let i = 0; i < this.all_musteri_list.length; i++) {
                if (this.all_musteri_list[i]['id'] === id) {
                    return (this.all_musteri_list[i]['musteri_adi'] + " " + this.all_musteri_list[i]['musteri_soyad'] + " ID : " + this.all_musteri_list[i]['id'])
                }
            }
        },
        /**
         * @function kredi_skor_guncelle
         * @description Müşteriye ait Kredi skorunu günceller
         * @param musteri_id
         */
        kredi_skor_guncelle(musteri_id) {
            axios.get(`http://127.0.0.1:5000/api/v1/score/${musteri_id}`).then((response) => {
                const musteri = response.data;
                console.log(musteri);
                this.yukle();
            })
        },
        /**
         * @function onceki_sayfa
         * @description Sonraki sayfayı yükler
         */
        sonraki_sayfa() {
            // console.log((this.sayfa+1) * this.adet)
            // console.log(this.total_sube.length)
            if ((this.sayfa + 1) * this.adet >= this.total_musteri) {

                this.at_end = true;
                return;
            }
            if (this.musteriler.length === 0) {
                this.at_end = true
                return;
            }
            if (this.musteriler.length < 10) {
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
            if (this.musteriler.length === 0) {
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
