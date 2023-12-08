import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";

export const useMusteriStore = defineStore("musteri", {
    state: () => ({
        musteriler: [],
        selectedMusteri: null,
        id_order: "?sırala=ar_id",
        total_musteri: 0,
        sayfa: 0,
        adet: 10,
        at_end: false,
        net_error: false,
        // cached_sube : []
    }),
    actions: {
        init() {
            this.sayfa = 0;
            this.adet = 10;
            this.at_end = false;
            this.yukle();
        },
        yukle(sayfa = 0, siralama = this.id_order) {
            const loading = useLoadingState();
            loading.yuklemeyeBasla();
            this.selectedMusteri = null;
            axios.get(
                `http://127.0.0.1:5000/api/v1/musteri/s/${sayfa}/k/${this.adet}${siralama}`,
            )
                .then((response) => {
                    // if (response.data.length === 0) {
                    //     this.at_end = true;
                    //     this.sayfa -= 1;
                    //     this.subeler = this.cached_sube;
                    //     loading.yuklemeyiBitir();
                    //     return;
                    // }
                    // this.cached_sube = response.data;
                    if (response.status === 200) {
                        this.net_error = false;
                    }
                    this.at_end = false;
                    this.musteriler = response.data;
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
        get_all_musteri() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/musteri/k/100000000000`)
                .then((response) => {
                    this.total_musteri = response.data.length;
                });
        },
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
        musteriDuzenle(musteri, musteri_id) {
            axios.put('http://127.0.0.1:5000/api/v1/musteri/' + musteri_id, musteri).then((response) => {
                const musteri = response.data;
                console.log(musteri);
                this.yukle(this.sayfa = 0);
            })
        },
        musteriSil(musteri) {
            axios.delete('http://127.0.0.1:5000/api/v1/musteri/' + musteri["id"]).then((response) => {
                const musteri = response.data;
                console.log(musteri);
                this.yukle();
            })
            this.sayfa = 0;
            this.total_musteri -= 1;
        },
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
