<script setup>
import {ref} from "vue";
import Api_error from "@/components/ortak/error_component.vue";
import Error_component from "@/components/ortak/error_component.vue";
import {useMusteriStore} from "@/stores/musteristore";
import {useSubeStore} from "@/stores/subestore";
import {useHesapStore} from "@/stores/hesapstore";
import {useFaturaStore} from "@/stores/faturastore";

const subeStore = useSubeStore();
const hesapStore = useHesapStore();
const musteriStore = useMusteriStore();
const faturaStore = useFaturaStore();

faturaStore.init();

hesapStore.init();
subeStore.yukle();
musteriStore.get_all_musteri()
const para_birimleri=[
  "Dolar",
  "Euro",
  "TL",
]


const eklenecek_hesap = ref({
  hesap_AcanSube: "",
  hesap_ParaBirim: "",
  hesap_bakiye: "0",
  hesap_musteri_id: "",

});

function kaydet() {
  hesapStore.hesapEkle(eklenecek_hesap.value);
  eklenecek_hesap.value = {
    hesap_AcanSube: "",
    hesap_ParaBirim: "",
    hesap_bakiye: "0",
    hesap_musteri_id: "",
  };
}

function fatura_filtre_on_musteri() {
  const musteri_id = 1
  faturaStore.yukle(0,`?filtre=fatura_musteri_id=${musteri_id}`)

}

// const canContinue = (eklenecek_sube.value.sube_adi === '' || eklenecek_sube.value.sube_adresi ==='' || eklenecek_sube.value.sube_tel ==='');

</script>

<template>
  <main class="main_comp flex-col middle-custom">
    <div class="flex flex-col w-full">
      <a class="font-medium text-2xl"> Fatura Ödeme Ekranı </a>
      <a>Lütfen aşağıdaki kutucuklara ilgili bilgileri giriniz.</a>

      <div class="input-area mt-5 w-full">

        <div class="input-row">
          <div class="label-area">
            <label for="fsubeid" class="text-xl">Hesabın Bağlı Olduğu Şubeyi Seçiniz</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black"  name="fsubeid" v-model="eklenecek_hesap.hesap_AcanSube" @change="hesap_filtre_on_musteri">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="sube in subeStore.subeler" :value="sube['id']"> {{sube.id}} - {{ sube.sube_adi }} </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="fadi" class="text-xl">Müşteriye Ait Faturalar</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black" name="fsubeid" v-model="eklenecek_hesap.hesap_ParaBirim">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="para in para_birimleri"> {{para}} </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="fsubeid" class="text-xl">Hesabın Bağlı Olduğu Müşteriyi Seçiniz</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black" name="fsubeid" v-model="eklenecek_hesap.hesap_musteri_id">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="musteri in musteriStore.musteriler"  :value="musteri['id']">
                {{musteri["musteri_adi"]}} </option>
            </select>
          </div>
        </div>
        <!--        <div class="input-row">-->
        <!--          <div class="label-area">-->
        <!--            <label for="fsoyad" class="text-xl">Hesap Bakiye</label>-->
        <!--          </div>-->
        <!--          <div class="input-area">-->
        <!--            <input-->
        <!--                type="text"-->
        <!--                placeholder="Müşteri Soyadını Giriniz"-->
        <!--                v-model="eklenecek_musteri.musteri_soyad"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->




        <div class="mt-4"
             v-if="eklenecek_hesap.hesap_ParaBirim === '' || eklenecek_hesap.hesap_AcanSube ==='' || eklenecek_hesap.hesap_musteri_id ===''">

          <error_component  message="Lütfen Tüm Kutucukları Doldurun."></error_component>

          <!--          <button class="btn cursor-default">Kaydet</button>-->

        </div>
        <div class="mt-4"
             v-if="eklenecek_hesap.hesap_ParaBirim !== '' && eklenecek_hesap.hesap_AcanSube !=='' && eklenecek_hesap.hesap_musteri_id !==''|| hesapStore.net_error===true">

          <error_component v-if="hesapStore.net_error ===true"  message="API Bağlantısı sağlanamadı. Kaydetme İşlemi Çalışmayabilir. Sayfayı Yenilemeyi Deneyin."></error_component>

          <button class="btn" v-if="hesapStore.net_error === false" @click="kaydet">Kaydet</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.label-area {
  display: block;
  height: 100%;

  padding: 10px;
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
