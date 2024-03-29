"""
HesapHaraketModeli.py dosyası, hesap hareketleri tablosu için veri modelini içerir.
"""
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from veri.modeller.TemelVeriSinif import TemelVeriSinifi


class HesapHaraketModeli(TemelVeriSinifi):
    """
        Bu sınıf, veritabanındaki "hesapHaraket" tablosunun kolonlarını temsil ediyor.

        Parameters:
            hareket_musteri_id: Hareketin ait olduğu müşteri id'si
            hareketMiktar: Hareket miktarı
            hareketAciklama: Hareket açıklaması
    """
    __tablename__ = 'hesapHaraket'

    hareket_musteri_id: Mapped[int] = mapped_column(ForeignKey('musteri.id'))
    hareketMiktar: Mapped[str] = mapped_column(nullable=False)
    hareket_turu: Mapped[str] = mapped_column(nullable=False)
