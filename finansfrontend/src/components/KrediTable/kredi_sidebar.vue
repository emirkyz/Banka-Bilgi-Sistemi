<script setup>
import {ref} from "vue";

const sidebar_expanded = ref(false);


function expand_sidebar() {
  if (sidebar_expanded.value) {
    document.getElementById("sidebar_content").style.display = "none";
  } else {
    document.getElementById("sidebar_content").style.display = "flex";

  }
  sidebar_expanded.value = !sidebar_expanded.value;
}
</script>

<template>
  <div id="side_1" class=" sidebar_comp text-center content-center">
    <button @click="expand_sidebar" v-bind:class="{ 'm-auto': !sidebar_expanded }" class=" flex relative plus_sign">+
    </button>
    <div id="sidebar_content">
      <a> <b>kredi_musteri_id:</b> KrediModeli nesnesinin ilişkili olduğu müşteri tablosunun id’si.</a> <br>
      <a> <b>kredi_faiz_orani:</b> KrediModeli nesnesinin ilişkili olduğu müşteri tablosunun id’si. Kredinin faiz
        oranını belirtir.</a> <br>
      <a> <b>kredi_son_tarih:</b> Kredinin son tarihini belirtir.</a> <br>
      <a> <b>kredi_tutar:</b> Kredinin tutarını belirtir.</a> <br>
      <a> <b>kredi_ay:</b> Kredinin kaç ay süreceğini belirtir.</a> <br>
      <a> <b>kredi_geri_odeme:</b> Kredinin geri ödeme miktarını belirtir.</a> <br>
    </div>
  </div>
</template>

<style scoped>

</style>