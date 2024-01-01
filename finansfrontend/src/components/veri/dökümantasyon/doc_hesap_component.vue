<script setup>

</script>

<template>
  <div class="flex flex-col m-2">
    <div class="font-medium">
      Hesap Ekranı Dökümantasyonu

    </div>

    <div>
      <div class="my-2 border-black border-2 p-2">
        <img alt="nav_bar" class="" src="./hesap_resimler/hesap_sidebar.png"/>
        <p class="text-xl">
          Burada Hesaplar ekranının sidebar'ı gözükmektedir. <br>
          Bu sidebar ile Hesaplar ekranının diğer sayfalarına geçiş yapılabilir.

        </p>
      </div>
      <br>
      <div>
        Hesap Ekleme Ekranı
        <div class="my-2 border-black border-2 p-2">
          <img alt="nav_bar" class="w-full" src="./hesap_resimler/hesap_ekleme.png"/>
        </div>
        <p class="text-xl">
          Hesap ekleme ekranında Hesap bilgileri girilir ve kayıt edilir. <br>
          Hesabın kayıt edileceği Şube seçilmeden diğer kutucuklar gözükmez.
          Tüm kutucukları doldurmak zorunludur.
        </p>
      </div>

      <br>
      <div>
        Hesap Listelenme Ekranı
        <div class="my-2 border-black border-2 p-2">
          <img alt="nav_bar" class="w-full" src="./hesap_resimler/hesap_listeleme.png"/>
        </div>
        <p class="text-xl">
          Hesap listeleme ekranında Hesap bilgileri listelenir. <br>
          Hesap bilgilerinin üzerine tıklayarak Müşteri bilgileri güncellenebilir veya silinebilir. <br>
          Eğer kayıtlı bir Hesap yoksa "Hesap Bulunamadı" yazısı gözükür.
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>