import logging
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config, SetupEnv
from helpers.logging import create_log_file


app = Flask(__name__)
app.config.from_object(Config)
db: SQLAlchemy = SQLAlchemy(app)
migrate = Migrate(app, db)
app.config['JSON_SORT_KEYS'] = False  # prevent sorting of keys


# for logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# create log file
create_log_file(logger, SetupEnv.LOG_PATH)

# get variables for api
FLASK_PORT = SetupEnv.FLASK_PORT
if SetupEnv.DEBUG == True:
    DEBUG = SetupEnv.DEBUG
else:
    DEBUG = False

# set token secret key from config file and configure jwt object
app.config['JWT_SECRET_KEY'] = Config.SECRET_KEY
jwt = JWTManager(app)


# avoid circular imports that why its at the bottom
from endpoints.endpoint_config import register_blueprints
register_blueprints(app)


# to make consuming our API possible directly from web clients
CORS(app)


# avoid circular imports that why its at the bottom
from app import routes, models



# @app.shell_context_processor
# def make_shell_context():
#     return {'db': db, 'User': User}