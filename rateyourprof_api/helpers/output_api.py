"""
Helper methods output-side APIs.
"""

import http
from flask import jsonify
from sqlalchemy import and_, or_
from app import logger


def get_args(request):

    logger.info('Start getting arguments')
    args = request.args.to_dict()
    if request.args.getlist('id'):
        args['id'] = request.args.getlist('id')
    if request.args.get('from'):
        args['from'] = request.args.get('from')
    if request.args.get('to'):
        args['to'] = request.args.get('to')
    return args


def get_all_results(database):

    logger.debug('Start reading database for' + str(database))

    try:
        data = database.query.all()
        print(data)

    except:
        logger.debug('Unable to reach database', exc_info=True)
        return jsonify({"msg": "unable to reach database"}), http.HTTPStatus.BAD_REQUEST

    logger.debug('Finish getting data from' + str(database))
    return jsonify([i.serialize() for i in data])


def get_single_result(database, dispute):

    logger.debug('Start reading database for' + str(database))

    try:
        data = database.query.filter_by(dispute_id=dispute)
    except:
        logger.debug('Unable to reach database', exc_info=True)
        return jsonify({"msg": "unable to reach database"}), http.HTTPStatus.BAD_REQUEST

    if data.first() is None:
        logger.debug('Data does not exist in database ', exc_info=True)
        return jsonify({"msg": "no such dispute in database"}), http.HTTPStatus.NOT_FOUND

    logger.debug('Finish getting data from' + str(database))
    return jsonify([i.serialize() for i in data])


def get_search_results(database, search):

    logger.debug('Start reading database for' + str(database))

    print(search)

    try:
        logger.debug('Querying by search term')
        data = database.query.filter(or_(database.first_name.contains(search), database.last_name.contains(search)))

    except:
        logger.debug('Unable to reach database, database error', exc_info=True)
        return jsonify({"msg": "unable to reach database"}), http.HTTPStatus.BAD_REQUEST

    if data.first() is None:
        logger.debug('Data does not exist in database ', exc_info=True)
        return jsonify({"msg": "no such professor in database"}), http.HTTPStatus.NOT_FOUND

    logger.debug('Finish getting data from' + str(database))
    return jsonify([i.search_serialize() for i in data])


def get_results(database, args, time_field):

    logger.debug('Start reading database for' + str(database))
    data = None

    try:
        if 'id' in args.keys():
            logger.debug('Querying by id')
            data = database.query.filter(database.dispute_id.in_(args['id']))

        if 'from' in args.keys():
            logger.debug('Querying by from date')
            if data is None:
                data = database.query.filter((getattr(database, time_field) >= args['from']))
            else:
                data = data.filter(and_(getattr(database,time_field) >= args['from']))

        if 'to' in args.keys():
            logger.debug('Querying by to date')
            if data is None:
                data = database.query.filter((getattr(database, time_field) <= args['to']))
            else:
                data = data.filter(and_(getattr(database,time_field) <= args['to']))

    except:
        logger.debug('Unable to reach database, database error', exc_info=True)
        return jsonify({"msg": "unable to reach database"}), http.HTTPStatus.BAD_REQUEST

    if data.first() is None:
        logger.debug('Data does not exist in database ', exc_info=True)
        return jsonify({"msg": "no such data in database"}), http.HTTPStatus.NOT_FOUND

    logger.debug('Finish getting data from' + str(database))
    return jsonify([i.serialize() for i in data])
