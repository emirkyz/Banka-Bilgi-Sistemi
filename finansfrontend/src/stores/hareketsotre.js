import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";
import {ref} from "vue";

/**
 * @module HareketStore
 * @description Hesap Hareketleri ile ilgili işlemlerin yapıldığı store
 *
 * @description Hesap Hareketleri ile ilgili store'da kullanılan değişkenler
 * @property {Hareket} hareket
 * @property {Hareket} selected_hareket
 * @property {Hareket} hareketler
 * @property {string} id_order
 * @property {number} total_hareket
 * @property {number} sayfa
 * @property {number} adet
 * @property {boolean} at_end
 * @property {boolean} net_error
 * @returns {{hareket, hareketler, id_order: string, sayfa: number, net_error: boolean, selected_hareket: null, total_hareket: number, at_end: boolean, adet: number}}
 *
 */
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

    /**
     * @function init
     * @description Bu store'un init fonksiyonu. Varsayılan değerleri atar çağrılır.
     */
    function init() {
        sayfa.value = 0;
        adet.value= 10;
        at_end.value = false;
        get_all_hareket();
        yukle();
    }

    /**
     * @function yukle
     * @description Hesap Hareketleri listesini yükler
     * @param sayfa
     * @param siralama
     */
    function yukle(sayfa = 0, siralama = id_order.value) {
        axios.get(
            `http://127.0.0.1:5000/api/v1/hesaphareket/s/${sayfa}/k/${adet.value}${siralama}`)
            .then((response) => {
                if (response.status === 200) {
                    net_error.value = false;
                }
                at_end.value = false;
                hareketler.value = response.data;
                console.log(hareketler.value);
                loading.yuklemeyiBitir();
            })
    }

    /**
     * @function get_all_hareket
     * @description Tüm hesap hareketlerini yükler
     */
    function get_all_hareket() {
        axios
            .get(`http://127.0.0.1:5000/api/v1/hesaphareket/k/0`)
            .then((response) => {
                // hareketler.value = response.data;
                total_hareket.value = response.data.length;
            });
    }

    /**
     * @function hareketEkle
     * @description Müşteriye ID'sine göre Hesap Hareketi ekler.
     * @param tur
     * @param miktar
     * @param hesap_id
     */
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

    /**
     * @function hareketSil
     * @description Hesap Hareketi siler
     * @param hareket
     */
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

    /**
     * @function order_by_id
     * @description Hesap Hareketlerini ID'ye göre sıralar
     */
    function order_by_id() {
        if (id_order.value === "?sırala=ar_id") {
            sayfa.value = 0;
            id_order.value = "?sırala=az_id";
            yukle();
        } else {
            sayfa.value = 0;
            id_order.value = "?sırala=ar_id";
            yukle();
        }
    }

    /**
     * @function sonraki_sayfa
     * @description Sonraki sayfaya geçer
     */
    function sonraki_sayfa() {
        if ((sayfa.value + 1) * adet.value >= total_hareket.value) {

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

    /**
     * @function onceki_sayfa
     * @description Önceki sayfaya geçer
     */
    function onceki_sayfa() {
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