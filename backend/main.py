# CRUD - Create Read Update Delete
from flask import jsonify, request
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import app, db
from models import User, Project

CORS(app)

# Получение юзеров
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users}), 200


# Обновление юзера
@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    # Существует ли юзер
    if not user:
        return jsonify({"message": "Пользователь не найден"}), 404

    data = request.json  # Словарь

    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)

    user.first_name = data.get("firstName", user.first_name)
    user.last_name = data.get("lastName", user.last_name)

    user.institute = data.get("institute", user.institute)
    user.study_direction = data.get("study_direction", user.study_direction)
    user.course = data.get("course", user.course)
    user.profession = data.get("profession", user.profession)
    user.search_aim = data.get("searchAim")
    user.about = data.get("about", user.about)
    user.skill_level = data.get("skillLevel", user.skill_level)
    user.team_search_state = data.get("teamSearchState", user.team_search_state)

    db.session.commit()

    return jsonify({"message": "Данные о пользователе обновлены"}), 201


# Удаление юзера
@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "Пользователь не найден"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "Пользователь удален"}), 200


# Регистрация
@app.route("/register", methods=["POST"])
def register():
    params = request.json
    user = User(**params)
    try:
        print(1)
        db.session.add(user)  # подготовка к добавлению в БД
        print(2)
        db.session.commit()  # добавление в БД
        print(3)
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    token = user.get_token()
    return {'access_token': token}  # доступ к аккаунту


# Вход в аккаунт
@app.route("/login", methods=["POST"])
def login():
    params = request.json
    user = User.authenticate(**params)
    token = user.get_token()
    return {'access_token': token}  # доступ к аккаунту


# Получение проектов юзера
@app.route("/get_user_projects/<int:user_id>", methods=["GET"])
def get_projects(user_id):
    projects = Project.query.filter(Project.user_id == user_id )
    json_projects = list(map(lambda x: x.to_json(), projects))
    return jsonify({"projects": json_projects}), 200


# добавление проекта юзером
@app.route("/post_project")
@jwt_required
def post_project():
    user_id = get_jwt_identity()
    new_one = Project(user_id=user_id, **request.json)
    try:
        db.session.add(new_one)  # подготовка к добавлению в БД
        db.session.commit()  # добавление в БД
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Проект успешно создан"}), 201


# изменение проекта юзером
@app.route("/update_project/<int:project_id>", methods=["PUT"])
@jwt_required()
def update_project(project_id):
    user_id = get_jwt_identity()
    project = Project.query.filter(
        Project.user_id == user_id,
        Project.id == project_id
    ).first()

    # Существует ли проект
    if not project:
        return jsonify({"message": "Проект не найден или вы не имеете к нему доступа"}), 404

    data = request.json  # Словарь

    project.type = data.get("type", project.type)
    project.description = data.get("description", project.description)

    db.session.commit()

    return jsonify({"message": "Данные о проекте обновлены"}), 201


# удаление проекта юзером
@app.route("/delete_project/<int:project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    user_id = get_jwt_identity()
    project = Project.query.filter(
        Project.user_id == user_id,
        Project.id == project_id
    ).first()

    if not project:
        return jsonify({"message": "Проект не найден или вы не имеете к нему доступа"}), 404

    db.session.delete(project)
    db.session.commit()

    return jsonify({"message": "Проект удален"}), 200


# Запуск сайта
if __name__ == '__main__':
    with app.app_context():  # если нет БД - создаем
        db.create_all()  # создаем все модели, созданные в БД
    app.run(debug=True)
