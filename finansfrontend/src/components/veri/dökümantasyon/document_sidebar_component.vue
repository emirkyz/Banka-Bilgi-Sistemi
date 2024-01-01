<script setup>
import {ref} from "vue";

const sidebar_expanded = ref(false);

function expand_sidebar() {
  if (sidebar_expanded.value) {
    document.getElementById("side_").style.width = "160px";
    document.getElementById("sidebar_content").style.display = "block";
  } else {
    document.getElementById("side_").style.width = "50px";
    document.getElementById("sidebar_content").style.display = "none";
  }

  sidebar_expanded.value = !sidebar_expanded.value;
}
</script>

<template>
  <div id="side_" class="sidebar_comp ">
    <button class="flex relative plus_sign" @click="expand_sidebar"></button>

    <div class="flex flex-col">
      <div class="mb-2 font-medium border-b-8 px-2 p-1.5 rounded">
        Nasıl Kullanılır?
      </div>

      <br/>
      <div id="sidebar_content_1" class="">
        <router-link to="/doc/sube">
          <a class="block font-medium text-xl">Şube Ekranı</a>
        </router-link>
      </div>
      <hr class="my-4"/>
      <div id="sidebar_content_2">
        <router-link class="font-medium text-2xl" to="/doc/musteri">
          <a class="block font-medium text-xl">Müşteri Ekranı</a>
        </router-link>
      </div>
      <hr class="my-4"/>
      <div id="sidebar_content_2">
        <router-link class="font-medium text-2xl" to="/doc/hesap">
          <a class="block font-medium text-xl">Hesap Ekranı</a>
        </router-link>
      </div>
      <hr class="my-4"/>
      <div id="sidebar_content_2">
        <router-link class="font-medium text-2xl" to="/doc/kredi">
          <a class="block font-medium text-xl">Kredi Ekranı</a>
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
  .sidebar_comp{
    overflow-y: scroll;
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
