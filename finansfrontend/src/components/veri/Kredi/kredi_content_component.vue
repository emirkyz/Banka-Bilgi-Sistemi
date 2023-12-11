<script setup>
import {useKrediStore} from "@/stores/kredistore";
import {useLoadingState} from "@/stores/loading_state";
import Error_component from "@/components/ortak/error_component.vue";

const kredi_store = useKrediStore();
const loading = useLoadingState();

kredi_store.init();
kredi_store.get_all_kredi();
</script>

<template>
  <main>
    <div class="kredi-content main_comp">
      <div id="kisi" class="font-bold h-100vh pl-4 my-1 rounded-2xl py-2">
        <h1 class="text-xl">Krediler</h1>
        <a class="text-xl transition-all"
        >{{ kredi_store.sayfa + 1 }}. sayfada
          {{ kredi_store.krediler.length }} Tane kayıt gösteriliyor. Toplam
          {{ kredi_store.total_credits }} tane kayıt mevcut.</a
        >
      </div>
      <hr class="style"/>
      <error_component
          v-if="kredi_store.net_error === true && kredi_store.total_credits ===0"
          :store="kredi_store"
          message="API Bağlantısı sağlanamadı. Sayfayı Yenilemeyi Deneyin."></error_component>

      <error_component
          v-if="kredi_store.total_credits ===0 && kredi_store.net_error===false"
          :store="kredi_store"
          message="Kayıt Bulunamadı. Kayıt eklenmesi gerekiyor."></error_component>

      <!--    <div id="table-limiter" class=" h-[10px]">-->
      <div v-if="loading.loading" class="font-bold loader"></div>
      <table class="h-[2px] table-fixed">
        <thead>
        <tr>
          <th
              v-if="kredi_store.id_order === '?sırala=ar_id'"
              class="cursor-pointer w-[90px]"
              @click="kredi_store.order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-green-500">(asc)</a>
          </th>
          <th
              v-if="kredi_store.id_order === '?sırala=az_id'"
              class="cursor-pointer w-[90px]"
              @click="kredi_store.order_by_id()"
          >
            <a>ID</a>
            <a class="font-bold text-red-500">(desc)</a>
          </th>
          <th class="w-[70px]">Kredi Durum</th>
          <th>Müşteri ID</th>
          <th>Hesap ID</th>
          <th>Kredi Miktarı</th>
          <th>Kredi Son Tarih</th>
          <th>Kredi Faiz Oranı</th>

          <th>
            <a class="-ml-8">logo</a>
            <button
                @click="
                  kredi_store.yukle(kredi_store.sayfa = 0);
                  kredi_store.get_all_kredi();
                  kredi_store.at_end = false;
                "
                class="btn white right hover:bg-teal-300 hover:text-black"
            >
              Yenile
            </button>
          </th>
        </tr>
        </thead>
        <tr
            v-for="kredi in kredi_store.krediler"
            :key="kredi"
            v-bind:class="{ 'opacity-0': loading.loading }"
        >
          <td>{{ kredi["id"] }}</td>
          <td
              v-if="new Date(kredi['kredi_son_tarih']) > new Date()"
              class="text-green-500 font-bold"
          >
            Aktif
          </td>
          <td v-if="new Date(kredi['kredi_son_tarih']) < new Date()"
              class="text-red-500">
            Pasif
          </td>

          <td>{{ kredi["kredi_musteri_id"] }}</td>
          <td> test </td>
          <td>{{ kredi["kredi_tutar"].toLocaleString() + " TL" }}</td>
          <td>{{ new Date(kredi["kredi_son_tarih"]).toLocaleDateString("tr-tr") }}</td>
          <td>{{ kredi["kredi_faiz_orani"] }}</td>

          <td class="right">
            <button class="btn content-center">Düzenle</button>
            <button class="btn-sil  content-center" @click="kredi_store.krediSil(kredi)">Sil</button>
          </td>
        </tr>
      </table>
      <br class="space"/>

      <br class="space"/>
      <!--    </div>-->

      <button @click="kredi_store.onceki_sayfa()" class="btn">
        <a> Önceki</a>
      </button>
      <button
          @click="kredi_store.sonraki_sayfa()"
          v-bind:class="{ 'bg-gray-600': kredi_store.at_end }"
          class="btn bg:var(--menu_arkaplan)"
      >
        Sonraki
      </button>
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
