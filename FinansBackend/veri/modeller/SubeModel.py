"""
    Bu modülde SubeModeli adında bir sınıf tanımlıyoruz.
    Bu sınıf, veritabanındaki "sube" tablosunun kolonlarını temsil ediyor.
    Bu sınıfın örnekleri, veritabanındaki "sube" tablosundaki kayıtları temsil ediyor.
"""

from typing import List

from sqlalchemy.orm import mapped_column, Mapped, relationship

from veri.modeller.TemelVeriSinif import TemelVeriSinifi


class SubeModeli(TemelVeriSinifi):
    """
        Bu sınıf, veritabanındaki "sube" tablosunun kolonlarını temsil ediyor.

        Attributes:
            sube_adi: Şube adı
            sube_adresi: Şube adresi
            sube_tel: Şube telefonu
            sube_musterileri: Şubeye kayıtlı müşteriler

    """
    __tablename__ = 'sube'

    # sube_id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    sube_adi: Mapped[str] = mapped_column(nullable=False)
    sube_adresi: Mapped[str] = mapped_column(nullable=False)
    sube_tel: Mapped[str] = mapped_column(nullable=True)
    sube_musterileri: Mapped[List["MusteriModeli"]] = relationship(backref="musteri")
    sube_hesaplar: Mapped[List["HesapModeli"]] = relationship()
