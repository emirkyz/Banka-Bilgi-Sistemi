<script setup>

</script>

<template>
  <div class="flex flex-col m-2">
    <div class="font-medium">
      Müşteri Ekranı Dökümantasyonu

    </div>

    <div>
      <div class="my-2 border-black border-2 p-2">
        <img alt="nav_bar" class="" src="./müşteri_resimler/müşteri_sidebar.png"/>
        <p class="text-xl">
          Burada müşteri ekranının sidebar'ı gözükmektedir. <br>
          Bu sidebar ile müşteri ekranının diğer sayfalarına geçiş yapılabilir.

        </p>
      </div>
      <br>
      <div>
        Müşteri Ekleme Ekranı
        <div class="my-2 border-black border-2 p-2">
          <img alt="nav_bar" class="w-full" src="./müşteri_resimler/müşteri_ekleme.png"/>
        </div>
        <p class="text-xl">
          Müşteri ekleme ekranında Müşteri bilgileri girilir ve kayıt edilir. <br>
          Tüm kutucukları doldurmak zorunludur.
        </p>
      </div>

      <br>
      <div>
        Şube Listelenme Ekranı
        <div class="my-2 border-black border-2 p-2">
          <img alt="nav_bar" class="w-full" src="./müşteri_resimler/müşteri_listeleme.png"/>
        </div>
        <p class="text-xl">
          Müşteri listeleme ekranında Müşteri bilgileri listelenir. <br>
          Müşteri bilgilerinin üzerine tıklayarak Müşteri bilgileri güncellenebilir veya silinebilir. <br>
          Eğer kayıtlı bir Müşteri yoksa "Müşteri Bulunamadı" yazısı gözükür.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>