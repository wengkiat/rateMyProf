"""Shared functions across all test modules, e.g. support for logging in a test user and default test data."""
import logging
import pytest
from flask import json
from api import app
from config import SetupEnv

TEST_USERNAME = SetupEnv.TEST_USERNAME
TEST_PASSWORD = SetupEnv.TEST_PASSWORD

logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


@pytest.fixture(scope='module')
def client():
    return app.test_client()


# single, shared authorization header value used for all tests in this module; login once
@pytest.fixture(scope='module')
def authorization_header(client):
    """login the test user and return an authorization header with bearer token that can be used with subsequent API
    requests for authentication"""
    response = client.post('V1/login', data=json.dumps({'username': TEST_USERNAME, 'password': TEST_PASSWORD}),
                           content_type='application/json')
    login_response = json.loads(response.data)
    access_token_opaque = login_response['access_token']
    return 'Authorization', 'Bearer ' + access_token_opaque
