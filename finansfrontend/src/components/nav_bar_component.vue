<script setup></script>

<template>
  <div class="nav_container">
    <nav class="flex items-center justify-center w-screen">
      <div class="flex text-white mr-6">
        <a href="/home" class="font-extrabold text-xl cursor-pointer"
          >KYZ FİNANS</a
        >
      </div>
      <div
        id="test"
        class="w-full block flex-grow sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:flex-grow">
          <a
            href="/subeler"
            class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Banka Şubeleri
          </a>
          <a
            href="/musteriler"
            class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Müşteri Listesi
          </a>
          <a
            href="/hesap"
            class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white hover:bg-gray-800 hover:bg-transparent"
          >
            Hesaplar
          </a>
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

<style scoped></style>
