<script setup>
import {useSubeStore} from "@/stores/subestore";
import {ref} from "vue";

const subeStore = useSubeStore();
const duzenlenecek_sube = ref({
  sube_adi: "",
  sube_adresi: "",
  sube_tel: "",
});

function duzenle() {
  subeStore.subeDuzenle(duzenlenecek_sube.value, subeStore.selectedSube["id"]);
  duzenlenecek_sube.value = {
    sube_adi: "",
    sube_adresi: "",
    sube_tel: "",
  }
}
</script>

<template>
  <div class="flex flex-row">
    <div class="edit p-16 mx-2" v-if="subeStore.selectedSube !== null">
      <a class="mr-2 font-bold">{{ subeStore.selectedSube['sube_adi'] }}</a>
      <a>Şubesi </a>
      <a>için Düzenleme Ekranı</a>
      <br>
      <div class="input-area">
        <div class="edit-input-row">

          <div class="edit-label-area">
            <label for="fadi">Şube Adı</label>
            <a class=" mx-2 font-light">({{ subeStore.selectedSube['sube_adi'] }})</a>
          </div>
          <div class="edit-input-area">
            <input type="text" placeholder="Yeni Şube Adını Giriniz" v-model="duzenlenecek_sube.sube_adi">
          </div>
        </div>

        <div class="edit-input-row">
          <div class="edit-label-area">
            <label for="fsoyad">Şube Adresi</label>
            <a class=" mx-2 font-light">({{ subeStore.selectedSube['sube_adresi'] }})</a>
          </div>
          <div class="edit-input-area">
            <input type="text" placeholder="Yeni Şube Adresini Giriniz" v-model="duzenlenecek_sube.sube_adresi">
          </div>
        </div>

        <div class="edit-input-row">
          <div class="edit-label-area">
            <label for="ftelefon">Şube Telefonu</label>
            <a class=" mx-2 font-light">({{ subeStore.selectedSube['sube_tel'] }})</a>
          </div>
          <div class="edit-input-area">
            <input type="text"  placeholder="Yeni Şube Telefonunu Giriniz" v-model="duzenlenecek_sube.sube_tel" >
          </div>
        </div>

        <div>
          <button class="btn  my-4 p-2" @click="duzenle">
            Kaydet
          </button>
          <button class="btn exit my-4 p-2" @click="subeStore.selectedSube=null">
            İptal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit {
  width: 100%;
  height: fit-content;


  background: transparent ;
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
.edit-input-row{
  margin: 0px 10px;
}
.exit{
  background: #342b2b;
  color: #ffffff;
}
</style>