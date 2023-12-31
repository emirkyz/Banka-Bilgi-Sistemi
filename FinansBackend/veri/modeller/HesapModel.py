from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from veri.modeller.TemelVeriSinif import TemelVeriSinifi


class HesapModeli(TemelVeriSinifi):
    """
        Bu sınıf, veritabanındaki "hesap" tablosunun kolonlarını temsil ediyor.

        Parameters:
            hesap_AcanSube: Hesabı açan şubenin id'si
            hesap_ParaBirim: Hesabın para birimi
            hesap_bakiye: Hesabın bakiyesi
            hesap_kredileri: Hesabın kredileri
            hesap_musteri_id: Hesabın ait olduğu müşteri id'si

    """
    __tablename__ = 'hesap'

    hesap_AcanSube: Mapped[int] = mapped_column(ForeignKey('sube.id'), nullable=False)
    hesap_ParaBirim: Mapped[str] = mapped_column(nullable=False)
    hesap_bakiye: Mapped[float] = mapped_column(nullable=True, default=0)
    hesap_kredileri: Mapped[List["KrediModeli"]] = relationship()
    hesap_musteri_id: Mapped[int] = mapped_column(ForeignKey('musteri.id'))
