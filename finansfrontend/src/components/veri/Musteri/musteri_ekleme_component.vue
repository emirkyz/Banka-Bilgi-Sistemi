<script setup>
import {ref} from "vue";
import Error_component from "@/components/ortak/error_component.vue";
import {useMusteriStore} from "@/stores/musteristore";
import {useSubeStore} from "@/stores/subestore";

const subeStore = useSubeStore();
const musteriStore = useMusteriStore();

musteriStore.yukle();
subeStore.yukle();

const eklenecek_musteri = ref({
  musteri_adi: "",
  musteri_soyad: "",
  musteri_tc: "",
  musteri_sube_id: "",
  musteri_imza: "",
});

function kaydet() {
  musteriStore.musteriEkle(eklenecek_musteri.value);
  eklenecek_musteri.value = {
    musteri_adi: "",
    musteri_soyad: "",
    musteri_tc: "",
    musteri_sube_id: "",
    musteri_imza: "",
  };
}

// const canContinue = (eklenecek_sube.value.sube_adi === '' || eklenecek_sube.value.sube_adresi ==='' || eklenecek_sube.value.sube_tel ==='');

</script>

<template>
  <main class="main_comp flex-col middle-custom">
    <div class="flex flex-col w-full">
      <a class="font-medium text-2xl"> Müşteri Ekleme Ekranı </a>
      <a>Lütfen aşağıdaki kutucuklara ilgili bilgileri giriniz.</a>

      <div class="input-area mt-5 w-full">

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fsubeid">Müşterinin Bağlı Olduğu Şubeyi Seçiniz</label>
          </div>
          <div class="input-area">
            <select v-model="eklenecek_musteri.musteri_sube_id"
                    class="input-area py-4 bg-transparent w-full border border-black"
                    name="fsubeid">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="sube in subeStore.subeler" :value="sube['id']"> {{ sube.id }} - {{
                  sube.sube_adi
                }}
              </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fadi">Müşteri Adı</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_musteri.musteri_adi"
                placeholder="Müşteri Adını Giriniz"
                type="text"
            />
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fsoyad">Müşteri Soyad</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_musteri.musteri_soyad"
                placeholder="Müşteri Soyadını Giriniz"
                type="text"
            />
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="ftelefon">Müşteri TC</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_musteri.musteri_tc"
                placeholder="Müşteri TC'sini Giriniz"
                type="text"
            />
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fsoyad">Müşteri İmza</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_musteri.musteri_imza"
                placeholder="Müşteri İmzasını Giriniz"
                type="text"
            />
          </div>
        </div>


        <div
            v-if="eklenecek_musteri.musteri_adi === '' || eklenecek_musteri.musteri_soyad ==='' || eklenecek_musteri.musteri_tc ==='' || eklenecek_musteri.musteri_imza ==='' || eklenecek_musteri.musteri_sube_id===''"
            class="mt-4">

          <error_component message="Lütfen Tüm Kutucukları Doldurun."></error_component>

          <!--          <button class="btn cursor-default">Kaydet</button>-->

        </div>
        <div
            v-if="eklenecek_musteri.musteri_adi !== '' && eklenecek_musteri.musteri_soyad !=='' && eklenecek_musteri.musteri_tc !==''  && eklenecek_musteri.musteri_imza !=='' || eklenecek_musteri.net_error===true"
            class="mt-4">

          <error_component v-if="musteriStore.net_error ===true"
                           message="API Bağlantısı sağlanamadı. Kaydetme İşlemi Çalışmayabilir. Sayfayı Yenilemeyi Deneyin."></error_component>

          <button v-if="musteriStore.net_error === false" class="btn" @click="kaydet">Kaydet</button>
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
