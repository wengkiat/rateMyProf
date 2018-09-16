"""
Definition of output-side APIs. These allow clients to retrieve the data from the database.
"""

import http

from flask_jwt_extended import jwt_required
from flask import Blueprint
from app import logger
from flask import jsonify, request
from app.models import Professors, Grades
from helpers.output_api import get_args, get_results, get_single_result, get_all_results, get_search_results


endpoint_output = Blueprint('endpoint_output',__name__)


@endpoint_output.route('/V1/professors', methods=['GET'])
@endpoint_output.route('/professors', methods=['GET'])
@jwt_required
def get_professors():
    """GET /professors
    (retrieve all professors)"""

    return get_all_results(Professors)


@endpoint_output.route('/V1/professors/search/<string:search>', methods=['GET'])
@endpoint_output.route('/professors/search/<string:search>', methods=['GET'])
@jwt_required
def search_professor(search=None):
    """GET /professors
    (retrieve some professors)"""
    if search is None:
        logger.debug('No string supplied during the call of /professors/search endpoint')
        return jsonify({"msg": "please provide necessary arguments"}), http.HTTPStatus.BAD_REQUEST

    search = search.upper()
    return get_search_results(Professors, search)


@endpoint_output.route('/V1/grades', methods=['GET'])
@endpoint_output.route('/grades', methods=['GET'])
@jwt_required
def get_grades():
    """GET /grades
    (retrieve all grades)"""

    return get_all_results(Grades)


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