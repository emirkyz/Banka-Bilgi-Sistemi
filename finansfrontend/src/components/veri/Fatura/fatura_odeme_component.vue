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

const bakiye_error = ref(false);

const odenecek_fatura = ref({
  fatura_musteri_id: "",
  hesap_id: "",
  fatura: "",
});


function fatura_ode() { // TODO : Fix this. it still shows as paid even if balance is not enough
  const hesap_id = odenecek_fatura.value.hesap_id.valueOf();
  const miktar = odenecek_fatura.value.fatura.fatura_miktar;
  console.log(hesapStore.get_enough_state)
  console.log(hesapStore.bakiye_azalt(hesap_id, miktar));
  if (hesapStore.get_enough_state === true) {
    console.log("ne bilim yoktir");
  } else if(hesapStore.get_enough_state === false) {
    faturaStore.faturaOdeme(odenecek_fatura.value.fatura.id);
    console.log("fatura ödendi lan ");
    odenecek_fatura.value = {
      fatura_musteri_id: "",
      hesap_id: "",
      fatura: "",
    };

  }

  // faturaStore.faturaOdeme(odenecek_fatura.value.fatura.id);
  // console.log("fatura ödendi");
  // odenecek_fatura.value = {
  //   fatura_musteri_id: "",
  //   hesap_id: "",
  //   fatura: "",
  // };
}

function fatura_filtre_on_musteri() {
  const option = document.getElementsByName('fsubeid')[0].value;
  if (option === '') {
    faturaStore.all_fatura_list = [];
    document.getElementsByName('ffaturaid').item(0).selectedIndex = 0;
    return
  }
  const musteri_id = odenecek_fatura.value.fatura_musteri_id.valueOf();
  faturaStore.get_all_fatura_by_musteri(`?filtre=fatura_musteri_id=${musteri_id}`)
  hesapStore.get_all_hesap_by_musteri(`?filtre=hesap_musteri_id=${musteri_id}`)
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
            <label for="fsubeid" class="text-xl">Hesabın Bağlı Olduğu Müşteriyi Seçiniz</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black"  name="fsubeid" v-model="odenecek_fatura.fatura_musteri_id" @change="fatura_filtre_on_musteri">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="musteri in musteriStore.all_musteri_list" :value="musteri['id']"> {{musteri.id}} - {{ musteri.musteri_adi }} </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="fadi" class="text-xl">Müşteriye Ait Faturalar</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black" name="ffaturaid" v-model="odenecek_fatura.fatura">
              <option selected="selected" value="">Fatura Seçin.</option>
              <option v-for="fatura in faturaStore.all_fatura_list" :value="fatura"> {{fatura.id}} - {{fatura.fatura_turu}} - {{fatura.fatura_miktar}} TL </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="fsubeid" class="text-xl">Ücretin Alınacağı Hesabı seçiniz.</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black" name="fsubeid" v-model="odenecek_fatura.hesap_id">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="hesap in hesapStore.all_hesap_list"  :value="hesap.id">
                {{hesap["id"]}} - {{hesap['hesap_bakiye']}} {{hesap.hesap_ParaBirim}} </option>
            </select>
          </div>
        </div>
        <error_component v-if="hesapStore.not_enough===true"  message='Hesabınızda Yeterli Bakiye Yok. Farklı Hesap deneyiniz.'></error_component>

        <button class="btn" @click="fatura_ode">Fatura Öde</button>


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




<!--        <div class="mt-4"-->
<!--             v-if="eklenecek_hesap.hesap_ParaBirim === '' || eklenecek_hesap.hesap_AcanSube ==='' || eklenecek_hesap.hesap_musteri_id ===''">-->

<!--          <error_component  message="Lütfen Tüm Kutucukları Doldurun."></error_component>-->

<!--          &lt;!&ndash;          <button class="btn cursor-default">Kaydet</button>&ndash;&gt;-->

<!--        </div>-->
<!--        <div class="mt-4"-->
<!--             v-if="eklenecek_hesap.hesap_ParaBirim !== '' && eklenecek_hesap.hesap_AcanSube !=='' && eklenecek_hesap.hesap_musteri_id !==''|| hesapStore.net_error===true">-->

<!--          <error_component v-if="hesapStore.net_error ===true"  message="API Bağlantısı sağlanamadı. Kaydetme İşlemi Çalışmayabilir. Sayfayı Yenilemeyi Deneyin."></error_component>-->

<!--          <button class="btn" v-if="hesapStore.net_error === false" @click="kaydet">Kaydet</button>-->
<!--        </div>-->
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
