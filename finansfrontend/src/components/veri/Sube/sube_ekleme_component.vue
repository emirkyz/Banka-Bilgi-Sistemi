<script setup>
import {useSubeStore} from "@/stores/subestore";
import {ref} from "vue";

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

// const canContinue = (eklenecek_sube.value.sube_adi === '' || eklenecek_sube.value.sube_adresi ==='' || eklenecek_sube.value.sube_tel ==='');

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
        <div class="mt-4"
             v-if="eklenecek_sube.sube_adi === '' || eklenecek_sube.sube_adresi ==='' || eklenecek_sube.sube_tel ===''">
          <div id="error_component">
            <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
                role="alert">
              <strong class="font-bold">Hata!</strong>
              <span class="mx-2 block sm:inline"
              >Lütfen Tüm Kutucukları Doldurun.</span>
            </div>
          </div>
          <!--          <button class="btn cursor-default">Kaydet</button>-->

        </div>
        <div class="mt-4"
             v-if="eklenecek_sube.sube_adi !== '' && eklenecek_sube.sube_adresi !=='' && eklenecek_sube.sube_tel !=='' && subeStore.net_error===false">
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
