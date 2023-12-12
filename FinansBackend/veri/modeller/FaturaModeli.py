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

        Attributes:
            fatura_musteri_id: Faturanın ait olduğu müşteri id'si
            fatura_hesap_id: Faturanın ait olduğu hesap id'si
            fatura_miktar: Fatura miktarı
            fatura_tarih: Fatura tarihi
            fatura_son_tarih: Fatura son ödeme tarihi
    """

    __tablename__ = 'fatura'

    # fatura_id :Mapped[int] =  mapped_column(autoincrement=True, primary_key=True)

    fatura_musteri_id: Mapped[int] = mapped_column(ForeignKey('musteri.id'))
    fatura_hesap_id: Mapped[int] = mapped_column(ForeignKey('hesap.id'))

    fatura_miktar: Mapped[float] = mapped_column(nullable=False,default=0)
    fatura_türü: Mapped[str] = mapped_column(nullable=False)


