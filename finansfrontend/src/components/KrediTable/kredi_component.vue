<script setup>

import Kredi_sidebar from "@/components/KrediTable/kredi_sidebar.vue";
import Kredi_main_component from "@/components/KrediTable/kredi_main_component.vue";


</script>

<template>
    <main class="middle_section">
      <kredi_sidebar class="sidebar_comp"/>
      <kredi_main_component class="main_comp"/>

    </main>

</template>

<style scoped>


.middle_section {
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-width: 100vh;
}

@media (max-width: 768px) {
  .middle_section {
    flex-direction: column;
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
}
</style>