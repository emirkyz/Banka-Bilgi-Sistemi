<script setup>
import Hareket_sidebar_component from "@/components/veri/HesapHareket/hareket_sidebar_component.vue";
</script>

<template>
  <main>
    <hareket_sidebar_component class="sidebar_comp"></hareket_sidebar_component>
    <router-view id="router" class="middle"></router-view>
  </main>
</template>

<style scoped>
.link-active,
.link-active:hover {
  padding: 5px;
  align-items: center;
  border-radius: 8px;
  background-color: #5b5b5b;
  color: white !important;
}
</style>
