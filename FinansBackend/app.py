"""
    Bu dosya Flask uygulamasını başlatır.
"""
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from blueprintler import api_bp
from veri import *


def create_app():
    """
    Flask uygulamasını başlatır.
    :return: Flask uygulamasını döndürür.
    """
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://finans_user:12345@localhost:5432/Finans'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://finans_user:12345@localhost:5432/Finans'
    db.init_app(app)
    migrate = Migrate()
    migrate.init_app(app, db)
    #you_track test
    @app.route('/')
    def index():
        """
        Sunucunun çalışıp çalışmadığını kontrol eder.
        """
        return {"sunucu": "OK"}

    app.register_blueprint(api_bp, url_prefix='/api')
    CORS(app)
    return app
