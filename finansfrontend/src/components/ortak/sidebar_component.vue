<script setup>
import {ref} from "vue";

const sidebar_expanded = ref(true);

function expand_sidebar() {
  if (sidebar_expanded.value) {
    document.getElementById("router").style.gridTemplateAreas =
        "sidebar content content content";
    document.getElementById("side_1_inside").style.display = "none";
  } else {
    document.getElementById("router").style.gridTemplateAreas =
        "sidebar sidebar content content";
    document.getElementById("side_1_inside").style.display = "block";
  }
  sidebar_expanded.value = !sidebar_expanded.value;
}
</script>

<template>
  <div id="side_1" class="sidebar_comp text-center content-center">
    <button class="flex relative plus_sign" @click="expand_sidebar">+</button>
    <div id="side_1_inside"></div>
  </div>
</template>

<style scoped>
#side_1 {
  min-height: 100vh;
}
</style>
