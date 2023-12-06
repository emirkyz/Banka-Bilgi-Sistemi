<script setup>
import {useLoadingState} from "@/stores/loading_state";
import {useSubeStore} from "@/stores/subestore";
import Sube_duzenleme_component from "@/components/veri/Sube/sube_duzenleme_component.vue";

const sube_store = useSubeStore();
const loading = useLoadingState();

sube_store.init();
sube_store.get_all_sube();
</script>

<template>
  <main>
    <div class="sube-content main_comp">
      <div id="sube" class="font-bold h-100vh pl-4 my-1 rounded-2xl py-2">
        <h1 class="text-xl">Şubeler</h1>
        <a class="text-xl transition-all"
        >{{ sube_store.sayfa + 1 }}. sayfada
          {{ sube_store.subeler.length }} Tane kayıt gösteriliyor. Toplam
          {{ sube_store.total_sube }} tane kayıt mevcut.</a>
      </div>
      <hr class="style"/>

      <div id="error_component" v-if="sube_store.net_error === true && sube_store.total_sube ===0">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
             role="alert">
          <strong class="font-bold">Hata!</strong>
          <span class="mx-2 block sm:inline"
          >API Bağlantısı sağlanamadı. Sayfayı Yenilemeyi Deneyin.</span>
        </div>
      </div>
      <div id="error_component" v-if="sube_store.total_sube === 0 && sube_store.net_error===false">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
            role="alert">
          <strong class="font-bold">Hata!</strong>
          <span class="mx-2 block sm:inline"
          >Kayıt Bulunamadı. Kayıt eklenmesi gerekiyor.</span>
          <router-link to="/sube/ekle">
            <a class="font-medium ">Şube Eklemek için Tıklayınız</a>
          </router-link>
        </div>
      </div>
      <div v-if="loading.loading" class="font-bold loader"></div>
      <!--    <div id="table-limiter" class=" h-[10px]">-->
      <table class="h-[2px] table-fixed">
        <thead>
        <tr>
          <th
              v-if="sube_store.id_order === '?sırala=ar_id'"
              class="cursor-pointer"
              @click="sube_store.order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-green-500">(asc)</a>
          </th>
          <th
              v-if="sube_store.id_order === '?sırala=az_id'"
              class="cursor-pointer"
              @click="sube_store.order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-red-500">(desc)</a>
          </th>
          <th>Şube Adı</th>
          <th>Şube Adresi</th>
          <th>Şube Telefonu</th>

          <th>
            <a class="-ml-8">logo</a>
            <button
                @click="
                  sube_store.yukle((sube_store.sayfa = 0));
                  sube_store.get_all_sube();
                  sube_store.at_end = false;
                "
                class="btn white right hover:bg-teal-300 hover:text-black"
            >
              Yenile
            </button>
          </th>
        </tr>

        </thead>
        <tr
            v-for="sube in sube_store.subeler"
            :key="sube"
            v-bind:class="{ 'opacity-0': loading.loading }"
        >
          <td>{{ sube["id"] }}</td>
          <!--        <td v-if="sube['kredi_durum'] ==='Aktif'" class="text-green-500 font-bold">{{ sube["kredi_durum"] }}</td>-->
          <!--        <td v-if="sube['kredi_durum'] ==='Pasif'" class="text-red-500">{{ sube["kredi_durum"] }}</td>-->

          <td>{{ sube["sube_adi"] }}</td>
          <td>{{ sube["sube_adresi"] }}</td>
          <td>{{ sube["sube_tel"] }}</td>
          <td class="right">
            <button class="btn content-center" @click="sube_store.selectedSube=sube">Düzenle</button>
            <button class="btn-sil  content-center" @click="sube_store.subeSil(sube)">Sil</button>
          </td>
        </tr>
      </table>
      <br class="space"/>

      <br class="space"/>
      <!--    </div>-->

      <button @click="sube_store.onceki_sayfa()" class="btn">
        <a> Önceki</a>
      </button>
      <button
          @click="sube_store.sonraki_sayfa()"
          v-bind:class="{ 'bg-gray-600': sube_store.at_end }"
          class="btn bg:var(--menu_arkaplan)"
      >
        Sonraki
      </button>

      <sube_duzenleme_component></sube_duzenleme_component>


    </div>

  </main>
</template>

<style scoped>
.kredi-content {
  min-height: 100vh;
}

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
