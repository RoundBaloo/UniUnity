from config import db


class User(db.Model):
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
    team_search_state = db.Column(db.String(100), nullable=False)

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
            "teamSearchState": self.team_search_state
        }
