"""
Definition of input-side APIs. These allow clients to push data (reviews) into the system.
"""


import http

from flask_jwt_extended import jwt_required
from flask import Blueprint, jsonify, request
from app import db, logger
from app.models import Posts
from sqlalchemy import exc


endpoint_input = Blueprint('endpoint_input', __name__)


@endpoint_input.route('/V1/review', methods=['POST'])
@endpoint_input.route('/review', methods=['POST'])
@jwt_required
def post_review():
    """ POST /review
    (saving new reviews)"""

    review_json = request.get_json()

    if review_json is None:
        return 'No JSON body provided', http.HTTPStatus.UNSUPPORTED_MEDIA_TYPE

    members = [attr for attr in dir(Posts) if not callable(getattr(Posts, attr)) and not attr.startswith("__") and not attr.startswith("_")]
    members.remove("metadata")  # remove
    members.remove("query")  # remove

    if 'prof_id' not in review_json:
        logger.debug('Client did not provide necessary fields', exc_info=True)
        return jsonify({"msg": "prof_id cannot be None"}), http.HTTPStatus.BAD_REQUEST

    review_data = {}
    for attr in members:
        if attr == 'id' or attr == 'time_posted':
            # ensure id is assigned by DB, given value is ignored
            # always override predictor time with default (db-local now())
            review_data[attr] = None
        else:
            if attr not in review_json:
                review_data[attr] = None
            else:
                review_data[attr] = review_json[attr]

    new_review = Posts(**review_data)

    try:
        db.session.add(new_review)
    except:
        logger.debug('Unable to reach database, database error', exc_info=True)
        return jsonify({"msg": "unable to reach database"}), http.HTTPStatus.BAD_REQUEST

    logger.info('Received new review')

    try:
        db.session.commit()

    except exc.SQLAlchemyError:
        return jsonify({"msg": "invalid data format"}), http.HTTPStatus.BAD_REQUEST

    return jsonify('Upload of review successful'), http.HTTPStatus.OK
