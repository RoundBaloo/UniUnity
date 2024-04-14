# CRUD - Create Read Update Delete
from flask import jsonify, request
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from config import app, db, docs
from models import User, Project
from schemas import ProjectSchema
from flask_apispec import use_kwargs, marshal_with

CORS(app)


# Получение юзеров
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users}), 200


# Получение id юзера
@app.route("/get_user_id", methods=["GET"])
@jwt_required()
def get_user_id():
    user_id = get_jwt_identity()
    return jsonify({"user_id": user_id}), 200


# Обновление юзера
@app.route("/update_user", methods=["PATCH"])
def update_user():
    verify_jwt_in_request()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Существует ли юзер
    if not user:
        return jsonify({"message": "Пользователь не найден"}), 404

    data = request.json  # Словарь

    for key, value in data.items():
        setattr(user, key, value)

    db.session.commit()

    return jsonify({"message": "Данные о пользователе обновлены"}), 201


# Удаление юзера
@app.route("/delete_user>", methods=["DELETE"])
def delete_user():
    user_id = get_jwt_identity()
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
@marshal_with(ProjectSchema(many=True))
def get_projects(user_id):
    projects = Project.query.filter(Project.user_id == user_id)
    return projects, 200


# добавление проекта юзером
@app.route("/post_project", methods=["POST"])
@jwt_required
@use_kwargs(ProjectSchema)
@marshal_with(ProjectSchema)
def post_project(**kwargs):
    user_id = get_jwt_identity()
    new_one = Project(user_id=user_id, **kwargs)
    try:
        db.session.add(new_one)  # подготовка к добавлению в БД
        db.session.commit()  # добавление в БД
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return new_one, 201


# изменение проекта юзером
@app.route("/update_project/<int:project_id>", methods=["PUT"])
@jwt_required()
@use_kwargs(ProjectSchema)
@marshal_with(ProjectSchema)
def update_project(project_id, **kwargs):
    user_id = get_jwt_identity()
    project = Project.query.filter(
        Project.user_id == user_id,
        Project.id == project_id
    ).first()

    # Существует ли проект
    if not project:
        return jsonify({"message": "Проект не найден или вы не имеете к нему доступа"}), 404

    for key, value in kwargs.items():
        setattr(project, key, value)

    db.session.commit()
    return project, 201


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


docs.register(get_projects)
docs.register(post_project)
docs.register(update_project)

# Запуск сайта
if __name__ == '__main__':
    with app.app_context():  # если нет БД - создаем
        db.create_all()  # создаем все модели, созданные в БД
    app.run(debug=True)
