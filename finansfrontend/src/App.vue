<script setup>
import Nav_bar_component from "@/components/nav_bar_component.vue";
import Footer_component from "@/components/footer_component.vue";
import {useThemeStore} from "@/stores/temastore";
import {storeToRefs} from "pinia";

const secili_tema = storeToRefs(useThemeStore()).secili_tema;

// const secili_tema = ref("light_mode");

console.log(secili_tema);
</script>

<template>
  <div :class="secili_tema" class="kapsayici">
    <Nav_bar_component class="nav_comp"/>
    <!--    <main class="sidebar_test">-->
    <!--        <a class="font-medium text-2xl"> test</a>-->
    <!--    </main>-->
    <router-view id="router" class="middle"></router-view>

    <footer_component class="footer_comp"/>
  </div>
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
