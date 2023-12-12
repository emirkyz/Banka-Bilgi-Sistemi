<script setup>
import {ref} from "vue";
import {useMusteriStore} from "@/stores/musteristore";
import {useSubeStore} from "@/stores/subestore";
import Error_component from "@/components/ortak/error_component.vue";

const subeStore = useSubeStore();
subeStore.yukle()
const musteriStore = useMusteriStore();

const bos_musteri = {
  musteri_adi: "",
  musteri_soyad: "",
  musteri_tc: "",
  musteri_sube_id: "",
  musteri_imza: "",
};
const duzenlenecek_musteri = ref({
  musteri_adi: "",
  musteri_soyad: "",
  musteri_tc: "",
  musteri_sube_id: "",
  musteri_imza: "",
});

function duzenle() {
  musteriStore.musteriDuzenle(duzenlenecek_musteri.value, musteriStore.selectedMusteri["id"]);
  duzenlenecek_musteri.value = {
    musteri_adi: "",
    musteri_soyad: "",
    musteri_tc: "",
    musteri_sube_id: "",
    musteri_imza: "",
  }
}
</script>

<template>
  <div class="flex flex-row">
    <div class="edit p-16 mx-2" v-if="musteriStore.selectedMusteri !== null">
      <a class="mr-2 font-bold">{{ musteriStore.selectedMusteri['musteri_adi'] }}</a>
      <a>Müşterisi </a>
      <a>için Düzenleme Ekranı</a>
      <br>
      <br>
      <div class="input-area">

        <div class="input-row">
          <div class="label-area w-1/3">
            <label for="fsubeid" class="text-xl">Hesabın Bağlı Olduğu Şubeyi Seçiniz</label>
          </div>

          <div class="input-area">
            <select class="input-area  bg-transparent w-2/4 border border-black" name="fsubeid"
                    v-model="duzenlenecek_musteri.musteri_sube_id">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="sube in subeStore.subeler" :value="sube['id']"> {{ sube.id }} - {{
                  sube.sube_adi
                }}
              </option>
            </select>
          </div>
        </div>


        <div class="edit-input-row">
          <div class="edit-label-area">
            <label for="fadi">Müşteri Adı</label>
            <a class=" mx-2 font-light">({{ musteriStore.selectedMusteri['musteri_adi'] }})</a>
          </div>
          <div class="edit-input-area">
            <input type="text" placeholder="Yeni Müşteri Adını Giriniz" v-model="duzenlenecek_musteri.musteri_adi">
          </div>
        </div>

        <div class="edit-input-row">
          <div class="edit-label-area">
            <label for="fsoyad">Müşteri Soyad</label>
            <a class=" mx-2 font-light">({{ musteriStore.selectedMusteri['musteri_soyad'] }})</a>
          </div>
          <div class="edit-input-area">
            <input type="text" placeholder="Yeni Müşteri Soyadını Giriniz" v-model="duzenlenecek_musteri.musteri_soyad">
          </div>
        </div>

        <div class="edit-input-row">
          <div class="edit-label-area">
            <label for="ftelefon">Müşteri TC</label>
            <a class=" mx-2 font-light">({{ musteriStore.selectedMusteri['musteri_tc'] }})</a>
          </div>
          <div class="edit-input-area">
            <input type="text" placeholder="Yeni Müşteri TC'sini Giriniz" v-model="duzenlenecek_musteri.musteri_tc">
          </div>
        </div>

        <div class="edit-input-row">
          <div class="edit-label-area">
            <label for="ftelefon">Müşteri İmza</label>
            <a class=" mx-2 font-light">({{ musteriStore.selectedMusteri['musteri_imza'] }})</a>
          </div>
          <div class="edit-input-area">
            <input type="text" placeholder="Yeni Müşteri İmzasını Giriniz" v-model="duzenlenecek_musteri.musteri_imza">
          </div>
        </div>


        <div
            v-if="duzenlenecek_musteri.musteri_adi !== '' && duzenlenecek_musteri.musteri_soyad !=='' && duzenlenecek_musteri.musteri_tc !=='' && duzenlenecek_musteri.musteri_imza !=='' && duzenlenecek_musteri.musteri_sube_id!=='' ">
          <button class="btn  my-4 p-2" @click="duzenle">
            Kaydet
          </button>
          <button class="btn exit my-4 p-2" @click="musteriStore.selectedMusteri=null">
            İptal
          </button>
        </div>
        <div class="mt-4"
             v-else>
          <error_component class="w-2/3" message="Lütfen Tüm Kutucukları Doldurun."></error_component>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit {
  width: 100%;
  height: fit-content;


  background: transparent;
  font-family: arial, serif;
  margin: 25px;
  font-size: 18px;
  outline: solid 1px black;
  z-index: 1006;
}

input {
  background: var(--menu_arkaplan);
  width: 100%;
  padding: 10px;
  font-size: 16px;
  outline: grey solid thin;
}

input:focus {
  outline: black solid medium;
}

.edit-label-area {
  width: 100%;
  margin-top: 20px;
}

.edit-input-area {
  width: 65%;
}

.edit-input-row {
  margin: 0px 10px;
}

.exit {
  background: #342b2b;
  color: #ffffff;
}
</style>