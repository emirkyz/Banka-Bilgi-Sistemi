<script setup>
const props = defineProps(["store", "message"])
const message = props.message
</script>

<template>
  <div id="error_component">
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
         role="alert">
      <strong class="font-bold -m-4 mr-2 p-4 top-1/2 left-0 rounded bg-red-300  ">Hata!</strong>
      <span class="mx-2 block sm:inline font-medium"
      >{{ message }}</span>
    </div>
  </div>

</template>

<style scoped>

</style>