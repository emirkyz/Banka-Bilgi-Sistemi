import {defineStore} from "pinia";
import axios from "axios";


export const useKrediStore = defineStore('kredi',
    {

        state: () => ({
            krediler: [],
            selectedCredit: null,
            id_order : "?sırala=ar_id",
            total_credits : 0,
        }),
        actions: {
            yukle(sayfa = 0,siralama = this.id_order) {

                this.selectedCredit = null;
                axios.get(`http://127.0.0.1:5000/api/v1/kredi/s/${sayfa}${siralama}`).then((response) => {
                    this.krediler = response.data;
                })
            },
            get_all_kredi(){
                axios.get(`http://127.0.0.1:5000/api/v1/kredi/k/100000000000`).then((response) => {
                    this.total_credits = response.data;

                })
            }

        }
    });