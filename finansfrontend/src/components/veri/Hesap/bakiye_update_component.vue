<script setup xmlns="http://www.w3.org/1999/html">

import Error_component from "@/components/ortak/error_component.vue";
import {useHesapStore} from "@/stores/hesapstore";
import {ref} from "vue";

const hesapStore = useHesapStore();
const eklenecek_bakiye = ref(0);
</script>

<template>
  <div class="flex flex-row">
    <div class="edit p-16 mx-2" v-if="hesapStore.bakiye_update !== null">
      <a class="mr-2 font-bold">{{ hesapStore.selectedHesap['id'] }}</a>
      <a>Hesap </a>
      <a>için Düzenleme Ekranı</a>
      <br>
      <br>
      <a class="mr-2 font-bold">Tutar: </a>


      <input class="input-arae" v-model="eklenecek_bakiye">

      <button
          class="btn exit my-4 p-2"
          @click="hesapStore.bakiye_arttir(hesapStore.selectedHesap.id, eklenecek_bakiye);eklenecek_bakiye=0"
      >
        Bakiye Ekle
      </button>
      <button
          class="btn exit my-4 p-2"
          @click="hesapStore.bakiye_azalt(hesapStore.selectedHesap.id, eklenecek_bakiye);eklenecek_bakiye=0"
      >
        Bakiye Azalt
      </button>
      <button class="btn exit my-4 p-2" @click="hesapStore.bakiye_update=null">
        İptal
      </button>
      <error_component v-if="hesapStore.not_enough===true" message='Hesabınızda Yeterli Bakiye Yok. Farklı miktar deneyiniz.'></error_component>

    </div>
  </div>
</template>

<style scoped>

</style>