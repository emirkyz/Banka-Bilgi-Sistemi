<script setup>
import {useSubeStore} from "@/stores/subestore";
import {ref} from "vue";
import Error_component from "@/components/ortak/error_component.vue";

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
    <div v-if="subeStore.selectedSube !== null" class="edit p-16 mx-2">
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
            <input v-model="duzenlenecek_sube.sube_adi" placeholder="Yeni Şube Adını Giriniz" type="text">
          </div>
        </div>

        <div class="edit-input-row">
          <div class="edit-label-area">
            <label for="fsoyad">Şube Adresi</label>
            <a class=" mx-2 font-light">({{ subeStore.selectedSube['sube_adresi'] }})</a>
          </div>
          <div class="edit-input-area">
            <input v-model="duzenlenecek_sube.sube_adresi" placeholder="Yeni Şube Adresini Giriniz" type="text">
          </div>
        </div>

        <div class="edit-input-row">
          <div class="edit-label-area">
            <label for="ftelefon">Şube Telefonu</label>
            <a class=" mx-2 font-light">({{ subeStore.selectedSube['sube_tel'] }})</a>
          </div>
          <div class="edit-input-area">
            <input v-model="duzenlenecek_sube.sube_tel" placeholder="Yeni Şube Telefonunu Giriniz" type="text">
          </div>
        </div>


        <div
            v-if="duzenlenecek_sube.sube_adi!=='' && duzenlenecek_sube.sube_adresi!=='' && duzenlenecek_sube.sube_tel!==''">

          <button class="btn  my-4 p-2" @click="duzenle">
            Kaydet
          </button>
          <button class="btn exit my-4 p-2" @click="subeStore.selectedSube=null">
            İptal
          </button>
        </div>
        <div v-else>
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
  margin: 0 10px;
}

.exit {
  background: #342b2b;
  color: #ffffff;
}
</style>