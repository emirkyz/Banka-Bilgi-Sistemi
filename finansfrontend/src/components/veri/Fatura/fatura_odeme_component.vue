<script setup>
import {ref} from "vue";
import Error_component from "@/components/ortak/error_component.vue";
import {useMusteriStore} from "@/stores/musteristore";
import {useSubeStore} from "@/stores/subestore";
import {useHesapStore} from "@/stores/hesapstore";
import {useFaturaStore} from "@/stores/faturastore";

const subeStore = useSubeStore();
const hesapStore = useHesapStore();
const musteriStore = useMusteriStore();
const faturaStore = useFaturaStore();

faturaStore.init();

hesapStore.init();
subeStore.yukle();
musteriStore.get_all_musteri()

const para_birimleri = [
  "Dolar",
  "Euro",
  "TL",
]
const onayKutusu = ref(false);
const odenecek_fatura = ref({
  fatura_musteri_id: "",
  hesap_id: "",
  fatura: "",
});


async function fatura_ode() { // TODO: Hesap para türüne göre kur dönüşümü yapılacak.
  const hesap_id = odenecek_fatura.value.hesap_id.valueOf();
  const miktar = odenecek_fatura.value.fatura.fatura_miktar;

  await hesapStore.bakiye_azalt(hesap_id, miktar).then(
      console.log("Bakiye Kontrol edildi")
  )
  if (hesapStore.not_enough.valueOf() === true) {
    console.log("Yeterli Bakiye Yok");
  } else if (hesapStore.not_enough.valueOf() === false) {
    await faturaStore.faturaOdeme(odenecek_fatura.value.fatura);
    console.log("Yeterli Bakiye Var. Fatura ödendi");
    odenecek_fatura.value = {
      fatura_musteri_id: "",
      hesap_id: "",
      fatura: "",
    };

  }

  // faturaStore.faturaOdeme(odenecek_fatura.value.fatura.id);
  // console.log("fatura ödendi");
  // odenecek_fatura.value = {
  //   fatura_musteri_id: "",
  //   hesap_id: "",
  //   fatura: "",
  // };
}

function fatura_filtre_on_musteri() {
  const option = document.getElementsByName('fsubeid')[0].value;
  if (option === '') {
    faturaStore.all_fatura_list = [];
    document.getElementsByName('ffaturaid').item(0).selectedIndex = 0;
    return
  }
  const musteri_id = odenecek_fatura.value.fatura_musteri_id.valueOf();
  faturaStore.get_all_fatura_by_musteri(`?filtre=fatura_musteri_id=${musteri_id}`)
  hesapStore.get_all_hesap_by_musteri(`?filtre=hesap_musteri_id=${musteri_id}`)
}

// const canContinue = (eklenecek_sube.value.sube_adi === '' || eklenecek_sube.value.sube_adresi ==='' || eklenecek_sube.value.sube_tel ==='');

</script>

<template>
  <main class="main_comp flex-col middle-custom">
    <div class="flex flex-col w-full">
      <a class="font-medium text-2xl"> Fatura Ödeme Ekranı </a>
      <a>Lütfen aşağıdaki kutucuklara ilgili bilgileri giriniz.</a>

      <div class="input-area mt-5 w-full">

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fsubeid">Hesabın Bağlı Olduğu Müşteriyi Seçiniz</label>
          </div>
          <div class="input-area">
            <select v-model="odenecek_fatura.fatura_musteri_id"
                    class="input-area py-4 bg-transparent w-full border border-black"
                    name="fsubeid" @change="fatura_filtre_on_musteri">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="musteri in musteriStore.all_musteri_list" :value="musteri['id']"> {{ musteri.id }} -
                {{ musteri.musteri_adi }} {{ musteri.musteri_soyad }}
              </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fadi">Müşteriye Ait Faturalar</label>
          </div>
          <div class="input-area">
            <select v-model="odenecek_fatura.fatura" class="input-area py-4 bg-transparent w-full border border-black"
                    name="ffaturaid">
              <option selected="selected" value="">Fatura Seçin.</option>
              <option v-for="fatura in faturaStore.all_fatura_list" :value="fatura"> {{ fatura.id }} -
                {{ fatura.fatura_turu }} - {{ fatura.fatura_miktar }} TL
              </option>
            </select>
          </div>
        </div>

        <div class="input-row">
          <div class="label-area">
            <label class="text-xl" for="fsubeid">Ücretin Alınacağı Hesabı seçiniz.</label>
          </div>
          <div class="input-area">
            <select v-model="odenecek_fatura.hesap_id" class="input-area py-4 bg-transparent w-full border border-black"
                    name="fsubeid">
              <option selected="selected" value="">Değiştirmek için seçim yapın</option>
              <option v-for="hesap in hesapStore.all_hesap_list" :value="hesap.id">
                {{ hesap["id"] }} - {{ hesap['hesap_bakiye'] }} {{ hesap.hesap_ParaBirim }}
              </option>
            </select>
          </div>
        </div>
        <error_component v-if="hesapStore.not_enough===true"
                         message='Hesabınızda Yeterli Bakiye Yok. Farklı Hesap deneyiniz.'></error_component>

<!--        <button class="btn" @click="onayKutusu=true">Fatura Öde</button>-->
        <teleport to="body">
          <div v-if="onayKutusu === true" class="modal" @click="onayKutusu=false">
            <div class="modal-content">
              <div class="modal-header">
                <h2>Onay</h2>
                <div class="cursor-pointer" @click="onayKutusu=false">X</div>
              </div>
              <div class="modal-body">
                <p>Faturayı ödemek istediğinizden emin misiniz?.</p>
              </div>
              <div class="modal-footer">
                <button class="buton olumlu" @click="onayKutusu=false; fatura_ode();">Öde</button>
                <button class="buton olumsuz" @click="onayKutusu=false">Kapat</button>
              </div>
            </div>
          </div>
        </teleport>

        <!--        <div class="input-row">-->
        <!--          <div class="label-area">-->
        <!--            <label for="fsoyad" class="text-xl">Hesap Bakiye</label>-->
        <!--          </div>-->
        <!--          <div class="input-area">-->
        <!--            <input-->
        <!--                type="text"-->
        <!--                placeholder="Müşteri Soyadını Giriniz"-->
        <!--                v-model="eklenecek_musteri.musteri_soyad"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->


                <div class="mt-4"
                     v-if="odenecek_fatura.fatura === '' || odenecek_fatura.fatura_musteri_id ==='' || odenecek_fatura.hesap_id ===''">

                  <error_component  message="Lütfen Tüm Kutucukları Doldurun."></error_component>

                  <!--          <button class="btn cursor-default">Kaydet</button>-->

                </div>
                <div class="mt-4"
                     v-if="odenecek_fatura.fatura !== '' && odenecek_fatura.fatura_musteri_id !=='' && odenecek_fatura.hesap_id !==''|| hesapStore.net_error===true">

                  <error_component v-if="hesapStore.net_error ===true"  message="API Bağlantısı sağlanamadı. Kaydetme İşlemi Çalışmayabilir. Sayfayı Yenilemeyi Deneyin."></error_component>

                  <button class="btn" v-if="hesapStore.net_error === false" @click="onayKutusu=true">Kaydet</button>
                </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.label-area {
  display: block;
  height: 100%;

  padding: 10px;
}

input {
  background: var(--menu_arkaplan);
  width: 100%;
  padding: 10px;
  font-size: 24px;
  outline: grey solid thin;
}

input:focus {
  outline: black solid medium;
}

.input-row {
  margin-top: 20px;
}

button {
  transition: all 0.2s ease-in-out;
}

.buton {
  color: var(--yazirengi);
  border: #161612 1px solid;
  background-color: var(--menu_arkaplan);
  padding: 7px 14px;
  margin: 7px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
}

.buton.olumlu:hover {
  background-color: forestgreen;
  color: var(--yazirengi);
  scale: 1.1;
}

.buton.olumsuz:hover {
  background-color: #f65e5e;
  color: var(--yazirengi);
  scale: 1.1;
}

.modal {
  display: flex; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
  justify-content: center;
  align-items: center;

}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  min-width: 30vw;
  z-index: 100;
}

.modal-header {
  font-size: 14pt;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label-area {
  display: block;
  height: 100%;

  padding: 10px;
}


input {
  background: var(--menu_arkaplan);
  width: 100%;
  padding: 10px;
  font-size: 24px;
  outline: grey solid thin;
}

input:focus {
  outline: black solid medium;
}

.input-row {
  margin-top: 20px;
}

button {
  transition: all 0.2s ease-in-out;
}

option {
  background: var(--menu_arkaplan);
}

</style>
