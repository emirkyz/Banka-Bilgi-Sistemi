"""
Bu modül veri sorgulama işlemlerini yapar

"""
import datetime

from flask import request, abort
from sqlalchemy import Select, inspect


def sorgulama(sorgu: Select, veri_sinifi: type, sayfa_no: int = 0, kayit_sayisi: int = 10):
    """
    Sorgulama dilini çalıştıran fonksiyondur.
    :param sayfa_no: Sayfa numarası
    :param kayit_sayisi: Sayfada kaç kayıt olacak
    :param sorgu: Sorgu nesnesi
    :param veri_sinifi: Sorgunun çalıştırılacağı veri sınıfı
    :return: Yeni sorgu nesnesi.

    1-Sayfalama ve Kayıt sayısı
        Bu bilgiler parametrik olarak gelecek ve url içinde gelecek.
        http://localhost:5000/api/v1/veri_sinifi/<sayfa_no=1>/<kayit_sayisi=10>
        şeklinde olacak


    2-Sıralama
        Sıralama bilgileri url içinde gelecek ve query string ile gelecek.
        http://localhost:5000/api/v1/veri_sinifi/?sırala=<alanadi1>&sırala=<alanadi2>
        Eğer alan adı ar_ ile başlıyorsa o alana göre artan sıralama yapılacak.
        Eğer alan adı az_ ile başlıyorsa o alana göre azalan sıralama yapılacak.


    3-Filtreleme
        Filtreleme bilgileri url içinde ve query string ile gelecek.
        http://localhost:5000/api/v1/veri_sinifi/?filtre=<alanadi1>&filtre=<alanadi2>
        i) Filtre listesini elde ederiz.
        ii) Her filtreyi alan, operator ve değer olarak ayırırız.
        iii) Filtreyi çalıştırırız.
    """

    sorgu = sorgu.limit(kayit_sayisi)
    sorgu = sorgu.offset(sayfa_no * kayit_sayisi)

    siralama_alanlari = request.args.getlist('sırala')
    sutunlar = [col.key for col in inspect(veri_sinifi).mapper.column_attrs]
    for alan_adi in siralama_alanlari:
        if alan_adi.startswith("ar_"):
            gercek_alan_adi = alan_adi[3:]
            sorgu = sorgu.order_by(getattr(veri_sinifi, gercek_alan_adi).asc())
        elif alan_adi.startswith("az_"):
            gercek_alan_adi = alan_adi[3:]
            sorgu = sorgu.order_by(getattr(veri_sinifi, gercek_alan_adi).desc())

    # FİLTRELEME
    # 1- Filtre listesini elde edelim
    filtre = request.args.getlist('filtre')
    if len(filtre) > 0:
        # 2 - her filtreyi alan, operator ve değer olarak ayıralım
        operator_karakterleri = list("<>=~!|")
        ayrilmis_filtre = []

        for filtre_metni in filtre:
            alan_adi = []
            operator = []
            deger = []

            adim = 0
            for karakter in filtre_metni:
                if adim == 0 and karakter not in operator_karakterleri:
                    alan_adi.append(karakter)
                elif adim == 0 and karakter in operator_karakterleri:
                    adim = 1
                    operator.append(karakter)
                elif adim == 1 and karakter in operator_karakterleri:
                    operator.append(karakter)
                elif adim == 1 and karakter not in operator_karakterleri:
                    adim = 2
                    deger.append(karakter)
                else:
                    deger.append(karakter)

            alan_adi_str = "".join(alan_adi)
            operator_str = "".join(operator)
            deger_str = "".join(deger)

            ayrilmis_filtre.append((alan_adi_str, operator_str, deger_str))

            # Filtreyi calistirma
            tablo_alanlari = inspect(veri_sinifi).mapper.column_attrs
            for alan, op, deger in ayrilmis_filtre:
                # 1- alanın veri türünü bulalım
                tablo_alani = tablo_alanlari[alan].class_attribute
                if tablo_alani.type.python_type in [int, float]:
                    # Sayı filtrelemesi
                    kabul_edilen_operatorler = ["=", "<", ">", "<=", ">=", "~"]
                    if op not in kabul_edilen_operatorler:
                        abort(500)
                    else:
                        if op == "~":
                            degerler = [float(d) for d in deger.split(",")]
                            sorgu = sorgu.where(tablo_alani.between(degerler[0], degerler[1]))


                        else:
                            if op == ">":
                                sorgu = sorgu.where(tablo_alani > float(deger))
                            elif op == "<":
                                sorgu = sorgu.where(tablo_alani < float(deger))
                            elif op == ">=":
                                sorgu = sorgu.where(tablo_alani >= float(deger))
                            elif op == "<=":
                                sorgu = sorgu.where(tablo_alani <= float(deger))
                            elif op == "=":
                                sorgu = sorgu.where(tablo_alani == float(deger))

                elif tablo_alani.type.python_type in [str]:
                    kabul_edilen_operatorler = ["|=", "=|", "|=|", "!=", "=!", "!=!", "=", "<", ">"]
                    if op not in kabul_edilen_operatorler:
                        abort(500)
                    else:
                        if op == "|=":
                            sorgu = sorgu.where(tablo_alani.startswith(deger))
                        elif op == "=|":
                            sorgu = sorgu.where(tablo_alani.endswith(deger))
                        elif op == "|=|":
                            sorgu = sorgu.where(tablo_alani.contains(deger))
                        elif op == "!=":
                            sorgu = sorgu.where(tablo_alani.istartswith(deger))
                        elif op == "=!":
                            sorgu = sorgu.where(tablo_alani.iendswith(deger))
                        elif op == "!=!":
                            sorgu = sorgu.where(tablo_alani.icontains(deger))
                        # elif op =="<":
                        #     tablo_tarih = datetime.datetime.strptime(tablo_alani, "%d-%m-%y").date()
                        #     deger_tarih = datetime.datetime.strptime(deger, "%d-%m-%y").date()
                        #     sorgu = sorgu.where(tablo_tarih < deger_tarih)
                        # elif op ==">":
                        #     tablo_tarih = datetime.datetime.strptime(tablo_alani, "%d-%m-%y").date()
                        #     deger_tarih = datetime.datetime.strptime(deger, "%d-%m-%y").date()
                        #     sorgu = sorgu.where(tablo_tarih > deger_tarih)

                    # Metin filtrelemesi
                # Tarih formatı = YYYY MM DD
                elif tablo_alani.type.python_type in [datetime.datetime]:
                    tarih = datetime.datetime.strptime(deger, "%Y-%m-%d").date()
                    kabul_edilen_operatorler = ["=", "<", ">", "<=", ">=", "~"]
                    if op not in kabul_edilen_operatorler:
                        abort(500)
                    else:
                        if op == "~":
                            degerler = [datetime.datetime.strptime(d, "%Y %m %d").date() for d in deger.split(",")]
                            sorgu = sorgu.where(tablo_alani.between(degerler[0], degerler[1]))
                        else:
                            if op == ">":
                                sorgu = sorgu.where(tablo_alani > tarih)
                            elif op == "<":
                                sorgu = sorgu.where(tablo_alani < tarih)
                            elif op == ">=":
                                sorgu = sorgu.where(tablo_alani >= tarih)
                            elif op == "<=":
                                sorgu = sorgu.where(tablo_alani <= tarih)
                            else:
                                sorgu = sorgu.where(tablo_alani.between(tarih, tarih + datetime.timedelta(days=1)))
                    # Tarih filtrelemesi
    return sorgu
