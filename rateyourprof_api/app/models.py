from sqlalchemy import text, ForeignKey
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import UUID, ARRAY, INTEGER

#
# Rateyourprof data models
# for details
#


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()"))
    username = db.Column(db.String(64), index=True, unique=True)
    #email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Professors(db.Model):
    __tablename__ = 'professors'
    #id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()"))
    id = db.Column(db.String, primary_key=True)
    first_name = db.Column(db.VARCHAR)
    last_name = db.Column(db.VARCHAR)
    department = db.Column(db.Integer)
    rating = db.Column(db.Float)
    posts = db.Column(db.Integer)
    modules = db.Column(ARRAY(INTEGER))

    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'department': self.department,
            'rating': self.rating,
            'posts': self.posts,
            'modules': self.modules
        }

    def search_serialize(i):
        """Return object data in easily serializeable format"""
        return {
            'id': i[0].id,
            'first_name': i[0].first_name,
            'last_name': i[0].last_name,
            'department': i[1],
        }

    def serialize_full(data, data2):
        """Return object data in easily serializeable format"""

        mod = []
        for i in data2:
            mod.append([i.code, i.name])
        return {
            'id': data[0][0].id,
            'first_name': data[0][0].first_name,
            'last_name': data[0][0].last_name,
            'department': data[0][1],
            'rating': data[0][0].rating,
            'posts': data[0][0].posts,
            'modules': mod
        }


class Grades(db.Model):
    __tablename__ = 'grades'
    id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
    score = db.Column(db.VARCHAR)

    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'score': self.score
        }


class Tags(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
    definition = db.Column(db.VARCHAR)

    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'definition': self.definition
        }


class Modules(db.Model):
    __tablename__ = 'modules'
    id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
    code = db.Column(db.VARCHAR)
    name = db.Column(db.String)

    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'code': self.code
        }


class Departments(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
    name = db.Column(db.VARCHAR)

    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'name': self.name
        }


class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
    prof_id = db.Column(UUID(as_uuid=True))
    content = db.Column(db.VARCHAR)
    rating = db.Column(db.VARCHAR)
    difficulty = db.Column(db.Integer)
    module = db.Column(db.Integer)
    grade = db.Column(db.Integer)
    upvote = db.Column(db.Integer)
    downvote = db.Column(db.Integer)
    time_posted = db.Column(db.TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    def join_serialize(i):
        """Return object data in easily serializeable format"""

        return {
            'id': i[0].id,
            'prof_id': i[0].prof_id,
            'content': i[0].content,
            'rating': i[0].rating,
            'difficulty': i[0].difficulty,
            'module': i[1][1],
            'grade': i[0].grade,
            'upvote': i[0].upvote,
            'downvote': i[0].downvote,
            'time_posted': i[0].time_posted.isoformat() if i[0].time_posted is not None else None,
            'tags': i[1][0]
        }


    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'content': self.content,
            'prof_id' : self.prof_id,
            'rating' : self.rating,
            'difficulty': self.difficulty,
            'module': self.module,
            'grade': self.grade,
            'upvote': self.upvote,
            'downvote': self.downvote,
            'time_posted': self.time_posted.isoformat() if self.time_posted is not None else None
        }

class PostTags(db.Model):
    __tablename__ = 'post_tags'
    id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
    post_id = db.Column(db.Integer)
    tag_id = db.Column(db.Integer)

# class Prediction(db.Model):
#     __tablename__ = 'predictions'
#     prediction_id = db.Column(db.Integer, primary_key=True)
#     prediction_time = db.Column(db.TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
#     dispute_id = db.Column(db.VARCHAR, index=True)
#     model_id = db.Column(db.VARCHAR)
#     invalid_probability = db.Column(db.Float)
#     invalid_percentile = db.Column(db.Integer)
#     invalid_bucket = db.Column(db.Integer)
#     push_status = db.Column(db.Integer, default=0)
#     last_push_try = db.Column(db.TIMESTAMP(timezone=True))
#
#     def serialize(self):
#         """Return object data in easily serializeable format"""
#         return {
#             'prediction_id': self.prediction_id,
#             'prediction_time': self.prediction_time.isoformat() if self.prediction_time is not None else None,
#             'dispute_id': self.dispute_id,
#             'model_id': self.model_id,
#             'invalid_probability': self.invalid_probability,
#             'invalid_percentile': self.invalid_percentile,
#             'invalid_bucket': self.invalid_bucket,
#             'push_status': self.push_status,
#             'last_push_try': self.last_push_try
#         }


