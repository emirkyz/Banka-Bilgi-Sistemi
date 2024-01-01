<script setup>

</script>

<template>
  <div class="flex flex-col m-2">
    <div class="font-medium">
      Kredi Ekranı Dökümantasyonu

    </div>

    <div>
      <div class="my-2 border-black border-2 p-2">
        <img alt="nav_bar" class="" src="./kredi_resimler/kredi_sidebar.png"/>
        <p class="text-xl">
          Burada Krediler ekranının sidebar'ı gözükmektedir. <br>
          Bu sidebar ile Krediler ekranının diğer sayfalarına geçiş yapılabilir.

        </p>
      </div>
      <br>
      <div>
        Kredi Ekleme Ekranı
        <div class="my-2 border-black border-2 p-2">
          <img alt="nav_bar" class="w-full" src="./kredi_resimler/kredi_ekleme.png"/>
        </div>
        <p class="text-xl">
          Kredi ekleme ekranında Hesap bilgileri girilir ve kayıt edilir. <br>
          Kredilerin "Son Tarih" bölümü, eski bir tarih olarak girilemez.
          Tüm kutucukları doldurmak zorunludur.
        </p>
      </div>

      <br>
      <div>
        Kredi Listelenme Ekranı
        <div class="my-2 border-black border-2 p-2">
          <img alt="nav_bar" class="w-full" src="./kredi_resimler/kredi_listeleme.png"/>
        </div>
        <p class="text-xl">
          Kredi listeleme ekranında Hesap bilgileri listelenir. <br>
          Kredi bilgilerinin üzerine tıklayarak Müşteri bilgileri güncellenebilir veya silinebilir. <br>
          Eğer kayıtlı bir Kredi yoksa "Kredi Bulunamadı" yazısı gözükür.
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>