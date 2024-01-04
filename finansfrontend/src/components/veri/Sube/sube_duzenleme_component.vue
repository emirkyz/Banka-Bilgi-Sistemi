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

function iptal() {
  subeStore.selectedSube = null;
  duzenlenecek_sube.value = {
    sube_adi: "",
    sube_adresi: "",
    sube_tel: "",

  }
}
</script>

<template>
  <teleport to="body" v-if="subeStore.selectedSube !== null">
    <div class="orta pencere">
      <div class="menü flex flex-row">
        <div class="edit">
          <a class="mr-2 font-bold">{{ subeStore.selectedSube['sube_adi'] }}</a>
          <a>Şubesi </a>
          <a>için Düzenleme Ekranı</a>
          <br>
          <div class="input-area_1 p-4">
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

              <button class="btn  mt-4 p-2" @click="duzenle">
                Kaydet
              </button>

            </div>
            <div v-else>
              <error_component class="w-2/3" message="Lütfen Tüm Kutucukları Doldurun."></error_component>
            </div>
            <button class="btn exit p-2" @click="iptal">
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
  height: fit-content;


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
  margin: 0px;
}

.exit {
  background: #342b2b;
  color: #ffffff;
  position: absolute;
  right: 0;
  top: 0;
}
</style>