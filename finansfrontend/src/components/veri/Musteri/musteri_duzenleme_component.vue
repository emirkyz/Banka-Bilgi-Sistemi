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

function iptal() {
  musteriStore.selectedMusteri = null;
  duzenlenecek_musteri.value = bos_musteri;
}
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
  <teleport to="body"  v-if="musteriStore.selectedMusteri !== null">
    <div class="orta pencere">
    <div class="menü flex flex-row">
      <div class="edit mx-2">
        <a class="mr-2 font-bold">{{ musteriStore.selectedMusteri['musteri_adi'] }}</a>
        <a>Müşterisi </a>
        <a>için Düzenleme Ekranı</a>
        <br>
        <br>
        <div class="input-area_1">

          <div class="input-row">
            <div class="label-area w-1/3">
              <label class="text-xl" for="fsubeid">Hesabın Bağlı Olduğu Şubeyi Seçiniz</label>
            </div>

            <div class="input-area_1">
              <select v-model="duzenlenecek_musteri.musteri_sube_id"
                      class="input-area  bg-transparent w-2/4 border border-black"
                      name="fsubeid">
                <option selected="selected" value="">Değiştirmek için seçim yapın</option>
                <option v-for="sube in subeStore.subeler" :value="sube['id']"> {{ sube.id }} - {{sube.sube_adi}}
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
              <input v-model="duzenlenecek_musteri.musteri_adi" :placeholder="musteriStore.selectedMusteri['musteri_adi']" type="text">
            </div>
          </div>

          <div class="edit-input-row">
            <div class="edit-label-area">
              <label for="fsoyad">Müşteri Soyad</label>
              <a class=" mx-2 font-light">({{ musteriStore.selectedMusteri['musteri_soyad'] }})</a>
            </div>
            <div class="edit-input-area">
              <input v-model="duzenlenecek_musteri.musteri_soyad" :placeholder="musteriStore.selectedMusteri['musteri_soyad']"
                     type="text">
            </div>
          </div>

          <div class="edit-input-row">
            <div class="edit-label-area">
              <label for="ftelefon">Müşteri TC</label>
              <a class=" mx-2 font-light">({{ musteriStore.selectedMusteri['musteri_tc'] }})</a>
            </div>
            <div class="edit-input-area">
              <input v-model="duzenlenecek_musteri['musteri_tc']" :placeholder="musteriStore.selectedMusteri['musteri_tc']" type="text">
            </div>
          </div>

          <div class="edit-input-row">
            <div class="edit-label-area">
              <label for="ftelefon">Müşteri İmza</label>
              <a class=" mx-2 font-light">({{ musteriStore.selectedMusteri['musteri_imza'] }})</a>
            </div>
            <div class="edit-input-area">
              <input v-model="duzenlenecek_musteri.musteri_imza" :placeholder="musteriStore.selectedMusteri['musteri_imza']"
                     type="text">
            </div>
          </div>


          <div
              v-if="duzenlenecek_musteri.musteri_adi !== '' && duzenlenecek_musteri.musteri_soyad !=='' && duzenlenecek_musteri.musteri_tc !=='' && duzenlenecek_musteri.musteri_imza !=='' && duzenlenecek_musteri.musteri_sube_id!=='' ">
            <button class="btn  my-4 p-2" @click="duzenle">
              Kaydet
            </button>

          </div>
          <div v-else
               class="mt-4">
            <error_component class="w-2/3" message="Lütfen Tüm Kutucukları Doldurun."></error_component>
          </div>
          <button class="btn exit my-4 p-2" @click="iptal">
            İptal
          </button>
        </div>
      </div>
    </div>
    </div>
  </teleport>
</template>

<style scoped>
.input-area_1 {
  width: 75vw;
}

.menü {
  position: fixed;
  height: fit-content;
  z-index: 1005;
  background: rgba(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.orta.pencere {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1005;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;


}

.edit {
  width: 50vw;
  height: 90vh;
  background: transparent;
  font-family: arial, serif;
  margin: 25px;
  font-size: 18px;
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
  margin: 0 10px;
}

.exit {
  position: absolute;
  right: 0;
  top: 0;
}
</style>