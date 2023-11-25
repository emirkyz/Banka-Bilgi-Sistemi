"""
KrediModel.py dosyası, kredi tablosunun modelini içerir.

"""

from datetime import datetime

from flask_sqlalchemy.session import Session
from sqlalchemy import ForeignKey, event, select
from sqlalchemy.orm import Mapped, mapped_column

from veri.modeller.TemelVeriSinif import TemelVeriSinifi
from veri.modeller.MusteriModel import MusteriModeli
from veri.veritabani import db


class KrediModeli(TemelVeriSinifi):
    """
    KrediModeli, kredi tablosunun modelini içerir.

    Attributes:
        kredi_durum: KrediModeli nesnesinin durumunu belirtir.
        kredi_musteri_id: KrediModeli nesnesinin ilişkili olduğu müşteri tablosunun id'si.
        kredi_faiz_orani: Kredinin faiz oranını belirtir.
        kredi_son_tarih:  Kredinin son tarihini belirtir.
        kredi_tutar: KrediModeli nesnesinin tutarını belirtir.
        kredi_ay: Kredinin kaç ay süreceğini belirtir.
        kredi_geri_odeme: Kredinin geri ödeme miktarını belirtir.
    """
    __tablename__ = 'kredi'

    def container():
        """
        durum_belirle fonkyionu için container fonksiyonudur.

        KrediModeli nesnesinin durumunu belirler.
        Eğer kredi_son_tarih, şu anki tarihten küçükse kredi durumu "Pasif" olur.
        Eğer kredi_son_tarih, şu anki tarihten büyükse kredi durumu "Aktif" olur.

            Context, SQLAlchemy tarafından sağlanan bir nesnedir ve Modelin özelliklerine erişim sağlar.

            :param context: SQLAlchemy context.

            :return: KrediModeli nesnesinin durumunu döndürür.

        """
        def durum_belirle(context):
            """
            KrediModeli nesnesinin durumunu belirler.
            Context, SQLAlchemy tarafından sağlanan bir nesnedir ve Modelin özelliklerine erişim sağlar.

            :param context: SQLAlchemy context.

            :return: KrediModeli nesnesinin durumunu döndürür.

            """
            tarih_str = context.get_current_parameters()["kredi_son_tarih"]
            # ay = context.get_current_parameters()["kredi_ay"]
            tarih_date = datetime.strptime(tarih_str, "%d-%m-%Y").date()
            if tarih_date < datetime.now().date():
                return "Pasif"
            else:
                return "Aktif"

        return durum_belirle

    @property
    def faiz_hesapla(self) -> float:
        """
        Kredinin faizini hesaplar.
        :return: Kredinin toplam geri ödenecek tutarını döndürür.
        """
        total_odenecek = self.kredi_tutar * self.kredi_faiz_orani * (1 + self.kredi_faiz_orani)
        return total_odenecek + self.kredi_tutar

    kredi_durum: Mapped[str] = mapped_column(nullable=True, default=container(), onupdate=container())
    kredi_musteri_id: Mapped[int] = mapped_column(ForeignKey('musteri.id'), nullable=False)
    kredi_faiz_orani: Mapped[float] = mapped_column()
    kredi_son_tarih: Mapped[datetime] = mapped_column()

    kredi_tutar: Mapped[float] = mapped_column()
    kredi_ay: Mapped[int] = mapped_column(nullable=True)
    kredi_geri_odeme: Mapped[float] = mapped_column(nullable=True)


@event.listens_for(KrediModeli, "after_insert")
def set_credit_score(mapper, connection, target):
    """
    KrediModeli nesnesi eklendikten sonra çalışan fonksiyon.
    Bu fonksiyon, kredi tablosuna ekleme yapıldıktan sonra müşteri tablosundaki müşteri kredi skorunu günceller.
    Tablolarda güncelleme yapabilmek için yeni bir session oluşturulur.

    Açıklama:
    @event.listeners_for() SQL Alchemy tarafından sağlanan bir dekoratördür,
    bu dekoratör sayesinde, belirtilen modelin belirtilen olayından sonra çalışan bir fonksiyon yazılabilir.

    Hesaplama formülü:
    score = (1-(active / total)) + (total//100)
    active: Müşterinin aktif kredilerinin sayısı.
    total: Müşterinin toplam kredilerinin sayısı.
    score: Müşterinin kredi skoru.

    :param mapper: SQLAlchemy mapper.
    :param connection: SQLAlchemy connection.
    :param target: KrediModeli nesnesi.
    :return: None.
    """

    new_session = Session(db)
    new_session.begin()
    active = 0

    sorgu = select(MusteriModeli).where(MusteriModeli.id == target.kredi_musteri_id)

    musteri = new_session.scalars(sorgu).first()
    total = len(musteri.musteri_kredileri)
    print(f"total: {total}")
    if total < 5:
        return
    else:
        for kredi in musteri.musteri_kredileri:
            if kredi.kredi_durum == "Aktif":
                active += 1
            else:
                pass
        score = (1-(active / total)) + (total//100)
        musteri.musteri_kredi_skor = score

        new_session.commit()
        print(f"musteri kredi skoru: {score}")
