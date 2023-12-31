<script setup>
import {ref} from "vue";

const sidebar_expanded = ref(false);


</script>

<template>
  <div id="side_" class="sidebar_comp">
    <button class="flex relative plus_sign"></button>

    <div class="flex flex-col">
      <br/>
      <div id="sidebar_content_1">
        <router-link to="/hesap/ekle">
          <a class="font-medium text-xl ">Hesap Ekle</a>
        </router-link>
      </div>
      <hr class="my-4"/>
      <div id="sidebar_content_2">
        <router-link class="font-medium text-2xl" to="/hesap/list">
          <a class="font-medium text-xl  ">Hesapları Listele</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

a{
  display: block;
}
#side_ {
  transition: width 300ms;
}

@media (max-width: 768px) {
  #side_ {
    min-width: 100vw;
  }
}

#sidebar_content_1,
#sidebar_content_2 {
  display: block;
}

.link-active a {
  padding: 3px;
  border-radius: 4px;
  background-color: #4a5568;
  color: white;
}
</style>
