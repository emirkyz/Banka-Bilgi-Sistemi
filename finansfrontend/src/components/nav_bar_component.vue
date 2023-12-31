<script setup>
</script>

<template>

  <nav class="nav-all ">
    <div id="title" class="flex text-white mr-6">
      <!--        TODO: Change this to a router-link-->
      <a class="font-bold text-xl cursor-pointer" href="/">KYZ FİNANS </a>
    </div>
    <div class="routes w-full block flex-grow sm:flex sm:items-center sm:w-auto">
      <div id="test" class="text-sm w-full">
        <router-link
            class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
            to="/sube"
        >
          Banka Şubeleri
        </router-link>
        <router-link
            class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
            to="/musteri"
        >
          Müşteri
        </router-link>
        <router-link
            class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
            to="/hesap"
        >
          Hesaplar
        </router-link>
        <router-link
            class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
            to="/kredi"
        >
          Krediler
        </router-link>
        <router-link
            class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
            to="/fatura">
          Fatura Ödeme
        </router-link>
        <router-link to="/hareket"
                     class="hover:bg-gray-800 block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4 hover:bg-transparent"
        >
          Hesap Hareketleri
        </router-link>
        <div class="dropdown ">
          <button class="dropbtn">Menü</button>
          <div class="dropdown-content">
            <router-link
                to="/sube"
            >
              Banka Şubeleri
            </router-link>

            <router-link
                to="/musteri"
            >
              Müşteri
            </router-link>

            <router-link
                to="/hesap"
            >
              Hesaplar
            </router-link>

            <router-link
                to="/kredi"
            >
              Krediler
            </router-link>

            <router-link
                class="test"
                to="/fatura"
            >
              Fatura Ödeme
            </router-link>
            <router-link to="/hareket">
              Hesap Hareketleri
            </router-link>
          </div>
        </div>

        <div class="info">
          <router-link id="i"
                       class="right-0 rounded-xl inline-block text-sm px-2 py-1 leading-none text-white border-2 border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0 cursor-pointer"
                       to="/doc"
          >i
          </router-link
          >
        </div>
      </div>
    </div>
  </nav>

</template>

<style scoped>
.link-active {
  padding: 10px 10px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #804949;
  color: white !important;
}

.link-active #title {
  color: #d01b1b !important;
}

.nav-all {
  z-index: 101;
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

#test > div {
  margin-left: 2px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
}

#test .info {
  margin-left: auto;
  @media (max-width: 768px) {
    margin-left: 0;
  }
}


.dropdown {
  display: inline-block;
  z-index: 101;
  justify-content: flex-start;
  align-content: flex-start;
}

.dropdown-content {
  padding: 10px 5px;
  border-radius: 7px;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  color: #d01b1b;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown .dropbtn {
  border-radius: 7px;
  background-color: gray;
  outline: dimgray 1px solid;
  border: #1a202c 1px solid;
  color: white;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transition-duration: 0.4s;
}

.dropdown.hover .dropbtn {
  background-color: #3e8e41;
}
</style>
