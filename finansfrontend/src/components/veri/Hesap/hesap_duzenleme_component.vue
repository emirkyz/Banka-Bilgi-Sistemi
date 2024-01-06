<script setup>
import {onMounted, ref} from "vue";
import {useMusteriStore} from "@/stores/musteristore";
import {useSubeStore} from "@/stores/subestore";
import Error_component from "@/components/ortak/error_component.vue";
import {useHesapStore} from "@/stores/hesapstore";

const subeStore = useSubeStore();
const musteriStore = useMusteriStore();
const hesapStore = useHesapStore();

onMounted(() => {
  hesapStore.init();
  hesapStore.get_all_hesap();
})
subeStore.get_all_sube();
musteriStore.get_all_musteri();
const bos_hesap = {
  hesap_AcanSube: "",
  hesap_ParaBirim: "",
  hesap_musteri_id: "",
};
const duzenlenecek_hesap = ref({
  hesap_AcanSube: "",
  hesap_ParaBirim: "",
  hesap_musteri_id: "",
});

function duzenle() {
  hesapStore.hesapDuzenle(duzenlenecek_hesap.value, hesapStore.selectedHesap["id"]);
  duzenlenecek_hesap.value = {
    hesap_AcanSube: "",
    hesap_ParaBirim: "",
    hesap_musteri_id: "",
  }
}
const para_birimleri = [
  "Dolar",
  "Euro",
  "TL",
]
</script>

<template>
  <div class="flex flex-row">
    <div v-if="hesapStore.selectedHesap !== null" class="edit p-16 mx-2">
      <a class="mr-2 font-bold">{{ hesapStore.selectedHesap['id'] }}</a>
      <a>ID'li Hesap </a>
      <a>için Düzenleme Ekranı</a>
      <br>
      <br>
      <div class="input-area">
        <div class="input-row">
          <div class="label-area w-1/3">
            <label class="text-xl" for="fsubeid">Hesabın Bağlı Olduğu Şubeyi Seçiniz</label>
          </div>
          <div class="input-area">
            <select v-model="duzenlenecek_hesap.hesap_AcanSube"
                    class="input-area  bg-transparent w-2/4 border border-black"
                    name="fsubeid">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="sube in subeStore.all_sube_list" :value="sube['id']"> {{ sube.id }} - {{
                  sube.sube_adi
                }}
              </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area w-1/3">
            <label class="text-xl" for="fsubeid">Hesabın Bağlı Olduğu Müşteriyi Seçiniz</label>
          </div>
          <div class="input-area">
            <select v-model="duzenlenecek_hesap.hesap_musteri_id"
                    class="input-area  bg-transparent w-2/4 border border-black"
                    name="fsubeid">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="musteri in musteriStore.all_musteri_list" :value="musteri['id']"> {{ musteri.id }} - {{
                  musteri.musteri_adi
                }}
              </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area w-1/3">
            <label class="text-xl" for="fsubeid">Hesabın Para Birimini Seçiniz</label>
          </div>
          <div class="input-area">
            <select v-model="duzenlenecek_hesap.hesap_ParaBirim"
                    class="input-area  bg-transparent w-2/4 border border-black"
                    name="fsubeid">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="para in para_birimleri" :value="para"> {{ para }}
              </option>
            </select>
          </div>
        </div>
      </div>




        <div
            v-if="duzenlenecek_hesap.hesap_musteri_id !== '' && duzenlenecek_hesap.hesap_AcanSube !=='' && duzenlenecek_hesap.hesap_ParaBirim !==''">
          <button class="btn  my-4 p-2" @click="duzenle">
            Kaydet
          </button>
          <button class="btn exit my-4 p-2" @click="hesapStore.selectedHesap=null">
            İptal
          </button>
        </div>
        <div v-else
             class="mt-4">
          <error_component class="w-2/3" message="Lütfen Tüm Kutucukları Doldurun."></error_component>
        </div>
      </div>
    </div>

</template>

<style scoped>
.edit {
  width: 100%;
  height: fit-content;


  background: transparent;
  font-family: arial, serif;
  margin: 25px;
  font-size: 18px;
  outline: solid 1px black;
  z-index: 1006;
}

input {
  background: var(--menu_arkaplan);
  width: 100%;
  padding: 10px;
  font-size: 16px;
  outline: grey solid thin;
}

input:focus {
  outline: black solid medium;
}

.edit-label-area {
  width: 100%;
  margin-top: 20px;
}

.edit-input-area {
  width: 65%;
}

.edit-input-row {
  margin: 0 10px;
}

.exit {
  background: #342b2b;
  color: #ffffff;
}
</style>