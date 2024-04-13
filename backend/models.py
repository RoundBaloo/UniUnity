from config import db
from flask_jwt_extended import create_access_token
from datetime import timedelta
from passlib.hash import bcrypt


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120))

    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    father_name = db.Column(db.String(100))

    institute = db.Column(db.String(100))
    study_direction = db.Column(db.String(100))
    course = db.Column(db.Integer)
    profession = db.Column(db.String(100))
    search_aim = db.Column(db.String(100))
    about = db.Column(db.Text())
    skill_level = db.Column(db.String(100))
    team_search_state = db.Column(db.Boolean)
    projects = db.relationship('Project', backref='user', lazy=True)

    def __init__(self, **kwargs):
        self.email = kwargs.get('email')
        self.password = bcrypt.hash(kwargs.get('password'))
        self.first_name = kwargs.get('firstName')
        self.last_name = kwargs.get('lastName')
        self.father_name = kwargs.get('fatherName')
        self.institute = kwargs.get('institute')
        self.study_direction = kwargs.get('studyDirection')
        self.course = kwargs.get('course')
        self.profession = kwargs.get('profession')
        self.search_aim = kwargs.get('searchAim')
        self.about = kwargs.get('about')
        self.skill_level = kwargs.get('skillLevel')
        self.team_search_state = kwargs.get('teamSearchState')

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
            "fatherName": self.father_name,

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
