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

    @classmethod
    def get_users_list(cls):
        try:
            users = cls.query.all()
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise
        return users

    @classmethod
    def get_user_by_id(cls, user_id):
        try:
            user = cls.query.get(user_id)
            db.session.commit()
            if not user:
                raise Exception('User does not exist')
        except Exception:
            db.session.rollback()
            raise
        return user

    def save_user(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

    def update_user(self, **data):
        try:
            self.email = data.get("email", self.email)
            self.password = data.get("password", self.password)

            self.first_name = data.get("firstName", self.first_name)
            self.last_name = data.get("lastName", self.last_name)

            self.institute = data.get("institute", self.institute)
            self.study_direction = data.get("studyDirection", self.study_direction)
            self.course = data.get("course", self.course)
            self.profession = data.get("profession", self.profession)
            self.search_aim = data.get("searchAim")
            self.about = data.get("about", self.about)
            self.skill_level = data.get("skillLevel", self.skill_level)
            self.team_search_state = data.get("teamSearchState", self.team_search_state)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

    def delete_user(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

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

    name = db.Column(db.String(150))
    type = db.Column(db.String(100))
    description = db.Column(db.String(300))

    @classmethod
    def get_projects_by_user_id(cls, user_id):
        try:
            projects = cls.query.filter(Project.user_id == user_id)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise
        return projects

    @classmethod
    def get_project(cls, user_id, project_id):
        try:
            project = cls.query.filter(
                cls.user_id == user_id,
                cls.id == project_id).first()
            if not project:
                raise Exception('Project does not exist')
        except Exception:
            db.session.rollback()
            raise
        return project

    def save_project(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

    def update_project(self, **kwargs):
        try:
            for key, value in kwargs.items():
                setattr(self, key, value)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

    def delete_project(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "description": self.description
        }
