<script setup>
import {useKrediStore} from "@/stores/kredistore";
import {useLoadingState} from "@/stores/loading_state";

const kredi_store = useKrediStore();
const loading = useLoadingState()

kredi_store.init()
kredi_store.get_all_kredi()
</script>

<template>
  <main>
    <div class="kredi-content main_comp">
      <div
          id="kisi"
          class="font-bold h-100vh pl-4 my-1 rounded-2xl py-2 "
      >
        <h1 class="text-xl">Krediler</h1>
        <a class="text-xl transition-all">{{ kredi_store.sayfa + 1 }}. sayfada {{ kredi_store.krediler.length }} Tane
          kayıt
          gösteriliyor. Toplam {{ kredi_store.total_credits.length }} tane kayıt mevcut.</a>
      </div>
      <hr class="style"/>

      <div id="error_component" v-if="kredi_store.krediler.length === 0">
        <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
            role="alert"
        >
          <strong class="font-bold">Hata!</strong>
          <span class="mx-2 block sm:inline"
          >Kayıt Bulunamadı. Kayıt eklenmesi gerekiyor.</span
          >
        </div>
      </div>

      <!--    <div id="table-limiter" class=" h-[10px]">-->
      <table class="h-[2px] table-fixed ">
        <thead>
        <tr>
          <th v-if="kredi_store.id_order==='?sırala=ar_id'" class="cursor-pointer" @click="kredi_store.order_by_id()">
            <a>ID</a>
            <a class="font-bold text-green-500">(asc)</a></th>
          <th v-if="kredi_store.id_order==='?sırala=az_id'" class="cursor-pointer" @click="kredi_store.order_by_id()">
            <a>ID</a>
            <a class="font-bold text-red-500">(desc)</a></th>
          <th>Kredi Durum</th>
          <th>Müşteri ID</th>
          <th>Kredi Son Tarih</th>
          <th>Kredi Faiz Oranı</th>

          <th>
            <a class="-ml-8">logo</a>
            <button @click="kredi_store.yukle(kredi_store.sayfa=0);kredi_store.get_all_kredi();kredi_store.at_end=false"

                    class="btn white right hover:bg-teal-300 hover:text-black">Yenile
            </button>
          </th>
        </tr>
        </thead>
        <tr v-for="kredi in kredi_store.krediler" :key="kredi" v-bind:class="{ 'opacity-0': loading.loading }">
          <td>{{ kredi["id"] }}</td>
          <td v-if="kredi['kredi_durum'] ==='Aktif'" class="text-green-500 font-bold">{{ kredi["kredi_durum"] }}</td>
          <td v-if="kredi['kredi_durum'] ==='Pasif'" class="text-red-500">{{ kredi["kredi_durum"] }}</td>

          <td>{{ kredi["kredi_musteri_id"] }}</td>
          <td>{{ new Date(kredi["kredi_son_tarih"]).toLocaleDateString() }}</td>
          <td>{{ kredi["kredi_faiz_orani"] }}</td>
          <td class="right">
            <button class="btn content-center">Düzenle</button>
          </td>
        </tr>

      </table>
      <br class="space"/>

      <br class="space"/>
      <!--    </div>-->

      <button @click="kredi_store.onceki_sayfa()" class="btn "><a> Önceki</a></button>
      <button @click="kredi_store.sonraki_sayfa()" v-bind:class="{ 'bg-gray-600': kredi_store.at_end }"
              class="btn bg:var(--menu_arkaplan)">
        Sonraki
      </button>
      <div v-if="loading.loading" class="font-bold loader"></div>
    </div>
  </main>
</template>

<style scoped>

button {
  transition: all 300ms ease-out;
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