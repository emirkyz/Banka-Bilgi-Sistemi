<script setup>
import {ref} from "vue";
import Error_component from "@/components/ortak/error_component.vue";
import {useKrediStore} from "@/stores/kredistore";
import {useMusteriStore} from "@/stores/musteristore";
import {useHesapStore} from "@/stores/hesapstore";
import {useFaturaStore} from "@/stores/faturastore";

const onayKutusu = ref(false);
const musteriStore = useMusteriStore();
const hesapStore = useHesapStore();
const faturaStore = useFaturaStore();

musteriStore.init()
musteriStore.get_all_musteri();

hesapStore.init();
hesapStore.get_all_hesap();


const fatura_turleri=[
  "Elektrik",
  "Su",
  "Doğalgaz",
  "Telefon",
  "İnternet",
  "Diğer",
]

const eklenecek_fatura = ref({
  fatura_musteri_id: "",
  fatura_miktar: "",
  fatura_turu: "",
});
function hesaba_ekle(){
  const tutar = eklenecek_fatura.value.kredi_tutar;
  const id = eklenecek_fatura.value.kredi_hesap_id;
  hesapStore.bakiye_arttir(id,tutar);
}
function kaydet() {
  // hesaba_ekle();
  // eklenecek_fatura.value.kredi_musteri_id = hesapStore.find_hesap_by_id(eklenecek_fatura.value.kredi_hesap_id);
  faturaStore.faturaEkle(eklenecek_fatura.value);

  eklenecek_fatura.value = {
    fatura_musteri_id: "",
    fatura_miktar: "",
    fatura_turu: "",
  };
}



// const canContinue = (eklenecek_sube.value.sube_adi === '' || eklenecek_sube.value.sube_adresi ==='' || eklenecek_sube.value.sube_tel ==='');

</script>

<template>
  <main class="main_comp flex-col middle-custom">
    <div class="flex flex-col w-full">
      <a class="font-medium text-2xl"> Fatura Ekleme Ekranı </a>
      <a>Lütfen aşağıdaki kutucuklara ilgili bilgileri giriniz.</a>

      <div class="input-area mt-5 w-full">

        <div class="input-row">
          <div class="label-area">
            <label for="fsubeid" class="text-xl">Fatura Kesilecek Müşteriyi Seçiniz</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black" name="fsubeid" v-model="eklenecek_fatura.fatura_musteri_id">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
<!--              <option v-for="musteri in musteriStore.musteriler" :value="musteri['id']"> {{musteri.id}} - {{ musteri.musteri_adi }} </option>-->
              <option v-for="musteri in musteriStore.musteriler" :value="musteri['id']"> {{musteri.id}} - {{ musteri.musteri_adi }} </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="fadi" class="text-xl">Fatura Miktarı</label>
          </div>
          <div class="input-area">
            <input
                type="number"
                placeholder="Fatura Miktarını Giriniz"
                v-model="eklenecek_fatura.fatura_miktar"/>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="fadi" class="text-xl">Fatura Türü</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black" name="fsubeid" v-model="eklenecek_fatura.fatura_turu">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="fatura in fatura_turleri"> {{fatura}} </option>
            </select>
          </div>
        </div>

        <div class="mt-4"
             v-if="eklenecek_fatura.fatura_turu === '' || eklenecek_fatura.fatura_miktar ==='' || eklenecek_fatura.fatura_musteri_id ===''">

          <error_component  message="Lütfen Tüm Kutucukları Doldurun."></error_component>

          <!--          <button class="btn cursor-default">Kaydet</button>-->

        </div>
        <div class="mt-4"
             v-if="eklenecek_fatura.fatura_turu !== '' && eklenecek_fatura.fatura_miktar !=='' && eklenecek_fatura.fatura_musteri_id !=='' || eklenecek_fatura.net_error===true">

          <error_component v-if="faturaStore.net_error ===true"  message="API Bağlantısı sağlanamadı. Kaydetme İşlemi Çalışmayabilir. Sayfayı Yenilemeyi Deneyin."></error_component>

          <button class="btn" v-if="faturaStore.net_error === false" @click="onayKutusu=true">Kaydet</button>
        </div>
      </div>

      <teleport to="body">
        <div class="modal" v-if="onayKutusu === true" @click="onayKutusu=false">
          <div class="modal-content">
            <div class="modal-header">
              <h2>Onay</h2>
              <div class="cursor-pointer" @click="onayKutusu=false">X</div>
            </div>
            <div class="modal-body">
              <p>Kaydetmek istediğinizden emin misiniz?.</p>
            </div>
            <div class="modal-footer">
              <button class="buton olumlu" @click="onayKutusu=false; kaydet();" >Kaydet</button>
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
.modal{
  display: flex; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
  justify-content: center;
  align-items: center;

}
.modal-content{
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  min-width: 30vw;
  z-index: 100;
}
.modal-header{
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
#k_e{
  padding:10px !important;
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
