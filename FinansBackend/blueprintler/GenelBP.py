"""
GenelBP.py dosyası, genel blueprint oluşturmak için kullanılır.
Genel bir blueprint oluşturarak kolay bir şekilde yazılma yeni blueprintler eklenebilir.

"""

from flask import Blueprint, abort, request
from sqlalchemy import select, inspect

from blueprintler.VeriSorgulama import sorgulama
from veri import db


def GenelBP(veri_sinifi: type, bp_adi: str = "genel_bp"):
    """
    Genel bir blueprint oluşturur.
    :param veri_sinifi: Blueprintin hangi veri sınıfı için oluşturulacağını belirtir.
    :param bp_adi: Blueprintin adını belirtir.
    :return: Blueprint nesnesini döndürür.
    """
    bp = Blueprint(bp_adi, __name__)

    @bp.route('/', methods=['GET'])
    @bp.route('', methods=['GET'])
    @bp.route('/s/<int:sayfa_no>', methods=['GET'])
    @bp.route('/k/<int:kayit_sayisi>/', methods=['GET'])
    @bp.route('/s/<int:sayfa_no>/k/<int:kayit_sayisi>', methods=['GET'])
    def listele(sayfa_no: int = 0, kayit_sayisi: int = 10):
        """
        Veri tabanındaki verileri listeler.
        :param sayfa_no: Sayfa numarası
        :param kayit_sayisi: Sayfada kaç kayıt olacak
        :return: Verileri döndürür.
        """

        sorgu = select(veri_sinifi)
        sorgu = sorgulama(sorgu, veri_sinifi, sayfa_no, kayit_sayisi)
        veriler = db.session.scalars(sorgu).all()

        return [veri.to_dict() for veri in veriler]

    @bp.route('/<int:id>', methods=['GET'])
    def bul(id):
        """
        Veri tabanındaki id'si verilen veriyi bulur.
        :param id: Verinin id'si
        :return: Veriyi döndürür.
        """
        sorgu = select(veri_sinifi).where(veri_sinifi.id == id)
        veri = db.session.scalars(sorgu).one()

        return veri.to_dict()

    @bp.route('/', methods=['POST'])
    @bp.route('', methods=['POST'])
    def ekle():
        """
        Veri tabanına yeni bir veri ekler.
        :return: Eklenen veriyi to_dict() fonksiyonu ile döndürür.
        """
        veri = veri_sinifi()
        sutunlar = [col.key for col in inspect(veri).mapper.column_attrs]
        for sutun in request.json:
            if sutun in sutunlar:
                setattr(veri, sutun, request.json[sutun])
            else:
                return abort(500)
        # veri.manav_adi = request.json['manav_adi']
        # veri.manav_adresi = request.json['manav_adresi']
        # veri.manav_tel = request.json['manav_tel']

        db.session.add(veri)
        db.session.commit()
        # if "kredi_musteri_id" in sutunlar:
        #     get_credits(veri)

        return veri.to_dict()

    @bp.route('/<int:id>', methods=['PUT'])
    def guncelle(id):
        """
        Veri tabanındaki veriyi günceller.
        :param id: Verinin id'si
        :return: Güncellenen veriyi to_dict() fonksiyonu ile döndürür.
        """

        sorgu = select(veri_sinifi).where(veri_sinifi.id == id)
        veri = db.session.scalars(sorgu).one()

        sutunlar = [col.key for col in inspect(veri).mapper.column_attrs]
        for sutun in request.json:
            if sutun in sutunlar:
                setattr(veri, sutun, request.json[sutun])
            else:
                return abort(500)

        # manav.manav_adi = request.json['manav_adi']
        # manav.manav_adresi = request.json['manav_adresi']
        # manav.manav_tel = request.json['manav_tel']

        db.session.commit()
        # if "kredi_musteri_id" in sutunlar:
        #     get_credits(veri)
        return veri.to_dict()

    @bp.route('/<int:id>', methods=['DELETE'])
    def sil(id):
        """
        Veri tabanındaki id'si verilen veriyi siler.
        :param id: Verinin id'si
        :return: Silinen veriyi to_dict() fonksiyonu ile döndürür.
        """
        sorgu = select(veri_sinifi).where(veri_sinifi.id == id)
        veri = db.session.scalars(sorgu).one()
        db.session.delete(veri)
        db.session.commit()

        return {"silinen": veri.to_dict()}

    @bp.route('/bakiye/e/<int:id>/<int:miktar>', methods=['GET'])
    def increase_hesap_bakiye(id, miktar):
        sorgu = select(veri_sinifi).where(veri_sinifi.id == id)
        veri = db.session.scalars(sorgu).one()

        veri.hesap_bakiye = veri.hesap_bakiye + miktar
        if veri.hesap_bakiye < 0:
            return {"hata": "bakiye yetersiz"}
        db.session.commit()
        return {"güncellenen hesap": veri.to_dict()}

    @bp.route('/bakiye/c/<int:id>/<int:miktar>', methods=['GET'])
    def decrease_hesap_bakiye(id, miktar):
        print("inside decrease")
        sorgu = select(veri_sinifi).where(veri_sinifi.id == id)
        veri = db.session.scalars(sorgu).one()

        veri.hesap_bakiye = veri.hesap_bakiye - miktar
        print(veri.hesap_bakiye)
        if veri.hesap_bakiye < 0:
            print("inside if")
            return {"hata": "bakiye yetersiz, işlem gerçekleştirilemedi"}
        db.session.commit()

        return {"güncellenen hesap": veri.to_dict()}

    @bp.route('/odeme/<int:id>', methods=['GET'])
    def odeme(id):
        sorgu = select(veri_sinifi).where(veri_sinifi.id == id)
        veri = db.session.scalars(sorgu).one()

        veri.fatura_durum = "Ödendi"
        db.session.commit()
        return {"güncellenen fatura": veri.to_dict()}

    return bp
