<script setup>
import Sidebar_component from "@/components/ortak/sidebar_component.vue";
import Main_component from "@/components/ortak/main_component.vue";
</script>

<template>
  <main>
    <sidebar_component class="sidebar_comp"/>
    <main_component class="main_comp"/>
  </main>
</template>

<style scoped>
main {
  margin-left: 2px;
  margin-right: 2px;
}

.middle_section {
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-width: 100vh;
}


.sidebar_comp * {
  justify-content: center;
  align-items: center;
  place-content: center;
}

.plus_sign {
  justify-content: center;
  align-items: center;
}


</style>
