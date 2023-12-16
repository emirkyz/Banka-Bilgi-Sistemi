<script setup>
import {useLoadingState} from "@/stores/loading_state";
import Error_component from "@/components/ortak/error_component.vue";
import {useHesapStore} from "@/stores/hesapstore";
import Bakiye_update_component from "@/components/veri/Hesap/bakiye_update_component.vue";
import {useMusteriStore} from "@/stores/musteristore";
import {useFaturaStore} from "@/stores/faturastore";

const faturaStore = useFaturaStore();
const loading = useLoadingState();
const musteri_store = useMusteriStore();


faturaStore.init();
faturaStore.get_all_fatura();
musteri_store.get_all_musteri();


</script>

<template>
  <main>
    <div class="sube-content main_comp">
      <div id="sube" class="font-bold h-100vh pl-4 my-1 rounded-2xl py-2">
        <h1 class="text-xl">Faturalar</h1>
        <a class="text-xl transition-all"
        >{{ faturaStore.sayfa + 1 }}. sayfada
          {{ faturaStore.faturalar.length }} Tane kayıt gösteriliyor. Toplam
          {{ faturaStore.total_fatura }} tane kayıt mevcut.</a>
      </div>
      <hr class="style"/>

      <error_component
          v-if="faturaStore.net_error === true && faturaStore.total_fatura ===0"
          :store="faturaStore"
          message="API Bağlantısı sağlanamadı. Sayfayı Yenilemeyi Deneyin."></error_component>

      <div id="error_component" v-if="faturaStore.total_fatura === 0 && faturaStore.net_error===false">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
             role="alert">
          <strong class="font-bold">Hata!</strong>
          <span class="mx-2 block sm:inline"
          >Kayıt Bulunamadı. Kayıt eklenmesi gerekiyor.</span>
          <router-link to="/fatura/ekle">
            <a class="font-medium ">Fatura Eklemek için Tıklayınız</a>
          </router-link>
        </div>
      </div>

      <div v-if="loading.loading" class="font-bold loader"></div>
      <!--    <div id="table-limiter" class=" h-[10px]">-->
      <table class="h-[2px] table-fixed">
        <thead>
        <tr>
          <th
              v-if="faturaStore.id_order === '?sırala=ar_id'"
              class="cursor-pointer w-[90px]"
              @click="faturaStore.order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-green-500">(asc)</a>
          </th>
          <th
              v-if="faturaStore.id_order === '?sırala=az_id'"
              class="cursor-pointer w-[90px]"
              @click="faturaStore.order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-red-500">(desc)</a>
          </th>
          <th>Müşteri ID</th>
          <th>Fatura Miktarı</th>
          <th>Fatura Türü</th>
          <th>Fatura Durumu</th>
          <th class="w-[200px]">
            <a class="-ml-8">logo</a>
            <button
                @click="
                  faturaStore.yukle((faturaStore.sayfa = 0));
                  faturaStore.get_all_fatura();
                  faturaStore.at_end = false;
                "
                class="btn white right hover:bg-teal-300 hover:text-black"
            >
              Yenile
            </button>
          </th>
        </tr>

        </thead>
        <tr
            v-for="fatura in faturaStore.faturalar"
            :key="fatura"
            v-bind:class="{ 'opacity-0': loading.loading }"
        >
          <td>{{ fatura['id'] }}</td>
          <td>{{ musteri_store.find_musteri(fatura['fatura_musteri_id']) }}</td>
          <td>{{ fatura["fatura_miktar"] + " TL" }}</td>
          <td>{{ fatura["fatura_turu"] }}</td>
          <td>{{ fatura["fatura_durum"] }}</td>

          <td class="right">
            <button class="btn content-center" @click="faturaStore.selectedHesap=fatura">Düzenle</button>
            <!--            <button @click="console.log(musteri)">a</button>-->
            <button class="btn-sil  content-center" @click="faturaStore.faturaSil(fatura)">Sil</button>
            <br>
            <button class="btn-kredi-ekle content-center"
                    @click="faturaStore.bakiye_update=fatura ; faturaStore.selectedHesap=fatura;">Bakiye ekle
            </button>
          </td>
        </tr>
      </table>
      <br class="space"/>

      <br class="space"/>
      <!--    </div>-->

      <button @click="faturaStore.onceki_sayfa()" class="btn">
        <a> Önceki</a>
      </button>
      <button
          @click="faturaStore.sonraki_sayfa()"
          v-bind:class="{ 'bg-gray-600': faturaStore.at_end }"
          class="btn bg:var(--menu_arkaplan)"
      >
        Sonraki
      </button>

      <!--      <musteri_duzenleme_component></musteri_duzenleme_component>-->
<!--      <bakiye_update_component></bakiye_update_component>-->

    </div>

  </main>
</template>

<style scoped>
.btn-kredi-ekle {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.kredi-content {
  min-height: 100vh;
}

button {
  transition: all 300ms ease-out;
}

.extra {
  font-size: 12px;
  display: none;
}

td:hover .extra {
  display: inline;
}

.loader {
  position: relative;
  bottom: 0;
  border: 5px solid #d4d4d4; /* Light grey */
  border-top: 5px solid #7c7b7b; /* Blue */
  border-radius: 50%;
  margin: -30px 0 0 -30px;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  animation: spin 400ms linear infinite;
}

.table-fixed {
  width: 100%;
}

.fixedElement {
  background: #bbbbbb;
  position: sticky;
  top: 0;
  z-index: 10;
}

thead tr:nth-child(1) th {
  background: var(--thead_arkaplan);
  position: sticky;
  top: 80px;

}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
