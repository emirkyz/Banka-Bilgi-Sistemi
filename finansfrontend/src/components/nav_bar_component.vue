<script setup>
</script>

<template>
  <div class="nav_container">
    <nav class="flex items-center justify-center w-screen">
      <div id="title" class="flex text-white mr-6">
<!--        TODO: Change this to a router-link-->
        <a  href="/" class="font-bold text-xl cursor-pointer"
        >KYZ FİNANS
        </a>
      </div>
      <div
          id="test"
          class="w-full block flex-grow sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:flex-grow">
          <router-link to="/sube"
                       class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Banka Şubeleri
          </router-link>
          <a
              href="/musteri"
              class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Müşteri Listesi
          </a>
          <a
              href="/hesap"
              class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Hesaplar
          </a>
          <router-link to="/kredi"
                       class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Krediler
          </router-link>
        </div>
        <div>
          <a
              href="/documentation"
              class="right-0 rounded-xl inline-block text-sm px-2 py-1 leading-none text-white border-2 border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0 cursor-pointer"
          >i</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>


<style scoped>
.link-active,
.link-active:hover{
  padding: 5px;
  align-items: center;
  border-radius: 8px;
  background-color: #5b5b5b;
  color: white !important;
}
.link-active #title{
  color: #d01b1b !important;
}
</style>
