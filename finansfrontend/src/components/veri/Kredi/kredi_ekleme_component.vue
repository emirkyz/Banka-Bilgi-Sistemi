<script setup>
import {ref} from "vue";
import Error_component from "@/components/ortak/error_component.vue";
import {useKrediStore} from "@/stores/kredistore";
import {useMusteriStore} from "@/stores/musteristore";
import {useHesapStore} from "@/stores/hesapstore";

const onayKutusu = ref(false);
const musteriStore = useMusteriStore();
const krediStore = useKrediStore();
const hesapStore = useHesapStore();

musteriStore.init()
musteriStore.get_all_musteri();
krediStore.init();

hesapStore.init();
hesapStore.get_all_hesap();


const eklenecek_kredi = ref({
  kredi_hesap_id: "",
  kredi_musteri_id: "",
  kredi_son_tarih: "",
  kredi_faiz_orani: "",
  kredi_tutar: "",
});

function hesaba_ekle() {
  const tutar = eklenecek_kredi.value.kredi_tutar;
  const id = eklenecek_kredi.value.kredi_hesap_id;
  hesapStore.bakiye_arttir(id, tutar);
}

function kaydet() {
  hesaba_ekle();
  eklenecek_kredi.value.kredi_musteri_id = hesapStore.find_hesap_by_id(eklenecek_kredi.value.kredi_hesap_id);
  krediStore.krediEkle(eklenecek_kredi.value);
  eklenecek_kredi.value = {
    kredi_hesap_id: "",
    kredi_musteri_id: "",
    kredi_son_tarih: "",
    kredi_faiz_orani: "",
    kredi_tutar: "",
  };
}


// const canContinue = (eklenecek_sube.value.sube_adi === '' || eklenecek_sube.value.sube_adresi ==='' || eklenecek_sube.value.sube_tel ==='');

</script>

<template>
  <main class="main_comp flex-col middle-custom">
    <div class="flex flex-col w-full">
      <a class="font-medium text-2xl"> Kredi Ekleme Ekranı </a>
      <a>Lütfen aşağıdaki kutucuklara ilgili bilgileri giriniz.</a>

      <div class="input-area mt-5 w-full">

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fsubeid">Kredi Verilecek Hesabı Seçiniz</label>
          </div>
          <div class="input-area">
            <select v-model="eklenecek_kredi.kredi_hesap_id"
                    class="input-area py-4 bg-transparent w-full border border-black"
                    name="fsubeid">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <!--              <option v-for="musteri in musteriStore.musteriler" :value="musteri['id']"> {{musteri.id}} - {{ musteri.musteri_adi }} </option>-->
              <option v-for="hesap in hesapStore.hesaplar" :value="hesap['id']"> Hesap ID : {{ hesap.id }} /
                Müşteri : {{ musteriStore.find_musteri(hesap['hesap_musteri_id']) }}
              </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fadi">Kredi Faiz Oranı</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_kredi.kredi_faiz_orani"
                placeholder="Kredi Faiz Oranını Giriniz"
                type="number"/>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fsoyad">Kredi Son Tarihi Giriniz</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_kredi.kredi_son_tarih"
                placeholder="Kredi Son Tarihini Giriniz"
                type="date"
            />
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="ftelefon">Kredi Miktarı</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_kredi.kredi_tutar"
                placeholder="Kredi Miktarını Giriniz"
                type="number"
            />
          </div>
        </div>
        <div
            v-if="eklenecek_kredi.kredi_faiz_orani === '' || eklenecek_kredi.kredi_son_tarih ==='' || eklenecek_kredi.kredi_hesap_id ==='' || eklenecek_kredi.kredi_tutar ===''"
            class="mt-4">

          <error_component message="Lütfen Tüm Kutucukları Doldurun."></error_component>

          <!--          <button class="btn cursor-default">Kaydet</button>-->

        </div>
        <div
            v-if="eklenecek_kredi.kredi_faiz_orani !== '' && eklenecek_kredi.kredi_son_tarih !=='' && eklenecek_kredi.kredi_tutar !=='' && eklenecek_kredi.kredi_hesap_id !==''|| eklenecek_kredi.net_error===true"
            class="mt-4">

          <error_component v-if="krediStore.net_error ===true"
                           message="API Bağlantısı sağlanamadı. Kaydetme İşlemi Çalışmayabilir. Sayfayı Yenilemeyi Deneyin."></error_component>

          <button v-if="krediStore.net_error === false" class="btn" @click="onayKutusu=true">Kaydet</button>
        </div>
      </div>
      <teleport to="body">
        <div v-if="onayKutusu === true" class="modal" @click="onayKutusu=false">
          <div class="modal-content">
            <div class="modal-header">
              <h2>Onay</h2>
              <div class="cursor-pointer" @click="onayKutusu=false">X</div>
            </div>
            <div class="modal-body">
              <p>Kaydetmek istediğinizden emin misiniz?.</p>
            </div>
            <div class="modal-footer">
              <button class="buton olumlu" @click="onayKutusu=false; kaydet();">Kaydet</button>
              <button class="buton olumsuz" @click="onayKutusu=false">Kapat</button>
            </div>
          </div>
        </div>
      </teleport>


    </div>
  </main>
</template>

<style scoped>
.buton {
  color: var(--yazirengi);
  border: #161612 1px solid;
  background-color: var(--menu_arkaplan);
  padding: 7px 14px;
  margin: 7px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
}

.buton.olumlu:hover {
  background-color: forestgreen;
  color: var(--yazirengi);
  scale: 1.1;
}

.buton.olumsuz:hover {
  background-color: #f65e5e;
  color: var(--yazirengi);
  scale: 1.1;
}

.modal {
  display: flex; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
  justify-content: center;
  align-items: center;

}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  min-width: 30vw;
  z-index: 100;
}

.modal-header {
  font-size: 14pt;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label-area {
  display: block;
  height: 100%;

  padding: 10px;
}

#k_e {
  padding: 10px !important;
  margin: 2px !important;
}

input {
  background: var(--menu_arkaplan);
  width: 100%;
  padding: 10px;
  font-size: 24px;
  outline: grey solid thin;
}

input:focus {
  outline: black solid medium;
}

.input-row {
  margin-top: 20px;
}

button {
  transition: all 0.2s ease-in-out;
}
</style>
