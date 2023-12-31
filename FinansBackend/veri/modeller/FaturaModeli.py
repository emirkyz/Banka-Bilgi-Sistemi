"""
FaturaModeli.py dosyası modeller klasörü altında yer alır.
Bu dosyada FaturaModeli adında bir sınıf tanımlıyoruz.
Bu sınıf, veritabanındaki "fatura" tablosunun kolonlarını temsil ediyor.

"""

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from veri.modeller.TemelVeriSinif import TemelVeriSinifi


class FaturaModeli(TemelVeriSinifi):
    """
        Bu sınıf, veritabanındaki "fatura" tablosunun kolonlarını temsil ediyor.

        Parameters:
            fatura_musteri_id: Faturanın ait olduğu müşteri id'si
            fatura_miktar: Fatura miktarı
            fatura_durum: Fatura Durumu
            fatura_turu: Fatura türü
            """

    __tablename__ = 'fatura'

    fatura_musteri_id: Mapped[int] = mapped_column(ForeignKey('musteri.id'))
    fatura_miktar: Mapped[float] = mapped_column(nullable=False, default=0)
    fatura_turu: Mapped[str] = mapped_column(nullable=False)
    fatura_durum: Mapped[str] = mapped_column(nullable=True, default="Ödenmedi")
