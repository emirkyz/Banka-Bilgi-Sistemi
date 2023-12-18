<script setup>
import {useThemeStore} from "@/stores/temastore";
import {storeToRefs} from "pinia";

const temalar = [
  {tema_adi: "Açık renk tema", tema_class: "light_mode"},
  {tema_adi: "Koyu renk tema", tema_class: "dark_mode"},
];

const secili_tema = storeToRefs(useThemeStore()).secili_tema;

console.log(secili_tema);
</script>

<template>
  <div class="mb-2 footerdiv rounded-2xl">
    <a class="text-xl" href="/about">Trabzon / Ortahisar</a>
    <a class="text-xl ml-4"> Tel:12345678901</a>

    <select v-model="secili_tema" class="tema_secici">
      <option v-for="tema in temalar" :value="tema.tema_class">
        {{ tema.tema_adi }}
      </option>
    </select>
  </div>
</template>

<style scoped>
option {
  background-color: #1a202c;
  color: #f7fafc;
}

.tema_secici {
  margin-left: 20px;
  justify-content: right;
  font-size: 18px;
  //bottom: -72px;
  top: 0;
  right: 0;
  z-index: 0;
  background-color: transparent;
  outline: transparent;
}
</style>
