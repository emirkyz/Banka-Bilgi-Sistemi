<script setup>
import {useLoadingState} from "@/stores/loading_state";
import Error_component from "@/components/ortak/error_component.vue";
import {useHesapStore} from "@/stores/hesapstore";
import Bakiye_update_component from "@/components/veri/Hesap/bakiye_update_component.vue";
import {useMusteriStore} from "@/stores/musteristore";

const hesap_store = useHesapStore();
const loading = useLoadingState();
const musteri_store = useMusteriStore();

hesap_store.init();
hesap_store.get_all_hesap();

musteri_store.get_all_musteri();


</script>

<template>
  <main>
    <div class="sube-content main_comp">
      <div id="sube" class="font-bold h-100vh pl-4 my-1 rounded-2xl py-2">
        <h1 class="text-xl">Hesaplar</h1>
        <a class="text-xl transition-all"
        >{{ hesap_store.sayfa + 1 }}. sayfada
          {{ hesap_store.hesaplar.length }} Tane kayıt gösteriliyor. Toplam
          {{ hesap_store.total_hesap }} tane kayıt mevcut.</a>
      </div>
      <hr class="style"/>

      <error_component
          v-if="hesap_store.net_error === true && hesap_store.total_hesap ===0"
          :store="hesap_store"
          message="API Bağlantısı sağlanamadı. Sayfayı Yenilemeyi Deneyin."></error_component>

      <div v-if="hesap_store.total_hesap === 0 && hesap_store.net_error===false" id="error_component">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
             role="alert">
          <strong class="font-bold">Hata!</strong>
          <span class="mx-2 block sm:inline"
          >Kayıt Bulunamadı. Kayıt eklenmesi gerekiyor.</span>
          <router-link to="/hesap/ekle">
            <a class="font-medium ">Hesap Eklemek için Tıklayınız</a>
          </router-link>
        </div>
      </div>

      <div v-if="loading.loading" class="font-bold loader"></div>
      <!--    <div id="table-limiter" class=" h-[10px]">-->
      <table class="h-[2px] table-fixed">
        <thead>
        <tr>
          <th
              v-if="hesap_store.id_order === '?sırala=ar_id'"
              class="cursor-pointer w-[90px]"
              @click="hesap_store.order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-green-500">(asc)</a>
          </th>
          <th
              v-if="hesap_store.id_order === '?sırala=az_id'"
              class="cursor-pointer w-[90px]"
              @click="hesap_store.order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-red-500">(desc)</a>
          </th>
          <th>Hesap Sahibi</th>
          <th>Kayıtlı Şube ID</th>
          <th>Para Birimi</th>
          <th>Bakiye</th>
          <th class="w-[200px]">
            <a class="-ml-8">logo</a>
            <button
                class="btn white right hover:bg-teal-300 hover:text-black"
                @click="
                  hesap_store.yukle((hesap_store.sayfa = 0));
                  hesap_store.get_all_hesap();
                  hesap_store.at_end = false;
                "
            >
              Yenile
            </button>
          </th>
        </tr>

        </thead>
        <tr
            v-for="hesap in hesap_store.hesaplar"
            :key="hesap"
            v-bind:class="{ 'opacity-0': loading.loading }"
        >
          <td>{{ hesap['id'] }}</td>
          <td>{{ musteri_store.find_musteri(hesap['hesap_musteri_id']) }}</td>
          <td>{{ hesap["hesap_AcanSube"] }}</td>
          <td>{{ hesap["hesap_ParaBirim"] }}</td>
          <td>{{ hesap["hesap_bakiye"] + " " + hesap['hesap_ParaBirim'] }}</td>

          <td class="right">
            <button class="btn content-center" @click="hesap_store.selectedHesap=hesap">Düzenle</button>
            <!--            <button @click="console.log(musteri)">a</button>-->
            <button class="btn-sil  content-center" @click="hesap_store.hesapSil(hesap)">Sil</button>
            <br>
            <button class="btn-kredi-ekle content-center"
                    @click="hesap_store.bakiye_update=hesap ; hesap_store.selectedHesap=hesap;">Bakiye ekle
            </button>
          </td>
        </tr>
      </table>
      <br class="space"/>

      <br class="space"/>
      <!--    </div>-->

      <button class="btn" @click="hesap_store.onceki_sayfa()">
        <a> Önceki</a>
      </button>
      <button
          class="btn bg:var(--menu_arkaplan)"
          v-bind:class="{ 'bg-gray-600': hesap_store.at_end }"
          @click="hesap_store.sonraki_sayfa()"
      >
        Sonraki
      </button>

      <!--      <musteri_duzenleme_component></musteri_duzenleme_component>-->
      <bakiye_update_component></bakiye_update_component>

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
