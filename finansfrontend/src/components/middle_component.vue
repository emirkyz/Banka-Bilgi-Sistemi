<script setup>

import Maintable_component from "@/components/altbilesenler/maintable_component.vue";
import {ref} from "vue";
import Sidebar_component from "@/components/altbilesenler/sidebar_component.vue";






</script>

<template>
  <div class="middle_section">

    <sidebar_component class="sidebar_comp"/>
    <maintable_component class="main_comp"/>


  </div>
</template>

<style scoped>


.middle_section{
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-width: 100vh;
}
@media (max-width: 768px) {
  .middle_section{
    flex-direction: column;
  }
  .sidebar_comp *{
    justify-content: center;
    align-items: center;
    place-content: center;
  }
  .plus_sign{
    justify-content: center;
    align-items: center;
  }
}
</style>