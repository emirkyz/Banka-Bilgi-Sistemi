<script setup>
import {ref} from "vue";

const sidebar_expanded = ref(false);

function expand_sidebar() {
  if (sidebar_expanded.value) {
    document.getElementById("inside_side").style.display = "none";
  } else {
    document.getElementById("inside_side").style.display = "flex";

  }
  sidebar_expanded.value = !sidebar_expanded.value;
  console.log(sidebar_expanded.value);
}
</script>

<template>
  <div class=" sidebar_comp text-center content-center">
    <button @click="expand_sidebar" v-bind:class="{ 'm-auto': !sidebar_expanded }" class=" flex relative plus_sign">+
    </button>
    <pre id="inside_side">
kredi_musteri_id: KrediModeli nesnesinin ilişkili olduğu müşteri tablosunun id’si.
kredi_faiz_orani: Kredinin faiz oranını belirtir.
kredi_son_tarih: Kredinin son tarihini belirtir.
kredi_tutar: KrediModeli nesnesinin tutarını belirtir.
kredi_ay: Kredinin kaç ay süreceğini belirtir.
kredi_geri_odeme: Kredinin geri ödeme miktarını belirtir.</pre>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  #sidebar {
    background-color: red;
  }

}


</style>
