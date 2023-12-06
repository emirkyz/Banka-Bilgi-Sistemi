<script setup>
import { useSubeStore } from "@/stores/subestore";
import { ref } from "vue";

const subeStore = useSubeStore();
subeStore.yukle();

const eklenecek_sube = ref({
  sube_adi: "",
  sube_adresi: "",
  sube_tel: "",
});

function kaydet() {
  subeStore.subeEkle(eklenecek_sube.value);
  eklenecek_sube.value = {
    sube_adi: "",
    sube_adresi: "",
    sube_tel: "",
  };
}
</script>

<template>
  <main class="main_comp flex-col">
    <div class="flex flex-col w-full">
      <a class="font-medium text-2xl"> Şube Ekleme Ekranı </a>
      <a>Lütfen aşağıdaki kutucuklara ilgili bilgileri giriniz.</a>

      <div class="input-area mt-5 w-full">
        <div class="input-row">
          <div class="label-area">
            <label for="fadi" class="text-xl">Şube Adı</label>
          </div>
          <div class="input-area">
            <input
              type="text"
              placeholder="Şube Adını Giriniz"
              v-model="eklenecek_sube.sube_adi"
            />
          </div>
        </div>
        <div class="input-row">
          <div class="label-area">
            <label for="fsoyad" class="text-xl">Şube Adresi</label>
          </div>
          <div class="input-area">
            <input
              type="text"
              placeholder="Şube Adresini Giriniz"
              v-model="eklenecek_sube.sube_adresi"
            />
          </div>
        </div>
        <div class="input-row">
          <div class="label-area">
            <label for="ftelefon" class="text-xl">Şube Telefonu</label>
          </div>
          <div class="input-area">
            <input
              type="text"
              placeholder="Şube Telefonunu Giriniz"
              v-model="eklenecek_sube.sube_tel"
            />
          </div>
        </div>
        <div class="mt-4">
          <button class="btn" @click="kaydet">Kaydet</button>
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
.input-area {
  border: 1px solid #e5e7eb;
}
input {
  width: 100%;
  padding: 10px;
  border: none;
  font-size: 24px;
}
.input-row {
  margin-top: 20px;
}
</style>
