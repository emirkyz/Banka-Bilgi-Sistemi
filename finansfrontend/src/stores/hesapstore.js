import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";

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
            this.selectedHesap = null;
            axios.get(
                `http://127.0.0.1:5000/api/v1/hesap/s/${sayfa}/k/${this.adet}${siralama}`,
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
        get_all_hesap() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/hesap/k/100000000000`)
                .then((response) => {
                    this.total_hesap = response.data.length;
                });
        },
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
        hesapDuzenle(hesap, hesap_id) {
            axios.put('http://127.0.0.1:5000/api/v1/hesap/' + hesap_id, hesap).then((response) => {
                const hesap = response.data;
                console.log(hesap);
                this.yukle(this.sayfa = 0);
            })
        },
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
        sonraki_sayfa() {
            // console.log((this.sayfa+1) * this.adet)
            // console.log(this.total_sube.length)
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
