<script setup>
import {useSubeStore} from "@/stores/subestore";
import {ref} from "vue";
import Error_component from "@/components/ortak/error_component.vue";

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
  <main class="main_comp flex-col middle-custom">
    <div class="flex flex-col w-full">
      <a class="font-medium text-2xl"> Şube Ekleme Ekranı </a>
      <a>Lütfen aşağıdaki kutucuklara ilgili bilgileri giriniz.</a>

      <div class="input-area mt-5 w-full">
        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fadi">Şube Adı</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_sube.sube_adi"
                placeholder="Şube Adını Giriniz"
                type="text"
            />
          </div>
        </div>
        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fsoyad">Şube Adresi</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_sube.sube_adresi"
                placeholder="Şube Adresini Giriniz"
                type="text"
            />
          </div>
        </div>
        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="ftelefon">Şube Telefonu</label>
          </div>
          <div class="input-area">
            <input
                v-model="eklenecek_sube.sube_tel"
                placeholder="Şube Telefonunu Giriniz"
                type="text"
            />
          </div>
        </div>

        <div v-if="eklenecek_sube.sube_adi === '' || eklenecek_sube.sube_adresi ==='' || eklenecek_sube.sube_tel ===''"
             class="mt-4">

          <error_component message="Lütfen Tüm Kutucukları Doldurun."></error_component>

          <!--          <button class="btn cursor-default">Kaydet</button>-->

        </div>
        <div
            v-if="eklenecek_sube.sube_adi !== '' && eklenecek_sube.sube_adresi !=='' && eklenecek_sube.sube_tel !=='' || subeStore.net_error===true"
            class="mt-4">

          <error_component v-if="subeStore.net_error ===true"
                           message="API Bağlantısı sağlanamadı. Kaydetme İşlemi Çalışmayabilir. Sayfayı Yenilemeyi Deneyin."></error_component>

          <button v-if="subeStore.net_error === false" class="btn" @click="kaydet">Kaydet</button>
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
