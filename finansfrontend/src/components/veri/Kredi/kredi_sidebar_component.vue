<script setup>
import {ref} from "vue";

const sidebar_expanded = ref(false);

function expand_sidebar() {
  if (sidebar_expanded.value) {
    document.getElementById("side_").style.width = "15vw";
    document.getElementById("sidebar_content_1").style.display = "block";
    document.getElementById("sidebar_content_2").style.display = "block";
  } else {
    document.getElementById("side_").style.width = "50px";
    document.getElementById("sidebar_content_1").style.display = "none";
    document.getElementById("sidebar_content_2").style.display = "none";
  }

  sidebar_expanded.value = !sidebar_expanded.value;
}
</script>

<template>
  <div id="side_" class="sidebar_comp">
    <!--    <button @click="expand_sidebar" class="flex relative plus_sign">+</button>-->
    <button class="flex relative plus_sign" @click="expand_sidebar"></button>

    <div class="flex flex-col">
      <br/>
      <div id="sidebar_content_1">
        <router-link to="/kredi/ekle">
          <a class="font-medium text-xl">Kredi Ekle</a>
        </router-link>
      </div>
      <hr class="my-4"/>
      <div id="sidebar_content_2">
        <router-link class="font-medium text-2xl" to="/kredi/list">
          <a class="font-medium text-xl">Kredileri Listele</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.link-active,
.link-active a {
  padding: 3px;
  border-radius: 4px;
  background-color: #4a5568;
  color: white;
}
</style>
