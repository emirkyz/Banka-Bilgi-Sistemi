<script setup>
import Document_sidebar_component from "@/components/veri/dökümantasyon/document_sidebar_component.vue";
</script>

<template>
  <main>
    <document_sidebar_component class="sidebar_comp"></document_sidebar_component>

    <!--    <sube_content_component class="main_comp"></sube_content_component>-->
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
