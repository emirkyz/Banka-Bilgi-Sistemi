import copy

from sqlalchemy import select

from veri import MusteriModeli
from veri.modeller.KrediModel import KrediModeli
from veri.modeller.FaturaModeli import FaturaModeli
# from veri.modeller.MusteriModel import MusteriModeli
from veri.veritabani import db


def kredi_skor_update(musteri_id):
    print("kredi skor update çalıştı")
    """
    Kredi skorlarını günceller.
    :return: None
    """
    w1 = 0.4
    w2 = 0.6



    sorgu = select(MusteriModeli).where(MusteriModeli.id == musteri_id)
    musteri = db.session.scalars(sorgu).first()
    # print(f"musteri id: {musteri.id}")
    # Önce kredi bilgilerini çekiyoruz

    sorgu = select(KrediModeli).where(KrediModeli.kredi_musteri_id == musteri_id)

    krediler = copy.deepcopy(db.session.scalars(sorgu).all())

    #sonra fatura bilgilerini çekiyoruz
    sorgu = select(FaturaModeli).where(FaturaModeli.fatura_musteri_id == musteri_id)
    faturalar = copy.deepcopy(db.session.scalars(sorgu).all())



    #Kredi ile ilgili hesaplamaları yapıyoruz
    active = 0
    passive = 0
    aktif_total = 0
    passive_total = 0
    total = len(krediler)
    if total < 5:
        musteri.musteri_total_kredi = total
        musteri.musteri_kredi_durum = "Yeterli Kredi Yok"
        db.session.commit()
        print("total kredi sayısı 5 ten küçük")
        return
    else:
        for kredi in krediler:
            if kredi.kredi_durum == "Aktif":
                active += 1
                aktif_total += kredi.kredi_tutar

            else:
                passive += 1
                passive_total += kredi.kredi_tutar
        toplam_kredi_tutar = aktif_total + passive_total
        kredi_kullanımı = ((aktif_total / toplam_kredi_tutar))
        aktif_kredi_oranı = (active / total)

        score = ((w1 * kredi_kullanımı) + (w2 * aktif_kredi_oranı))

        # kredi alınabilirlik durumu belirleme #TODO: kredi alınabilirlik durumu belirlemeyi aktif et
        if score < 0.3:
            musteri.musteri_kredi_durum = "Kredi Alabilir (Az Riskli)"
        elif 0.3 <= score < 0.5:
            musteri.musteri_kredi_durum = "Kredi Alabilir (Orta Riskli)"
        elif 0.5 <= score < 0.7:
            musteri.musteri_kredi_durum = "Kredi Alamaz (Yüksek Riskli)"
        elif 0.7 <= score < 1.0:
            musteri.musteri_kredi_durum = "Kredi Alamaz (Çok Yüksek Riskli)"

        print(f"score = {score}")
        musteri.musteri_kredi_skor = score
        musteri.musteri_total_kredi = total
        musteri.musteri_total_kredi_tutar = toplam_kredi_tutar
        db.session.commit()


    # Fatura ile ilgili hesaplamaları yapıyoruz


    # for i in range(len(faturalar)):
    #     print(faturalar[i].fatura_durum)
    print("---------------------------------------------------------")
    print(f"toplam fatura inside tools function = {len(faturalar)}")
    print(f"toplam kredi inside tools function = {len(krediler)}")
    print("---------------------------------------------------------")
    return score

