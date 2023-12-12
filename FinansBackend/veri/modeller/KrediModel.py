"""
KrediModel.py dosyası, kredi tablosunun modelini içerir.

"""

from datetime import datetime

from flask_sqlalchemy.session import Session
from sqlalchemy import ForeignKey, event, select
from sqlalchemy.orm import Mapped, mapped_column

from veri.modeller.TemelVeriSinif import TemelVeriSinifi



class KrediModeli(TemelVeriSinifi):
    """
    KrediModeli, kredi tablosunun modelini içerir.

    Attributes:
        kredi_durum: KrediModeli nesnesinin durumunu belirtir.
        kredi_musteri_id: KrediModeli nesnesinin ilişkili olduğu müşterinin id'si.
        kredi_faiz_orani: KrediModeli nesnesinin faiz oranını belirtir.
        kredi_son_tarih: KrediModeli nesnesinin son ödeme tarihini belirtir.
        kredi_tutar: KrediModeli nesnesinin kredi tutarını belirtir.
        kredi_ay: KrediModeli nesnesinin kredi ayını belirtir.
        kredi_geri_odeme: KrediModeli nesnesinin geri ödeme tutarını belirtir.
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
            tarih_date = datetime.strptime(tarih_str, "%Y-%m-%d").date()
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
    kredi_hesap_id: Mapped[int] = mapped_column(ForeignKey('hesap.id'), nullable=False)
    kredi_faiz_orani: Mapped[float] = mapped_column()
    kredi_son_tarih: Mapped[datetime] = mapped_column()
    kredi_tutar: Mapped[float] = mapped_column()

    kredi_ay: Mapped[int] = mapped_column(nullable=True)
    kredi_geri_odeme: Mapped[float] = mapped_column(nullable=True)




