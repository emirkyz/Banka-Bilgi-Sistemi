<script setup>
</script>

<template>

    <nav class="nav-all ">
      <div id="title" class="flex text-white mr-6">
        <!--        TODO: Change this to a router-link-->
        <a href="/" class="font-bold text-xl cursor-pointer">KYZ FİNANS </a>
      </div>
      <div class="routes w-full block flex-grow sm:flex sm:items-center sm:w-auto">
        <div id="test" class="text-sm w-full">
          <router-link
              to="/sube"
              class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Banka Şubeleri
          </router-link>
          <router-link
              to="/musteri"
              class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Müşteri
          </router-link>
          <a
              href="/hesap"
              class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Hesaplar
          </a>
          <router-link
              to="/kredi"
              class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
          >
            Krediler
          </router-link>
          <div>
            <router-link id="i"
                to="/doc"
                class="right-0 rounded-xl inline-block text-sm px-2 py-1 leading-none text-white border-2 border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0 cursor-pointer"
            >i</router-link
            >
          </div>
        </div>

      </div>
    </nav>

</template>

<style scoped>
.link-active,
.link-active:hover {
  padding: 10px 10px;
  align-items: center;
  border-radius: 15px;
  background-color: #804949;
  color: white !important;
}

.link-active #title {
  color: #d01b1b !important;
}
.nav-all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    align-content: flex-start;
    width: 10px;
  }
}
#test {

  display: flex;
  justify-content: flex-start;
  gap: 14px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    align-content: flex-start;
    width: 10px;
  }
}
#test  > div {
  margin-left: auto;
  @media (max-width: 768px) {
    margin-left: 0;
  }
}
</style>
