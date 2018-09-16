""" Tests the unauthenticated login procedure (password to access token flow)
"""


from datetime import datetime, timezone, timedelta
import jwt
import json
from tests.conftest import TEST_USERNAME, TEST_PASSWORD


def test_login_authentication_success(client):
    response = client.post('V1/login', data=json.dumps({'username': TEST_USERNAME, 'password': TEST_PASSWORD}),
                           content_type='application/json')
    assert response.status_code == 200
    assert response.content_type == 'application/json'

    login_response = json.loads(response.data.decode('utf-8'))
    access_token_opaque = login_response['access_token']
    access_token = jwt.decode(access_token_opaque, verify=False)
    assert access_token['identity'] == TEST_USERNAME.lower()
    assert access_token['type'] == 'access'

    exp = access_token['exp']
    expiry = datetime.fromtimestamp(exp, timezone.utc)
    lifetime_remaining = expiry - datetime.now(timezone.utc)
    assert lifetime_remaining <= timedelta(minutes=15)


def test_login_authentication_failure(client):
    response = client.post('V1/login', data=json.dumps({'username': "python", 'password': "python"}),
                           content_type='application/json')
    assert response.status_code == 401
    assert response.content_type == 'application/json'
    assert json.loads(response.data.decode('utf-8'))['msg'] == "Bad username or password"