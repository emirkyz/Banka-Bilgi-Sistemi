"""
Blueprintlerin tanımlandığı yer
"""
from flask import Blueprint

# from blueprintler.manav_blueprint import manav_bp
from blueprintler.GenelBP import GenelBP
from tools.kredi_skor_updater import kredi_skor_update
from veri import *

'''api versiyonu olarak bir blueprint oluşturuyoruz.'''
v1_bp = Blueprint('v1', __name__, url_prefix='/v1')


@v1_bp.route('/', methods=['GET'])
def index():
    """
    v1 blueprintinin index sayfası. v1 API çalışıyor ise "OK" döner.
    """
    return {'v1': ' OK '}


'''Tek tek tüm veri modelleri için v1 blueprinti altında tüm blueprintleri register ediyoruz.'''

v1_bp.register_blueprint(GenelBP(MusteriModeli, 'musteri'), url_prefix='/musteri')
v1_bp.register_blueprint(GenelBP(SubeModeli, 'sube'), url_prefix='/sube')
v1_bp.register_blueprint(GenelBP(HesapModeli, "hesap"), url_prefix='/hesap')

v1_bp.register_blueprint(GenelBP(HesapHaraketModeli, "hesaphareket"), url_prefix='/hesaphareket')
v1_bp.register_blueprint(GenelBP(KrediModeli, "kredi"), url_prefix='/kredi')
v1_bp.register_blueprint(GenelBP(FaturaModeli, "fatura"), url_prefix='/fatura')

score_bp = Blueprint('score', __name__, url_prefix='/score')
v1_bp.register_blueprint(score_bp, url_prefix='/score')


@v1_bp.route('/score/<int:musteri_id>', methods=['GET'])
def score(musteri_id):
    sonuc = kredi_skor_update(musteri_id)
    return {'score': sonuc}


'''api blueprinti oluşturuyoruz.'''
api_bp = Blueprint('api', __name__, url_prefix='/api')

# v1_bp.register_blueprint(manav_bp , url_prefix='/manavlar')
'''api blueprintine v1 blueprintini register ediyoruz.'''
api_bp.register_blueprint(v1_bp, url_prefix='/v1')
