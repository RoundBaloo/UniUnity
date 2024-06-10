from config import db
from flask_jwt_extended import create_access_token
from datetime import timedelta
from passlib.hash import bcrypt


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120))

    first_name = db.Column(db.String(100), default='')
    last_name = db.Column(db.String(100), default='')
    father_name = db.Column(db.String(100), default='')

    institute = db.Column(db.String(100), default='')
    study_direction = db.Column(db.String(100), default='')
    course = db.Column(db.Integer, default=0)
    profession = db.Column(db.String(100), default='')
    search_aim = db.Column(db.String(200), default='')

    what_want_from_command = db.Column(db.String(300), default='')
    about = db.Column(db.Text, default='')
    skill_level = db.Column(db.String(100), default='')
    team_search_state = db.Column(db.Boolean, default=False)
    projects = db.relationship('Project', backref='user', lazy=True)

    VK_link = db.Column(db.String(500), default='')
    TG_link = db.Column(db.String(500), default='')
    mail = db.Column(db.String(500), default='')

    image_link = db.Column(db.String(500), default='')
    fill_percentage = db.Column(db.Integer, default=0)

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

        self.what_want_from_command = kwargs.get('what_want_from_command')
        self.about = kwargs.get('about')
        self.skill_level = kwargs.get('skillLevel')
        self.team_search_state = kwargs.get('teamSearchState')

        self.VK_link = kwargs.get('VK_link')
        self.TG_link = kwargs.get('TG_link')
        self.mail = kwargs.get('mail')

        self.image_link = kwargs.get('image_link')
        self.fill_percentage = kwargs.get('fillPercentage')

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
    def get_users_list(cls, page_number, site_filter):
        try:
            user_query = User.query
            if site_filter.institute_filter:
                user_query = user_query.filter(User.institute.contains(f"%{site_filter.institute_filter}"))
            if site_filter.study_direction_filter:
                user_query = user_query.filter(User.study_direction.contains(f"%{site_filter.study_direction_filter}"))
            if site_filter.course_filter:
                user_query = user_query.filter(User.course == site_filter.course_filter)
            if site_filter.profession_filter:
                user_query = user_query.filter(User.profession.contains(f"%{site_filter.profession_filter}"))
            if site_filter.skill_level_filter:
                user_query = user_query.filter(User.skill_level >= site_filter.skill_level_filter)
            if site_filter.team_search_state_filter and site_filter.team_search_state_filter == 'true':
                user_query = user_query.filter(User.team_search_state == True)
            all_users = user_query.all()
            users = []
            for i in range(4 * (page_number - 1), 4 * page_number):
                if i < len(all_users):
                    users.append(all_users[i])
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
            self.search_aim = data.get("searchAim", self.search_aim)

            self.what_want_from_command = data.get("what_want_from_command", self.what_want_from_command)
            self.about = data.get("about", self.about)
            self.skill_level = data.get("skillLevel", self.skill_level)
            self.team_search_state = data.get("teamSearchState", self.team_search_state)

            self.VK_link = data.get("VK_link", self.VK_link)
            self.TG_link = data.get("TG_link", self.TG_link)
            self.mail = data.get("mail", self.mail)

            self.image_link = data.get("image_link", self.image_link)
            self.fill_percentage = data.get("fillPercentage", self.fill_percentage)
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

            "what_want_from_command": self.what_want_from_command,
            "about": self.about,
            "skillLevel": self.skill_level,
            "teamSearchState": self.team_search_state,

            "VK_link": self.VK_link,
            "TG_link": self.TG_link,
            "mail": self.mail,

            "image_link": self.image_link,
            "fillPercentage": self.fill_percentage
        }


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    name = db.Column(db.String(150))
    type = db.Column(db.String(100))
    description = db.Column(db.String(400))
    project_link = db.Column(db.String(500))

    project_image_link = db.Column(db.String(500))

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

    @classmethod
    def get_project_by_project_id(cls, project_id):
        try:
            project = cls.query.filter(cls.id == project_id).first()
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
            self.name = kwargs.get("name")
            self.type = kwargs.get("type")
            self.description = kwargs.get("description")
            self.project_link = kwargs.get("project_link")
            self.project_image_link = kwargs.get("project_image_link")
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

            "name": self.name,
            "type": self.type,
            "description": self.description,
            "project_link": self.project_link,

            "project_image_link": self.project_image_link
        }
