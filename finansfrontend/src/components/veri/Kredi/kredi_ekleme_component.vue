<script setup>
import {ref} from "vue";
import Error_component from "@/components/ortak/error_component.vue";
import {useKrediStore} from "@/stores/kredistore";
import {useMusteriStore} from "@/stores/musteristore";

const musteriStore = useMusteriStore();
const krediStore = useKrediStore();
musteriStore.yukle();
krediStore.yukle();
const eklenecek_kredi = ref({
  kredi_musteri_id: "",
  kredi_son_tarih: "",
  kredi_faiz_orani: "",
  kredi_tutar: "",
});

function kaydet() {
  console.log(eklenecek_kredi.value)
  krediStore.krediEkle(eklenecek_kredi.value);
  eklenecek_kredi.value = {
    kredi_musteri_id: "",
    kredi_son_tarih: "",
    kredi_faiz_orani: "",
    kredi_tutar: "",
  };
}

// const canContinue = (eklenecek_sube.value.sube_adi === '' || eklenecek_sube.value.sube_adresi ==='' || eklenecek_sube.value.sube_tel ==='');

</script>

<template>
  <main class="main_comp flex-col">
    <div class="flex flex-col w-full">
      <a class="font-medium text-2xl"> Kredi Ekleme Ekranı </a>
      <a>Lütfen aşağıdaki kutucuklara ilgili bilgileri giriniz.</a>

      <div class="input-area mt-5 w-full">

        <div class="input-row">
          <div class="label-area">
            <label for="fsubeid" class="text-xl">Kredi Verilecek Müşteri Seçiniz</label>
          </div>
          <div class="input-area">
            <select class="input-area py-4 bg-transparent w-full border border-black" name="fsubeid" v-model="eklenecek_kredi.kredi_musteri_id">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="musteri in musteriStore.musteriler" :value="musteri['id']"> {{musteri.id}} - {{ musteri.musteri_adi }} </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="fadi" class="text-xl">Kredi Faiz Oranı</label>
          </div>
          <div class="input-area">
            <input
                type="number"
                placeholder="Kredi Faiz Oranını Giriniz"
                v-model="eklenecek_kredi.kredi_faiz_orani"/>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="fsoyad" class="text-xl">Kredi Son Tarihi Giriniz</label>
          </div>
          <div class="input-area">
            <input
                type="date"
                placeholder="Kredi Son Tarihini Giriniz"
                v-model="eklenecek_kredi.kredi_son_tarih"
            />
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label for="ftelefon" class="text-xl">Kredi Miktarı</label>
          </div>
          <div class="input-area">
            <input
                type="number"
                placeholder="Kredi Miktarını Giriniz"
                v-model="eklenecek_kredi.kredi_tutar"
            />
          </div>
        </div>

<!--        <div class="input-row">-->
<!--          <div class="label-area">-->
<!--            <label for="fsoyad" class="text-xl">Müşteri İmza</label>-->
<!--          </div>-->
<!--          <div class="input-area">-->
<!--            <input-->
<!--                type="text"-->
<!--                placeholder="Müşteri İmzasını Giriniz"-->
<!--                v-model="eklenecek_musteri.musteri_imza"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->


        <div class="mt-4"
             v-if="eklenecek_kredi.kredi_faiz_orani === '' || eklenecek_kredi.kredi_son_tarih ==='' || eklenecek_kredi.kredi_musteri_id ==='' || eklenecek_kredi.kredi_tutar ===''">

          <error_component  message="Lütfen Tüm Kutucukları Doldurun."></error_component>

          <!--          <button class="btn cursor-default">Kaydet</button>-->

        </div>
        <div class="mt-4"
             v-if="eklenecek_kredi.kredi_faiz_orani !== '' && eklenecek_kredi.kredi_son_tarih !=='' && eklenecek_kredi.kredi_tutar !=='' && eklenecek_kredi.kredi_musteri_id !==''|| eklenecek_kredi.net_error===true">

          <error_component v-if="krediStore.net_error ===true"  message="API Bağlantısı sağlanamadı. Kaydetme İşlemi Çalışmayabilir. Sayfayı Yenilemeyi Deneyin."></error_component>

          <button class="btn" v-if="krediStore.net_error === false" @click="kaydet">Kaydet</button>
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
