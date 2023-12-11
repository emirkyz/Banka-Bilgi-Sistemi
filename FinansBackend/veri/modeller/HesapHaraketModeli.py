"""
HesapHaraketModeli.py dosyası, hesap hareketleri tablosu için veri modelini içerir.
"""
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from veri.modeller.TemelVeriSinif import TemelVeriSinifi


class HesapHaraketModeli(TemelVeriSinifi):
    """
        Bu sınıf, veritabanındaki "hesapHaraket" tablosunun kolonlarını temsil ediyor.

        Attributes:
            hareket_hesap_id: Hareketin ait olduğu hesap id'si
            hareketMiktar: Hareket miktarı
            haraketTarih: Hareket tarihi
            hareketAciklama: Hareket açıklaması
    """
    __tablename__ = 'hesapHaraket'

    # hareketHesap: Mapped[str] = mapped_column(nullable=False)
    hareket_hesap_id: Mapped[int] = mapped_column(ForeignKey('hesap.id'))
    hareketMiktar: Mapped[str] = mapped_column(nullable=False)
    # haraketTarih: Mapped[str] = mapped_column(nullable=False)
    # hareketAciklama: Mapped[str] = mapped_column(nullable=False)

    hareket_turu: Mapped[str] = mapped_column(nullable=False)
