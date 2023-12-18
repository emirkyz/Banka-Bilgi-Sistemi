"""
Veritabanı bağlantısı için gerekli olan SQLAlchemy nesnesini oluşturur.
"""
from flask_sqlalchemy import SQLAlchemy
from veri.modeller.TemelVeriSinif import TemelVeriSinifi

db = SQLAlchemy(model_class=TemelVeriSinifi)
