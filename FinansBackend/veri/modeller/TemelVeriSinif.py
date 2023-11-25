"""
Bu modülde veritabanı modellerinin ortak özelliklerini içeren TemelVeriSinifi sınıfı bulunmaktadır.
"""
from datetime import datetime

from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped


class TemelVeriSinifi(DeclarativeBase):
    """
    Bu sınıf, veritabanı modellerinin ortak özelliklerini içerir.

    Attributes:
        id: Oluşturulan verinin id'si.
        olusturulma_tarihi: Oluşturulan verinin oluşturulma tarihi.
        guncellenme_tarihi: Oluşturulan verinin güncellenme tarihi.
    """
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    olusturulma_tarihi: Mapped[datetime] = mapped_column(default=datetime.now)
    guncellenme_tarihi: Mapped[datetime] = mapped_column(default=datetime.now, onupdate=datetime.now)

    def to_dict(self) -> dict:
        """
        Tablo nesnesinin kolonlarını sözlük olarak döndürür.
        """
        return {kolon.name: getattr(self, kolon.name) for kolon in self.__table__.columns}
