<script setup>
import {useLoadingState} from "@/stores/loading_state";
import Error_component from "@/components/ortak/error_component.vue";
import {useMusteriStore} from "@/stores/musteristore";
import {useHareketStore} from "@/stores/hareketsotre";
import {storeToRefs} from "pinia";


const loading = useLoadingState();
const musteri_store = useMusteriStore();

const hareketStore = useHareketStore()
const {init, yukle, order_by_id, hareketSil, sonraki_sayfa, onceki_sayfa} = hareketStore;
init();
const {
  selected_hareket,
  sayfa,
  adet,
  hareketler,
  total_hareket,
  net_error,
  at_end,
  id_order
} = storeToRefs(hareketStore);
musteri_store.get_all_musteri();


</script>

<template>
  <main>
    <div class="sube-content main_comp">
      <div id="sube" class="font-bold h-100vh pl-4 my-1 rounded-2xl py-2">
        <h1 class="text-xl">Hesap Hareketleri</h1>
        <a class="text-xl transition-all"
        >{{ sayfa + 1 }}. sayfada
          {{ hareketler.length }} Tane kayıt gösteriliyor. Toplam
          {{ total_hareket.valueOf() }} tane kayıt mevcut.</a>
      </div>
      <hr class="style"/>

      <error_component
          v-if="net_error === true && total_hareket ===0"
          :store="hareketStore"
          message="API Bağlantısı sağlanamadı. Sayfayı Yenilemeyi Deneyin."></error_component>

      <div v-if="hareketler.length === 0 && net_error===false" id="error_component">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
             role="alert">
          <strong class="font-bold">Hata!</strong>
          <span class="mx-2 block sm:inline"
          >Kayıt Bulunamadı. Kayıt eklenmesi gerekiyor.</span>
        </div>
      </div>

      <div v-if="loading.loading" class="font-bold loader"></div>
      <!--    <div id="table-limiter" class=" h-[10px]">-->
      <table class="h-[2px] table-fixed">
        <thead>
        <tr>
          <th
              v-if="id_order === '?sırala=ar_id'"
              class="cursor-pointer w-[90px]"
              @click="order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-green-500">(asc)</a>
          </th>
          <th
              v-if="id_order === '?sırala=az_id'"
              class="cursor-pointer w-[90px]"
              @click="order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-red-500">(desc)</a>
          </th>
          <th>Hareket Türü</th>
          <th>Hareket Tarihi</th>
          <th>İşlemi Gerçekleştiren Müşteri</th>
          <th>Hareket Miktarı</th>
          <th class="w-[200px]">
            <a class="-ml-8">logo</a>
            <button
                class="btn white right hover:bg-teal-300 hover:text-black"
                @click="
                  init();
                  at_end = false;
                "
            >
              Yenile
            </button>
          </th>
        </tr>

        </thead>
        <tr
            v-for="hareket in hareketler"
            :key="hesap"
            v-bind:class="{ 'opacity-0': loading.loading }"
        >
          <td>{{ hareket['id'] }}</td>
          <td>{{ hareket['hareket_turu'] }}</td>
          <td>{{ new Date(hareket['olusturulma_tarihi']).toLocaleDateString("tr-tr") }}</td>
          <td>{{ musteri_store.find_musteri(hareket['hareket_musteri_id'])   }}</td>
          <td>{{ hareket["hareketMiktar"] }} TL</td>

          <td class="right">
            <button class="btn-sil  content-center" @click="hareketSil(hareket);">Sil</button>
            <br>
          </td>
        </tr>
      </table>
      <br class="space"/>

      <br class="space"/>
      <!--    </div>-->

      <button class="btn" @click="onceki_sayfa()">
        <a> Önceki</a>
      </button>
      <button
          class="btn bg:var(--menu_arkaplan)"
          v-bind:class="{ 'bg-gray-600': at_end }"
          @click="sonraki_sayfa()"
      >
        Sonraki
      </button>
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
  z-index: 10;
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
