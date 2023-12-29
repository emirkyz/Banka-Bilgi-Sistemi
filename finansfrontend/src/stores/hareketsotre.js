import {defineStore} from "pinia";
import axios from "axios";
import {useLoadingState} from "@/stores/loading_state";
import {ref} from "vue";


export const useHareketStore = defineStore("hareket", () => {
    const hareket = ref({
        hareket_hesap_id: 0,
        hareketMiktar: 0,
        hareket_turu: "",
    });
    const hareketler = ref([]);
    const id_order = ref("?sırala=ar_id");
    const total_hareket = ref(0);
    const sayfa = ref(0);
    const adet = ref(10);
    const at_end = ref(false);
    const net_error = ref(false);
    const loading = useLoadingState();
    loading.yuklemeyeBasla();

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

    function hareketEkle(tur, miktar, hesap_id) {

        hareket.value.hareket_turu = tur;
        hareket.value.hareketMiktar = miktar;
        hareket.value.hareket_hesap_id = hesap_id;
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
    return {
        hareket,
        hareketEkle,
        hareketSil,
    }
});