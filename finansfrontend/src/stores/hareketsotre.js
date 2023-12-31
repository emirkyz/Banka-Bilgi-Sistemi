import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";
import {ref} from "vue";


export const useHareketStore = defineStore("hareket", () => {
    const hareket = ref({
        hareket_musteri_id: 0,
        hareketMiktar: 0,
        hareket_turu: "",
    });
    const selected_hareket = ref(null);
    const hareketler = ref([]);
    const id_order = ref("?sırala=ar_id");
    const total_hareket = ref(0);
    const sayfa = ref(0);
    const adet = ref(10);
    const at_end = ref(false);
    const net_error = ref(false);
    const loading = useLoadingState();
    loading.yuklemeyeBasla();


    function init() {
        this.sayfa = 0;
        this.adet = 10;
        this.at_end = false;
        get_all_hareket();
        yukle();
    }

    function yukle(sayfa = 0, siralama = id_order.value) {
        axios.get(
            `http://127.0.0.1:5000/api/v1/hesaphareket/s/${sayfa}/k/${adet.value}${siralama}`)
            .then((response) => {
                if (response.status === 200) {
                    net_error.value = false;
                }
                at_end.value = false;
                hareketler.value = response.data;
                loading.yuklemeyiBitir();
            })
    }

    function get_all_hareket() {
        axios
            .get(`http://127.0.0.1:5000/api/v1/hesaphareket/k/0`)
            .then((response) => {
                hareketler.value = response.data;
                total_hareket.value = response.data.length;
            });
    }

    function hareketEkle(tur, miktar, hesap_id) {
        hareket.value.hareket_turu = tur;
        hareket.value.hareketMiktar = miktar;
        hareket.value.hareket_musteri_id = hesap_id;
        console.log(hareket.value);
        axios.post(
            `http://127.0.0.1:5000/api/v1/hesaphareket/`, hareket.value)
            .then((response) => {
                if (response.status === 200) {
                    net_error.value = false;
                }
                at_end.value = false;
                yukle();
            })
    }

    function hareketSil(hareket) {
        axios.delete(
            `http://127.0.0.1:5000/api/v1/hesaphareket/` + hareket.id)
            .then((response) => {
                if (response.status === 200) {
                    net_error.value = false;
                }
                at_end.value = false;
                yukle();
            })
    }

    function order_by_id() {
        if (this.id_order === "?sırala=ar_id") {
            sayfa.value = 0;
            id_order.value = "?sırala=az_id";
            yukle();
        } else {
            sayfa.value = 0;
            id_order.value = "?sırala=ar_id";
            yukle();
        }
    }

    function onceki_sayfa() {
        if ((sayfa + 1) * adet >= total_hareket) {

            at_end.value = true;
            return;
        }
        if (hareketler.value.length === 0) {
            at_end.value = true
            return;
        }
        if (hareketler.value.length < 10) {
            at_end.value = true;
            return;
        }
        at_end.value = false;
        sayfa.value += 1;
        yukle(sayfa.value);
    }

    function sonraki_sayfa() {
        if (hareketler.value.length === 0) {
            return;
        }
        if (sayfa.value === 0) {
            return;
        }
        at_end.value = false;
        sayfa.value -= 1;
        yukle(sayfa.value);
    }

    return {
        init,
        selected_hareket,
        hareket,
        hareketEkle,
        hareketSil,
        yukle,
        sayfa,
        adet,
        hareketler,
        total_hareket,
        net_error,
        at_end,
        id_order,
        order_by_id,
        sonraki_sayfa,
        onceki_sayfa,
    }
});