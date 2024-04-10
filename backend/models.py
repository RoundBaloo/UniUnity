from config import db
from flask_jwt_extended import create_access_token
from datetime import timedelta
from passlib.hash import bcrypt


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)

    institute = db.Column(db.String(100), nullable=False)
    study_direction = db.Column(db.String(100), nullable=False)
    course = db.Column(db.Integer, nullable=False)
    profession = db.Column(db.String(100), nullable=False)
    search_aim = db.Column(db.String(100), nullable=False)
    about = db.Column(db.Text())
    skill_level = db.Column(db.String(100), nullable=False)
    team_search_state = db.Column(db.Bool(100), nullable=False)
    projects = db.relationship('Project', backref='user', lazy=True)

    def __init__(self, **kwargs):
        self.email = kwargs.get('email')
        self.password = bcrypt.hash(kwargs.get('password'))

    def get_token(self, expire_time=24):
        expire_delta = timedelta(expire_time)
        token = create_access_token(
            identity=self.id, expires_delta=expire_delta)
        return token

    @classmethod
    def authenticate(cls, email, password):
        user = cls.query.filter(cls.email == email).one()
        if not bcrypt.verify(password, user.password):
            raise Exception('Incorrect password')
        return user

    def to_json(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,

            "firstName": self.first_name,
            "lastName": self.last_name,

            "institute": self.institute,
            "studyDirection": self.study_direction,
            "course": str(self.course),
            "profession": self.profession,
            "searchAim": self.search_aim,
            "about": self.about,
            "skillLevel": self.skill_level,
            "teamSearchState": self.team_search_state,
            "projects": self.projects
        }


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    type = db.Column(db.String(70), nullable=False)
    description = db.Column(db.String(300), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "description": self.description
        }
