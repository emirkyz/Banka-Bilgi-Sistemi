<script setup>
import {useKrediStore} from "@/stores/kredistore";
import {useLoadingState} from "@/stores/loading_state";
import Error_component from "@/components/ortak/error_component.vue";
import {useMusteriStore} from "@/stores/musteristore";
import {onMounted} from "vue";

const kredi_store = useKrediStore();
const loading = useLoadingState();
const musteri_store = useMusteriStore();

onMounted(() => {
  musteri_store.get_all_musteri();
  kredi_store.init();
  kredi_store.get_all_kredi();
});

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
          <th>Müşteri</th>
          <th>Hesap ID</th>
          <th>Kredi Miktarı</th>
          <th>Kredi Son Tarih</th>
          <th>Kredi Faiz Oranı</th>

          <th>
            <a class="-ml-8">logo</a>
            <button
                class="btn white right hover:bg-teal-300 hover:text-black"
                @click="
                  kredi_store.yukle(kredi_store.sayfa = 0);
                  kredi_store.get_all_kredi();
                  kredi_store.at_end = false;
                "
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
              :class="kredi['kredi_durum'] === 'Aktif' ? 'text-green-500 font-bold' : kredi['kredi_durum'] === 'Pasif' ? 'text-red-500' : 'text-yellow-500'"
              class="text-green-500 font-bold"
          >
            {{ kredi["kredi_durum"] }}
          </td>

<!--          <td v-if="new Date(kredi['kredi_son_tarih']) < new Date()"-->
<!--              class="text-red-500">-->
<!--            Pasif-->
<!--          </td>-->

          <td> {{ musteri_store.find_musteri(kredi.kredi_musteri_id) }}</td>
          <td>{{ kredi["kredi_hesap_id"] }}</td>

          <td>{{ kredi["kredi_tutar"].toLocaleString() + " TL" }}</td>
          <td>{{ new Date(kredi["kredi_son_tarih"]).toLocaleDateString("tr-tr") }}</td>
          <td>{{ kredi["kredi_faiz_orani"] }}</td>

          <td class="butonlar right">
<!--            <button class="btn content-center">Düzenle</button>-->
            <button class="btn-sil  content-center" @click="kredi_store.krediSil(kredi)">Sil</button>
            <button class="btn-öde mt-2 content-center" @click="kredi_store.kredi_ode(kredi)">Kredi Öde</button>
          </td>
        </tr>
      </table>
      <br class="space"/>

      <br class="space"/>
      <!--    </div>-->

      <button class="btn" @click="kredi_store.onceki_sayfa()">
        <a> Önceki</a>
      </button>
      <button
          class="btn bg:var(--menu_arkaplan)"
          v-bind:class="{ 'bg-gray-600': kredi_store.at_end }"
          @click="kredi_store.sonraki_sayfa()"
      >
        Sonraki
      </button>
    </div>
  </main>
</template>

<style scoped>
.butonlar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 5px;
}
button {
  transition: all 300ms ease-out;
}
.btn-öde{
  font-size: 10pt;
  color: #000;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 2px 5px;
  margin: 0 2px;
  cursor: pointer;
  transition: all 300ms ease-out;
  grid-column-start: 1;
  grid-column-end: 2;
}
.btn-öde:hover{
  background-color: #000;
  color: #fff;
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
