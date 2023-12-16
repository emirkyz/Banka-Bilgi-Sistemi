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
        bakiye_update: null,
        not_enough: false,
        all_hesap_list: [],
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
                    this.all_hesap_list = response.data;
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
        bakiye_arttir(hesap, miktar) {
            axios.get(`http://127.0.0.1:5000/api/v1/hesap/bakiye/e/${hesap}/${miktar}`).then((response) => {
                const hesap = response.data;
                this.bakiye_update = null;
                console.log(hesap);
                this.yukle()
            })
        },
        bakiye_azalt(hesap, miktar) {
            axios.get(`http://127.0.0.1:5000/api/v1/hesap/bakiye/c/${hesap}/${miktar}`).then((response) => {
                const hesap = response.data;
                if (hesap['hata']) {
                    this.not_enough = true;
                    return;
                }
                this.bakiye_update = null;
                this.not_enough = null;
                this.yukle()
            })
        },
        find_hesap_by_id(id) {

            for (let i = 0; i < this.all_hesap_list.length; i++) {
                if (this.all_hesap_list[i]['id'] === id) {
                    return (this.all_hesap_list[i]['hesap_musteri_id'])
                }
            }
        },
        get_all_hesap_by_musteri(siralama) {
            axios
                .get(`http://127.0.0.1:5000/api/v1/hesap/k/100000000000${siralama}`)
                .then((response) => {
                    this.all_hesap_list = response.data;
                    this.total_hesap = response.data.length;
                });
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
