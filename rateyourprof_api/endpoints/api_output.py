"""
Definition of output-side APIs. These allow clients to retrieve the data from the database.
"""

import http
from flask_jwt_extended import jwt_required
from flask import Blueprint
from app import logger
from flask import jsonify, request
from app.models import Professors, Modules, Grades, Departments, Tags, Posts, PostTags
from helpers.output_api import get_args, get_results, get_single_result, get_all_results, get_search_results, get_all_results_with_joins, get_single_result_name


endpoint_output = Blueprint('endpoint_output', __name__)


@endpoint_output.route('/V1/professors/<string:search>', methods=['GET'])
@endpoint_output.route('/professors/<string:search>', methods=['GET'])
@jwt_required
def get_professor(search=None):
    """GET /professors/<string:search>
    (retrieve a specific professor with prof_id in the search term)"""

    if search is None:
        logger.debug('No string supplied during the call of /professors/search_term endpoint')
        return jsonify({"msg": "please provide necessary arguments"}), http.HTTPStatus.PRECONDITION_FAILED

    search = search.upper()
    return get_single_result(Professors, Departments, Modules, search)


@endpoint_output.route('/V1/professors/name/<string:name>', methods=['GET'])
@endpoint_output.route('/professors/name/<string:name>', methods=['GET'])
@jwt_required
def get_professor_by_name(name=None):
    """GET /professors/<string:search>
    (retrieve a specific professor with name in the search term)"""

    if name is None:
        logger.debug('No string supplied during the call of /professors/name/search_term endpoint')
        return jsonify({"msg": "please provide necessary arguments"}), http.HTTPStatus.PRECONDITION_FAILED

    name = name.upper()
    return get_single_result_name(Professors, Departments, name)


@endpoint_output.route('/V1/professors/search/<string:search>', methods=['GET'])
@endpoint_output.route('/professors/search/<string:search>', methods=['GET'])
@jwt_required
def search_professor(search=None):
    """GET /professors/<string:search>
    (search for a professor)"""
    if search is None:
        logger.debug('No string supplied during the call of /professors/search/prof_id endpoint')
        return jsonify({"msg": "please provide necessary arguments"}), http.HTTPStatus.PRECONDITION_FAILED

    search = search.upper()
    return get_search_results(Professors, Departments, search)


@endpoint_output.route('/V1/grades', methods=['GET'])
@endpoint_output.route('/grades', methods=['GET'])
@jwt_required
def get_grades():
    """GET /grades
    (retrieve all grades)"""

    return get_all_results(Grades)


@endpoint_output.route('/V1/tags', methods=['GET'])
@endpoint_output.route('/tags', methods=['GET'])
@jwt_required
def get_tags():
    """GET /tags
    (retrieve all tags)"""

    return get_all_results(Tags)


@endpoint_output.route('/V1/reviews/<string:prof_id>', methods=['GET'])
@endpoint_output.route('/reviews/<string:prof_id>', methods=['GET'])
@jwt_required
def get_reviews(prof_id):
    """GET /reviews/<string:prof_id>
    (retrieve all reviews for a professor)"""

    if prof_id is None:
        logger.debug('No string supplied during the call of reviews/prof_id endpoint')
        return jsonify({"msg": "please provide necessary arguments"}), http.HTTPStatus.PRECONDITION_FAILED

    return get_all_results_with_joins(Posts, Tags, PostTags, Modules, prof_id)



# @endpoint_output.route('/V1/predictions', methods=['GET'])
# @endpoint_output.route('/predictions', methods=['GET'])
# @jwt_required
# def get_multiple_predictions():
#     """GET /predictions
#     (retrieve multiple predictions based on a previously sent set of dispute predictors, retrieved by dispute_ids given
#     in &id=123 parameters)"""
#
#     args = get_args(request)
#     if not args:
#         logger.debug('No arguments supplied during the call of /predictions endpoint')
#         return jsonify({"msg": "please provide necessary arguments"}), http.HTTPStatus.BAD_REQUEST
#
#     return get_results(Prediction, args, 'prediction_time')