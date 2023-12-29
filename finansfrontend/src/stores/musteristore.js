import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";
import {ref, toRaw} from "vue";


// export const useMusteriStore = defineStore("musteri",(context) => {
//     const musteriler = ref([]);
//     const selectedMusteri = ref(null);
//     const id_order = ref("?sırala=ar_id");
//     const total_musteri = ref(0);
//     const sayfa = ref(0);
//     const adet = ref(10);
//     const at_end = ref(false);
//     const net_error = ref(false);
//     const all_musteri_list = ref([]);
//     function init() {
//         sayfa.value = 0;
//         adet.value = 10;
//         at_end.value = false;
//
//     };
//     function yukle(sayfa.value = 0, siralama = id_order,adet.value= adet) {
//         const loading = useLoadingState();
//         loading.yuklemeyeBasla();
//         this.selectedMusteri = null;
//         axios.get(
//             `http://127.0.0.1:5000/api/v1/musteri/s/${sayfa}/k/${adet}${siralama}`,
//         )
//             .then((response) => {
//                 if (response.status === 200) {
//                     this.net_error = false;
//                 }
//                 this.at_end = false;
//                 this.musteriler = response.data;
//                 console.log(response.data)
//                 loading.yuklemeyiBitir();
//             })
//             .catch(error => {
//                 if (!error.response) {
//                     // network error
//                     this.net_error = true;
//                     this.total_musteri = 0;
//                     console.log("Network Error");
//                 } else {
//                     this.net_error = false;
//                 }
//             });
//     },
//     get_all_musteri() {
//         axios
//             .get(`http://127.0.0.1:5000/api/v1/musteri/k/100000000000${this.id_order}`)
//             .then((response) => {
//                 this.all_musteri_list = response.data;
//                 this.total_musteri = response.data.length;
//             });
//     },
//     musteriEkle(musteri) {
//         axios
//             .post("http://127.0.0.1:5000/api/v1/musteri/", musteri)
//             .then((response) => {
//                 const musteri = response.data;
//                 this.musteriler.push(musteri);
//             }).catch(error => {
//             if (!error.response) {
//                 // network error
//                 this.net_error = true;
//                 console.log("Network Error");
//             } else {
//                 this.net_error = false;
//             }
//         });
//     },
//     musteriDuzenle(musteri, musteri_id) {
//         axios.put('http://127.0.0.1:5000/api/v1/musteri/' + musteri_id, musteri).then((response) => {
//             const musteri = response.data;
//             console.log(musteri);
//             this.yukle(this.sayfa = 0);
//         })
//     },
//     musteriSil(musteri) {
//         if (confirm("Müşteriyi silmek istediğinize emin misiniz?")) {
//             if (musteri["musteri_total_kredi"] > 0) {
//                 alert(`Müşteriye ait ${musteri['musteri_total_kredi']} (ler) bulunmaktadır. Önce Kredileri siliniz.`)
//                 return;
//             }
//         }
//         axios.delete('http://127.0.0.1:5000/api/v1/musteri/' + musteri["id"]).then((response) => {
//             const musteri = response.data;
//             console.log(musteri);
//             this.yukle();
//         })
//         this.get_all_musteri();
//         this.sayfa = 0;
//         this.total_musteri -= 1;
//     },
//     find_musteri(id) {
//         for (let i = 0; i < this.all_musteri_list.length; i++) {
//             if (this.all_musteri_list[i]['id'] === id) {
//                 return (this.all_musteri_list[i]['musteri_adi'] + " " + this.all_musteri_list[i]['musteri_soyad'])
//             }
//         }
//     },
//     kredi_skor_guncelle(musteri_id) {
//         axios.get(`http://127.0.0.1:5000/api/v1/score/${musteri_id}`).then((response) => {
//             const musteri = response.data;
//             console.log(musteri);
//             this.yukle();
//         })
//     },
//     sonraki_sayfa() {
//         // console.log((this.sayfa+1) * this.adet)
//         // console.log(this.total_sube.length)
//         if ((this.sayfa + 1) * this.adet >= this.total_musteri) {
//             this.at_end = true;
//             return;
//         }
//         if (this.musteriler.length === 0) {
//             this.at_end = true
//             return;
//         }
//         if (this.musteriler.length < 10) {
//             this.at_end = true;
//             return;
//         }
//         this.at_end = false;
//         this.sayfa += 1;
//         this.yukle(this.sayfa);
//     },
//     onceki_sayfa() {
//         if (this.musteriler.length === 0) {
//             return;
//         }
//         if (this.sayfa === 0) {
//             return;
//         }
//         this.at_end = false;
//         this.sayfa -= 1;
//         this.yukle(this.sayfa);
//     },
//     order_by_id() {
//         if (this.id_order === "?sırala=ar_id") {
//             this.sayfa = 0;
//             this.id_order = "?sırala=az_id";
//             this.yukle();
//         } else {
//             this.sayfa = 0;
//             this.id_order = "?sırala=ar_id";
//             this.yukle();
//         }
//     },
//
//
//
// });





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
        init() {
            this.sayfa = 0;
            this.adet = 10;
            this.at_end = false;
            this.yukle();
        },
        async yukle(sayfa = 0, siralama = this.id_order,adet=this.adet) {
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
        get_all_musteri() {
            axios
                .get(`http://127.0.0.1:5000/api/v1/musteri/k/0${this.id_order}`)
                .then((response) => {
                    this.all_musteri_list = response.data;
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
        find_musteri(id) {
            for (let i = 0; i < this.all_musteri_list.length; i++) {
                if (this.all_musteri_list[i]['id'] === id) {
                    return (this.all_musteri_list[i]['musteri_adi'] + " " + this.all_musteri_list[i]['musteri_soyad'])
                }
            }
        },
        kredi_skor_guncelle(musteri_id) {
            axios.get(`http://127.0.0.1:5000/api/v1/score/${musteri_id}`).then((response) => {
                const musteri = response.data;
                console.log(musteri);
                this.yukle();
            })
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
