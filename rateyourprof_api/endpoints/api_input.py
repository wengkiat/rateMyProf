"""
Definition of input-side APIs. These allow clients to push data (reviews) into the system.
"""


import http

from flask_jwt_extended import jwt_required
from flask import Blueprint, jsonify, request
from app import db, logger
from app.models import Posts, Professors, PostTags
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

    # check if prof id is valid
    prof = Professors.query.filter(Professors.id == review_json['prof_id']).first()

    if prof is None:
        logger.debug('Professor id does not exist in database ', exc_info=True)
        return jsonify({"msg": "no such professor in database"}), http.HTTPStatus.BAD_REQUEST

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
        return jsonify({"msg": "unable to reach database"}), http.HTTPStatus.INTERNAL_SERVER_ERROR

    logger.info('Received new review')

    try:
        db.session.commit()

    except exc.SQLAlchemyError:
        return jsonify({"msg": "invalid data format"}), http.HTTPStatus.BAD_REQUEST


    db.session.flush() # to get post id of the post that was just posted
    print(new_review.id)
    # update tags
    # SHOULD BE CONVERTED TO A DB TRIGGER
    relation = {}
    for x in review_json['tags']:

        relation['post_id'] = new_review.id
        relation['tag_id'] = x
        new_relation = PostTags(**relation)
        db.session.add(new_relation)

    # update ratings and post counts
    # SHOULD BE CONVERTED TO A DB TRIGGER
    if prof.rating == 0:
        prof.rating = review_json['rating']

    else:
        prof.rating = ((prof.rating * prof.posts) + review_json['rating']) / (prof.posts + 1)

    prof.posts = prof.posts + 1
    db.session.commit()

    return jsonify('Upload of review successful'), http.HTTPStatus.CREATED


@endpoint_input.route('/V1/review/upvote/<string:post_id>', methods=['POST'])
@endpoint_input.route('/review/upvote/<string:post_id>', methods=['POST'])
@jwt_required
def upvote_review(post_id=None):

    if post_id is None:
        logger.debug('No string supplied during the call of /review/upvote/post_id endpoint')
        return jsonify({"msg": "please provide necessary arguments"}), http.HTTPStatus.PRECONDITION_FAILED

    try:
        post = Posts.query.filter_by(id=post_id).first()
        post.upvote = post.upvote + 1
        db.session.commit()

    except:
        logger.debug('Unable to reach database, database error', exc_info=True)
        return jsonify({"msg": "unable to reach database"}), http.HTTPStatus.INTERNAL_SERVER_ERROR

    return jsonify('msg: Upvote of review successful', ([post.serialize()])), http.HTTPStatus.OK


@endpoint_input.route('/V1/review/downvote/<string:post_id>', methods=['POST'])
@endpoint_input.route('/review/downvote/<string:post_id>', methods=['POST'])
@jwt_required
def downvote_review(post_id=None):

    if post_id is None:
        logger.debug('No string supplied during the call of /review/downvote/post_id endpoint')
        return jsonify({"msg": "please provide necessary arguments"}), http.HTTPStatus.PRECONDITION_FAILED

    try:
        post = Posts.query.filter_by(id=post_id).first()
        post.downvote = post.downvote + 1
        db.session.commit()

    except:
        logger.debug('Unable to reach database, database error', exc_info=True)
        return jsonify({"msg": "unable to reach database"}), http.HTTPStatus.INTERNAL_SERVER_ERROR

    return jsonify('msg: Downvote of review successful', ([post.serialize()])), http.HTTPStatus.OK
