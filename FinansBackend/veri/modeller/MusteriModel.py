"""
MusteriModel.py dosyası, müşteri tablosunun modelini içerir.

"""
from typing import List

from sqlalchemy import ForeignKey, select
from sqlalchemy.orm import Mapped, mapped_column, relationship

from veri.modeller.TemelVeriSinif import TemelVeriSinifi


class MusteriModeli(TemelVeriSinifi):
    """
    Bu sınıf, veritabanındaki "musteri" tablosunun kolonlarını temsil ediyor.

    Attributes:
        musteri_adi: MusteriModeli nesnesinin adını belirtir.
        musteri_soyad: MusteriModeli nesnesinin soyadını belirtir.
        musteri_tc: MusteriModeli nesnesinin tc'sini belirtir.
        musteri_imza: MusteriModeli nesnesinin imzasını belirtir.
        musteri_sube_id: MusteriModeli nesnesinin ilişkili olduğu şube tablosunun id'si.
        musteri_hesap_id: MusteriModeli nesnesinin ilişkili olduğu hesabun id'si.
        musteri_fatura_id: MusteriModeli nesnesinin ilişkili olduğu faturaların id'leri.
        musteri_kredileri: MusteriModeli nesnesinin ilişkili olduğu kredlerin id'leri.
        musteri_kredi_skor: MusteriModeli nesnesinin kredi skorunu belirtir.
    """
    __tablename__ = 'musteri'

    musteri_adi: Mapped[str] = mapped_column(nullable=False)
    musteri_soyad: Mapped[str] = mapped_column(nullable=False)
    musteri_tc: Mapped[str] = mapped_column(nullable=False)
    musteri_imza: Mapped[str] = mapped_column(nullable=False)  # TODO: imza resmi base64 olarak kaydedilecek

    musteri_sube_id: Mapped[int] = mapped_column(ForeignKey('sube.id'), nullable=False)
    musteri_hesap_id: Mapped[List["HesapModeli"]] = relationship()
    musteri_fatura_id: Mapped[List["FaturaModeli"]] = relationship()
    musteri_kredileri: Mapped[list["KrediModeli"]] = relationship()
    musteri_total_kredi: Mapped[float] = mapped_column(nullable=True, default=0)
    musteri_kredi_skor: Mapped[float] = mapped_column(nullable=True, default=0)

