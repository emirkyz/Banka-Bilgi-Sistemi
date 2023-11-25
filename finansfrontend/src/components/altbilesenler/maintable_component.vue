<script setup>
import {useKrediStore} from "@/stores/kredistore";
import {ref} from "vue";

const sayfa_numarasi = ref(0)
const kredi_store = useKrediStore();
const at_end = ref(false)

kredi_store.yukle()
kredi_store.get_all_kredi()

function sonraki_sayfa() {

  if (kredi_store.krediler.length === 0) {
    return
  }
  if (kredi_store.krediler.length < 10) {
    at_end.value = true
    return
  }
  at_end.value = false
  sayfa_numarasi.value += 1
  kredi_store.yukle(sayfa_numarasi.value)
}

function onceki_sayfa() {
  if (sayfa_numarasi.value === 0) {
    return
  }
  at_end.value = false
  sayfa_numarasi.value -= 1
  kredi_store.yukle(sayfa_numarasi.value)
}

function order_by() {
  if (kredi_store.id_order === "?sırala=ar_id") {
    sayfa_numarasi.value = 0
    kredi_store.id_order = "?sırala=az_id"
    kredi_store.yukle(sayfa_numarasi.value)

  } else {
    sayfa_numarasi.value = 0
    kredi_store.id_order = "?sırala=ar_id"
    kredi_store.yukle(sayfa_numarasi.value)

  }
}


</script>

<template>
  <main id="" class="h-fit">
    <div
        id="kisi"
        class="font-bold h-100vh pl-4 my-1 rounded-2xl py-2 fixedElement"
    >
      <h1 class="text-xl">Krediler</h1>
      <a class="text-xl transition-all">{{ sayfa_numarasi + 1 }}. sayfada {{ kredi_store.krediler.length }} Tane kayıt
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
    <table class="h-[2px]">
      <tr>
        <th v-if="kredi_store.id_order==='?sırala=ar_id'" class="cursor-pointer" @click="order_by"><a>ID</a> <a
            class="font-bold text-green-500">(asc)</a></th>
        <th v-if="kredi_store.id_order==='?sırala=az_id'" class="cursor-pointer" @click="order_by"><a>ID</a> <a
            class="font-bold text-red-500">(desc)</a></th>
        <th>Kredi Durum</th>
        <th>Müşteri ID</th>
        <th>Kredi Son Tarih</th>

        <th>
          <a class="-ml-8">logo</a>
          <button @click="kredi_store.yukle(sayfa_numarasi=0);kredi_store.get_all_kredi()"
                  class="btn white right hover:bg-teal-300 hover:text-black">Yenile
          </button>
        </th>
      </tr>
      <tr v-for="kredi in kredi_store.krediler" :key="kredi">
        <td>{{ kredi["id"] }}</td>
        <td v-if="kredi['kredi_durum'] ==='Aktif'" class="text-green-500 font-bold">{{ kredi["kredi_durum"] }}</td>
        <td v-if="kredi['kredi_durum'] ==='Pasif'" class="text-red-500">{{ kredi["kredi_durum"] }}</td>

        <td>{{ kredi["kredi_musteri_id"] }}</td>
        <td>{{ new Date(kredi["kredi_son_tarih"]).toLocaleDateString() }}</td>
        <td class="right">
          <button class="btn content-center">Düzenle</button>
        </td>
      </tr>

    </table>
    <br class="space"/>

    <br class="space"/>
    <!--    </div>-->
    <button @click="onceki_sayfa" class="btn "><a> Önceki</a></button>
    <button @click="sonraki_sayfa" v-bind:class="{ 'bg-gray-600': at_end }" class="btn bg:var(--menu_arkaplan)">
      Sonraki
    </button>
  </main>

</template>

<style scoped></style>
