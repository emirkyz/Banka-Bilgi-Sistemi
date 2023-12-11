"""
MusteriModel.py dosyası, müşteri tablosunun modelini içerir.

"""
from typing import List

from flask_sqlalchemy.session import Session
from sqlalchemy import ForeignKey, select, event
from sqlalchemy.orm import Mapped, mapped_column, relationship

from veri.veritabani import db
from veri.modeller.KrediModel import KrediModeli
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
    musteri_kredileri: Mapped[list["KrediModeli"]] = relationship(backref="kredi")

    musteri_total_kredi: Mapped[float] = mapped_column(nullable=True, default=0)
    musteri_kredi_skor: Mapped[float] = mapped_column(nullable=True, default=0)
    musteri_total_kredi_tutar: Mapped[float] = mapped_column(nullable=True, default=1.0)


def inser_kredi_skoru_guncelle(mapper, connection, target):
    """
    Kredi skoru güncelleme işlemini gerçekleştiren fonksiyon.

    Formül: (w1 * kredi_kullanımı) + (w2 * aktif_kredi_oranı)
    Burada w1 ve w2 ağırlık değerleridir.
    w1 = 0.4
    w2 = 0.6

    kredi_kullanımı = (aktif kredilerin toplam tutarı / toplam kredilerin toplam tutarı)
    aktif_kredi_oranı = (aktif kredi sayısı / toplam kredi sayısı)

    :param mapper: SQLAlchemy mapper.
    :param connection: SQLAlchemy connection.
    :param target: KrediModeli nesnesi.
    """
    print("Ekleme İşlemi")
    new_session = Session(db)
    new_session.begin()

    active = 0

    sorgu = select(MusteriModeli).where(MusteriModeli.id == target.kredi_musteri_id)

    active = 0
    musteri = new_session.scalars(sorgu).first()
    krediler = musteri.musteri_kredileri.copy()
    krediler.append(target)
    total = len(musteri.musteri_kredileri) + 1

    print(f"total: {total}")

    aktif_total = 0
    passive_total = 0
    if total < 5:
        musteri.musteri_total_kredi = total
        new_session.commit()
        return
    else:
        for kredi in krediler:
            if kredi.kredi_durum == "Aktif":

                active += 1
            else:
                pass
            if kredi.kredi_durum == "Aktif":

                aktif_total += kredi.kredi_tutar
            else:

                passive_total += kredi.kredi_tutar

        print(f"aktif toplam: {aktif_total}")

        print(f"pasif toplam: {passive_total}")
        toplam_kredi_tutar = aktif_total + passive_total
        kredi_kullanımı = ((aktif_total / toplam_kredi_tutar))  # *100
        aktif_kredi_oranı = (active / total)  # *100
        print(f"kredi kullanımı: {kredi_kullanımı}")
        print(f"aktif kredi oranı: {aktif_kredi_oranı}")

        w1 = 0.4
        w2 = 0.6

        score = ((w1 * kredi_kullanımı) + (w2 * aktif_kredi_oranı))

        print(f"kredi skoru: {score}")
        print(f"toplam kredi tutar: {toplam_kredi_tutar}")

        # score = (1-(active / total)) + (total//100) + (toplam_kredi_tutar // 1000000)
        musteri.musteri_kredi_skor = score
        musteri.musteri_total_kredi = total
        musteri.musteri_total_kredi_tutar = toplam_kredi_tutar

        new_session.commit()
        new_session.close()


def delete_kredi_skoru_guncelle(mapper, connection, target):
    print("Silme İşlemi")
    new_session = Session(db)
    new_session.begin()

    musteri = target.kredi
    krediler = musteri.musteri_kredileri

    # for kredi in musteri:
    #     print(kredi.id)
    # print(musteri)
    # new_session.commit()

    active = 0
    total = len(krediler)
    aktif_total = 0
    passive_total = 0

    if total < 5:
        musteri.musteri_total_kredi = total
        connection.execute(
            MusteriModeli.__table__.update().where(MusteriModeli.id == musteri.id).values(musteri_kredi_skor=0,
                                                                                          musteri_total_kredi=total))
        new_session.commit()
        return
    else:
        for kredi in krediler:
            if kredi.kredi_durum == "Aktif":

                active += 1
            else:
                pass
            if kredi.kredi_durum == "Aktif":

                aktif_total += kredi.kredi_tutar
            else:

                passive_total += kredi.kredi_tutar

        print(f"aktif toplam: {aktif_total}")

        print(f"pasif toplam: {passive_total}")
        toplam_kredi_tutar = aktif_total + passive_total
        kredi_kullanımı = ((aktif_total / toplam_kredi_tutar))  # *100
        aktif_kredi_oranı = (active / total)  # *100
        print(f"kredi kullanımı: {kredi_kullanımı}")
        print(f"aktif kredi oranı: {aktif_kredi_oranı}")

        w1 = 0.4
        w2 = 0.6

        score = ((w1 * kredi_kullanımı) + (w2 * aktif_kredi_oranı))

        print(f"kredi skoru: {score}")
        print(f"toplam kredi tutar: {toplam_kredi_tutar}")

        # score = (1-(active / total)) + (total//100) + (toplam_kredi_tutar // 1000000)

        connection.execute(
            MusteriModeli.__table__.update().where(MusteriModeli.id == musteri.id).values(musteri_kredi_skor=score,
                                                                                          musteri_total_kredi=total,
                                                                                          musteri_total_kredi_tutar=toplam_kredi_tutar))
        new_session.commit()


@event.listens_for(KrediModeli, "after_insert")
@event.listens_for(KrediModeli, "after_update")
def kredi_skor_guncelle(mapper, connection, target):
    """
    Bu fonksiyon, kredi ekleme ve güncelleme işlemlerinden sonra kredi skorunu günceller.
    """
    inser_kredi_skoru_guncelle(mapper, connection, target)


@event.listens_for(KrediModeli, "after_delete")
def kredi_skor_guncelle(mapper, connection, target):
    """
    Bu fonksiyon, kredi silme işleminden sonra kredi skorunu günceller.
    """
    delete_kredi_skoru_guncelle(mapper, connection, target)


