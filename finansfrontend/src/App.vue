<script setup>
import {ref} from "vue";
import Nav_bar_component from "@/components/nav_bar_component.vue";
import Footer_component from "@/components/footer_component.vue";
import {useThemeStore} from "@/stores/temastore";
import {storeToRefs} from "pinia";
import Kredi_component from "@/components/KrediTable/kredi_component.vue";



const secili_tema = storeToRefs(useThemeStore()).secili_tema;

// const secili_tema = ref("light_mode");

console.log(secili_tema);
</script>

<template>
  <div id="page" class="kapsayici" :class="secili_tema">
    <Nav_bar_component class="nav_comp"/>
    <kredi_component/>
    <!--    <sidebar_component class="sidebar_comp"/>-->

    <footer_component class="footer_comp"/>
  </div>


</template>

<style scoped>
.tema_secici {
  position: absolute;
//bottom: -72px; top: 0; right: 0; z-index: 0;
}
</style>
