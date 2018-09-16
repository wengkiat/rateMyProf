import pytest
from app.models import Professors


# to move to another file upon refactoring
@pytest.fixture(scope='module')
def setup_test_objects():

    prof1 = Professors(id=1, first_name='TEST', last_name='TEST', department=1, rating=1.0, posts=1, tags=[])

    prof2 = Professors()

    profs = [prof1, prof2]
    return profs


@pytest.fixture()
def dummy_reviews():
    """a fresh set of dummy review-like dicts, each with a unique dispute_id and sample values.
    predictor_id and predictor_time are not set, as these will be set by the server, not client"""
    review1 = {
        "prof_id": "",
        "content": ""

    }
    review2 = {

    }

    reviews = [review1, review2]
    return reviews
