""" Tests API methods requiring authentication

NOTE: These tests currently rely on already expected test data in the db!
TODO: Make these tests use a scratch db, populate test data from test, then roll back changes or in some other way not
leave a trace
"""

from flask import json
from tests.test_data import setup_test_objects


def check_prediction(profs, response):

    assert response.status_code == 200
    assert response.content_type == 'application/json'
    js = json.loads(response.data)
    for i in range(len(js)-1):
        assert js[i]['prof_id'] == profs[i].dispute_id

    return True


#
# Tests follow
#


def test_path_does_not_exist(client, authorization_header):
    response = client.get('V1/CS3216/', headers=[authorization_header])
    assert response.status_code == 404


def test_get_professor_search(client, authorization_header):
    response = client.get('V1/professor/search/be', headers=[authorization_header])
    assert check_prediction(setup_test_objects, response)


def test_get_professor_search_no_header(client):
    """If no authorization header, should return 401"""
    response = client.get('V1/professor/search/ben')  # note not passing the authorization header
    assert response.content_type == 'application/json'
    assert json.loads(response.data)['msg'] == 'Missing Authorization Header'
    assert response.status_code == 401


def test_get_professor_search_no_data(client, authorization_header):
    """If no such professor, should return 404 Not Found"""
    response = client.get('V1/professor/search/lolololol', headers=[authorization_header])
    assert response.status_code == 404
    assert response.content_type == 'application/json'


def test_no_arguments_provided_search_professor(client, authorization_header):
    response = client.get('V1/professor/search/', headers=[authorization_header])
    assert response.status_code == 400
    assert response.content_type == 'application/json'
    assert json.loads(response.data)['msg'] == 'please provide necessary arguments'