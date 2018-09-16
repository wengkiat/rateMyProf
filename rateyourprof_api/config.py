import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    # ...
    # DEBUG = False
    # TESTING = False
    # CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
    #     'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


# class TestingConfig(Config):
#     TESTING = True


class SetupEnv(object):
    FLASK_PORT = os.environ.get('FLASK_PORT') or 4000
    TEST_PASSWORD = os.environ.get('TEST_PASSWORD')
    TEST_USERNAME = os.environ.get('TEST_USERNAME')
    LOG_PATH = os.environ.get('LOG_PATH') or "rateyourprof.log"
    DEBUG = os.environ.get('DEBUG') or True
