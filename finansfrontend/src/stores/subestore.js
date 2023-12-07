import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";

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
            this.selectedSube = null;
            axios.get(
                `http://127.0.0.1:5000/api/v1/sube/s/${sayfa}/k/${this.adet}${siralama}`,
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
        get_all_sube() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/sube/k/100000000000`)
                .then((response) => {
                    this.total_sube = response.data.length;
                });
        },
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
        subeDuzenle(sube, sube_id) {
            axios.put('http://127.0.0.1:5000/api/v1/sube/' + sube_id, sube).then((response) => {
                const sube = response.data;
                console.log(sube);
                this.yukle(this.sayfa = 0);
            })
        },
        subeSil(sube) {
            axios.delete('http://127.0.0.1:5000/api/v1/sube/' + sube["id"]).then((response) => {
                const sube = response.data;
                console.log(sube);
                this.yukle();
            })
            this.sayfa = 0;
            console.log(this.total_sube)
            this.total_sube -= 1;
        },
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
        },
    },
});
