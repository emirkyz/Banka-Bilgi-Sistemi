<script setup></script>

<template>
  <div class="page">
    <nav>
      <div class="flex items-center flex-shrink-0 text-white mr-6">
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
            class="rounded-xl inline-block text-sm px-2 py-1 leading-none text-white border-2 border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0 cursor-pointer"
            >i</a
          >
        </div>
      </div>
    </nav>
    <main id="maintable" class="h-screen">
      <div
        class="font-bold h-100vh pl-4 my-1 bg-gray-400 rounded-2xl py-2 fixedElement"
      >
        <h1 style="color: #100101" class="text-xl">Kişiler</h1>
      </div>
      <hr class="style" />
      <div id="error_component">
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative my-5"
          role="alert"
        >
          <strong class="font-bold">Hata!</strong>
          <span class="mx-2 block sm:inline"
            >Kayıt Bulunamadı. Kayıt eklenmesi gerekiyor.</span
          >
        </div>
      </div>
      <div id="table-limiter">
        <table>
          <tr>
            <th>ID</th>
            <th>Müşteri Ad</th>
            <th>Müşteri Soyad</th>
            <th>Telefon</th>
            <th>Email</th>
            <th>Adres</th>

            <th>
              <a class="-ml-8">logo</a>
              <button class="btn white right hover:bg-red-500">Yenile</button>
            </th>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
          <tr>
            <td>test1</td>
            <td>test2</td>
            <td>test3</td>
            <td>test4</td>
            <td>test5</td>
            <td>test6</td>
            <td class="right">
              <button class="btn content-center hover:bg-gray-300">
                Düzenle
              </button>
            </td>
          </tr>
        </table>
        <br class="space" />

        <br class="space" />
      </div>
    </main>
    <div id="sidebar" class="items-center justify-center">S i d e b a r</div>
    <!--        <div id="section1">Section1</div>-->
    <!--        <div id="section2">Section2</div>-->
    <!--        <div id="section3">Section3</div>-->
    <!--        <div id="section4">Section4</div>-->
    <div class="mb-2 footerdiv rounded-2xl">
      <a href="/about" class="text-xl">@ copy right</a>
    </div>
  </div>
</template>

<style scoped></style>
