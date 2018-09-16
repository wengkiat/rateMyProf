"""
Definition of user side of the API. Allows clients to login or allows us to create a new client
"""

import http

from flask_jwt_extended import jwt_required, create_access_token
from flask import Blueprint
from app import logger,db
from flask import jsonify, request
from app.models import User


users = Blueprint('users',__name__)


@users.route('/V1/login', methods=['POST'])
@users.route('/login', methods=['POST'])
def login():
    """Returns an access token to be used with bearer-token API access for the POSTed credentials"""
    logger.debug('Start login process')
    if not request.is_json:
        logger.debug('JSON is not provided')
        return jsonify({"msg": "Missing JSON in request"}), http.HTTPStatus.UNSUPPORTED_MEDIA_TYPE

    username = request.json.get('username', None).lower()
    password = request.json.get('password', None)
    if not username:
        logger.debug('Username is not provided')
        return jsonify({"msg": "Missing username parameter"}), http.HTTPStatus.BAD_REQUEST
    if not password:
        logger.debug('Password is not provided')
        return jsonify({"msg": "Missing password parameter"}), http.HTTPStatus.BAD_REQUEST

    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        logger.debug('Credentials do not match')
        return jsonify({"msg": "Bad username or password"}), http.HTTPStatus.UNAUTHORIZED

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=username)
    logger.debug('Token successfully created')
    return jsonify(access_token=access_token), http.HTTPStatus.OK


@users.route('/register', methods=['POST'])
@jwt_required
def register():
    """Creates a user in the database to be used for accessing the API"""
    logger.debug('Start registration process')

    if not request.is_json:
        logger.debug('JSON is not provided')
        return jsonify({"msg": "Missing JSON in request"}), http.HTTPStatus.UNSUPPORTED_MEDIA_TYPE

    username = request.json.get('username', None).lower()
    password = request.json.get('password', None)

    if not username:
        logger.debug('Username is not provided')
        return jsonify({"msg": "Missing username parameter"}), http.HTTPStatus.BAD_REQUEST
    if not password:
        logger.debug('Password is not provided')
        return jsonify({"msg": "Missing password parameter"}), http.HTTPStatus.BAD_REQUEST

    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify("User created successfully"), http.HTTPStatus.OK
