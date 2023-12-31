"""
Kredi skorunu güncelleyen fonksiyon
"""
import copy
from datetime import datetime
from sqlalchemy import select
from veri import MusteriModeli
from veri.modeller.FaturaModeli import FaturaModeli
from veri.modeller.KrediModel import KrediModeli
from veri.veritabani import db


def kredi_skor_update(musteri_id):
    """
    Kredi skorunu güncelleyen fonksiyon
    3 ayrı ağırlık değeri kullanılarak kredi skoru hesaplanır.
    Formül: (w1 * kredi_kullanımı) + (w2 * aktif_kredi_oranı) + (w3 * fatura_skor)
    Burada w1, w2 ve w3 ağırlık değerleridir.
    w1 = 0.4
    w2 = 0.4
    w3 = 0.2
    
    kredi_kullanımı = (aktif kredilerin toplam tutarı / toplam kredilerin toplam tutarı)
    aktif_kredi_oranı = (aktif kredi sayısı / toplam kredi sayısı)
    fatura_skor = (ödenen fatura sayısı / toplam fatura sayısı)
    Şeklinde hesaplanır.
    :return: None
    """
    w1 = 0.4
    w2 = 0.4
    w3 = 0.2

    sorgu = select(MusteriModeli).where(MusteriModeli.id == musteri_id)
    musteri = db.session.scalars(sorgu).first()

    # Önce kredi bilgilerini çekiyoruz

    sorgu2 = select(KrediModeli).where(KrediModeli.kredi_musteri_id == musteri_id)

    krediler = copy.deepcopy(db.session.scalars(sorgu2).all())

    # sonra fatura bilgilerini çekiyoruz
    sorgu = select(FaturaModeli).where(FaturaModeli.fatura_musteri_id == musteri_id)
    faturalar = copy.deepcopy(db.session.scalars(sorgu).all())
    total_fatura = len(faturalar)


    active = 0
    odenen = 0
    aktif_total = 0
    odenen_total = 0
    total = len(krediler)
    if total < 5:
        musteri.musteri_total_kredi = total
        musteri.musteri_kredi_durum = "Yeterli Kredi Yok"
        db.session.commit()
        print("total kredi sayısı 5 ten küçük")
        return
    else:
        # Krediler ile ilgili hesaplamaları yapıyoruz
        for kredi in krediler:
            if kredi.kredi_son_tarih.date() < datetime.now().date() and kredi.kredi_durum == "Aktif":
                sorgu4 = select(KrediModeli).where(KrediModeli.id == kredi.id)
                kredi2 = db.session.scalars(sorgu4).first()
                kredi2.kredi_durum = "Pasif"
                db.session.commit()
                continue

            else:
                if kredi.kredi_durum == "Aktif":
                    active += 1
                    aktif_total += kredi.kredi_tutar

                elif kredi.kredi_durum == "Ödendi":
                    odenen += 1
                    odenen_total += kredi.kredi_tutar
                else:
                    pass
            # Fatura ile ilgili hesaplamaları yapıyoruz
        for fatura in faturalar:
            if fatura.fatura_durum == "Ödendi":
                odenen += 1
                # odenen_total += fatura.fatura_miktar
            else:
                pass

        toplam_kredi_tutar = aktif_total + odenen_total
        kredi_kullanımı = ((aktif_total / toplam_kredi_tutar))
        aktif_kredi_oranı = (active / total)

        fatura_skor = odenen / total_fatura

        score = ((w1 * kredi_kullanımı) + (w2 * aktif_kredi_oranı) + (w3 * fatura_skor))

        # kredi alınabilirlik durumu belirleme #TODO: kredi alınabilirlik durumu belirlemeyi aktif et
        if score < 0.3:
            musteri.musteri_kredi_durum = "Kredi Alabilir (Az Riskli)"
        elif 0.3 <= score < 0.5:
            musteri.musteri_kredi_durum = "Kredi Alabilir (Orta Riskli)"
        elif 0.5 <= score < 0.7:
            musteri.musteri_kredi_durum = "Kredi Alamaz (Yüksek Riskli)"
        elif 0.7 <= score <= 1.0:
            musteri.musteri_kredi_durum = "Kredi Alamaz (Çok Yüksek Riskli)"

        print(f"score = {score}")
        musteri.musteri_kredi_skor = score
        musteri.musteri_total_kredi = total
        musteri.musteri_total_kredi_tutar = toplam_kredi_tutar
        db.session.commit()



    print("---------------------------------------------------------")
    print(f"toplam fatura inside tools function = {len(faturalar)}")
    print(f"toplam kredi inside tools function = {len(krediler)}")
    print("---------------------------------------------------------")
    return score
