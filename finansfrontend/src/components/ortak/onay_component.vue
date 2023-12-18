<script setup>
import {ref} from "vue";

const onayKutusu = ref(true);
</script>

<template>
  <teleport to="body">
    <div v-if="onayKutusu === true" class="modal" @click="onayKutusu=false">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Onay</h2>
          <div class="cursor-pointer" @click="onayKutusu=false">X</div>
        </div>
        <div class="modal-body">
          <p>Kaydetmek istediğinizden emin misiniz?.</p>
        </div>
        <div class="modal-footer">
          <button class="buton olumlu" @click="$emit('save_data',$event);onayKutusu=false">Kaydet</button>
          <button class="buton olumsuz" @click="onayKutusu=false">Kapat</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.buton {
  color: var(--yazirengi);
  border: #161612 1px solid;
  background-color: var(--menu_arkaplan);
  padding: 7px 14px;
  margin: 7px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
}

.buton.olumlu:hover {
  background-color: forestgreen;
  color: var(--yazirengi);
  scale: 1.1;
}

.buton.olumsuz:hover {
  background-color: #f65e5e;
  color: var(--yazirengi);
  scale: 1.1;
}

.modal {
  display: flex; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
  justify-content: center;
  align-items: center;

}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  min-width: 30vw;
  z-index: 100;
}

.modal-header {
  font-size: 14pt;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>