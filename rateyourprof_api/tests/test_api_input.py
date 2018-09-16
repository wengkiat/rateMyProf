""" Tests API methods requiring authentication

NOTE: These tests write to the connected database and so fill it with test data
TODO: Make these tests use a scratch db, roll back changes or in some other way not leave a trace
"""

from flask import json
from sqlalchemy.exc import IntegrityError

from app.models import Posts
from tests.test_data import dummy_reviews

#
# Tests of POST /review
# (saving new review)
#


def test_post_invalid_json(client, authorization_header):
    response = client.post('V1/review', content_type='application/json', headers=[authorization_header],
                           data='{"prof_id": "b"}')
    assert response.status_code == 400


def test_post_invalid_predictor(client, authorization_header):
    response = client.post('V1/review', content_type='application/json', headers=[authorization_header],
                           data='{a: "b"}')
    assert response.status_code == 400


# extra fields are ignored so it would not cost the code any problems.
def test_post_invalid_review_extra_field(client, authorization_header):
    reviews = dummy_reviews()
    review = reviews[0]
    review['someinvalidkey'] = 'q'  # this is not a defined property of a Posts

    response = client.post('V1/review', content_type='application/json', headers=[authorization_header],
                               data=json.dumps([review]))
    assert response.status_code == 200


def test_post_invalid_review_missing_prof_id(client, authorization_header):
    reviews = dummy_reviews()
    review = reviews[0]
    del review['prof_id']  # this is a required field which must be specified

    response = client.post('V1/review', content_type='application/json', headers=[authorization_header], data=json.dumps([predictor]))
    assert response.status_code == 400
    assert json.loads(response.data)['msg'] == "prof_id cannot be None"


def test_post_no_content_type(client, authorization_header):
    response = client.post('V1/review', headers=[authorization_header])
    assert response.status_code == 415
    assert b'No JSON body provided' == response.data


def test_post_empty_request_body(client, authorization_header):
    response = client.post('V1/review', content_type='application/json', headers=[authorization_header], data='')
    assert response.status_code == 400


def test_post_single_new_review(client, authorization_header):
    reviews = dummy_reviews()
    review = reviews[0]

    response = client.post('V1/review', content_type='application/json', headers=[authorization_header],
                           data=json.dumps([review]))
    assert response.status_code == 200

    saved_predictor = Posts.query.filter(Posts.dispute_id == review['prof_id']).one()
    saved_dict = saved_predictor.serialize()

    assert saved_dict['id']  # just some database-generated id > 0
    assert saved_dict['time_posted']     # populated by db to now()

    # compare all the remaining fields against what we saved
    assert review == {k: str(v) for (k, v) in saved_dict.items() if k not in ('id', 'time_posted')}