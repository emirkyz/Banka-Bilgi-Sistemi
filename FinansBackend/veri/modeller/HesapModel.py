from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from veri.modeller.TemelVeriSinif import TemelVeriSinifi


class HesapModeli(TemelVeriSinifi):
    """
        Bu sınıf, veritabanındaki "hesap" tablosunun kolonlarını temsil ediyor.

    """
    __tablename__ = 'hesap'

    # hesap_id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)

    hesap_AcanSube: Mapped[int] = mapped_column(ForeignKey('sube.id'), nullable=False)
    # hesap_HesapNo: Mapped[str] = mapped_column(nullable=False) # TODO: Bir algoritma ile hesap numarası oluşturulacak
    hesap_ParaBirim: Mapped[str] = mapped_column(nullable=False)
    hesap_bakiye: Mapped[float] = mapped_column(nullable=True, default=0)
    # hesap_Aciklama: Mapped[str] = mapped_column(nullable=False)

    hesap_kredileri: Mapped[List["KrediModeli"]] = relationship()

    hesap_musteri_id : Mapped[int] = mapped_column(ForeignKey('musteri.id'))
    hesap_fatura_id : Mapped[List["FaturaModeli"]] = relationship()
    hesap_hareket : Mapped[List["HesapHaraketModeli"]] = relationship()
