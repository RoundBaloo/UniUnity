# CRUD - Create Read Update Delete
from flask import jsonify, request
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from config import app, db, docs, logger
from models import User, Project
from schemas import ProjectSchema
from flask_apispec import use_kwargs, marshal_with

CORS(app)


# Получение юзеров
@app.route("/users", methods=["GET"])
def get_users():
    try:
        users = User.query.all()
        json_users = list(map(lambda x: x.to_json(), users))
    except Exception as e:
        logger.warning(f'Error while getting users: {e}')
        return jsonify({"message": str(e)}), 400

    return jsonify({"users": json_users}), 200


# Получение id юзера
@app.route("/get_user_id", methods=["GET"])
@jwt_required()
def get_user_id():
    try:
        user_id = get_jwt_identity()
    except Exception as e:
        logger.warning(f'Error while getting user_id:{get_jwt_identity()}: {e}')
        return jsonify({"message": str(e)}), 401

    return jsonify({"user_id": user_id}), 200


# Обновление юзера
@app.route("/update_user", methods=["PATCH"])
def update_user():
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        # Существует ли юзер
        if not user:
            logger.warning(f'Пользователь с id: {user_id} не найден ')
            return jsonify({"message": "Пользователь не найден"}), 404

        data = request.json  # Словарь
        for key, value in data.items():
            setattr(user, key, value)

        db.session.commit()
    except Exception as e:
        logger.warning(f'Error while updating user: {get_jwt_identity()}: {e}')
        return jsonify({"message": str(e)}), 401

    return jsonify({"message": "Данные о пользователе обновлены"}), 201


# Удаление юзера
@app.route("/delete_user>", methods=["DELETE"])
def delete_user():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            logger.warning(f'Пользователь с id: {user_id} не найден ')
            return jsonify({"message": "Пользователь не найден"}), 404

        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        logger.warning(f'Error while deleting user {get_jwt_identity()}: {e}')
        return jsonify({"message": str(e)}), 401

    return jsonify({"message": "Пользователь удален"}), 200


# Регистрация
@app.route("/register", methods=["POST"])
def register():
    try:
        params = request.json
        user = User(**params)

        db.session.add(user)  # подготовка к добавлению в БД
        db.session.commit()  # добавление в БД
        token = user.get_token()
    except Exception as e:
        logger.warning(f'Error while registering user: {e}')
        return jsonify({"message": str(e)}), 400

    return {'access_token': token}  # доступ к аккаунту


# Вход в аккаунт
@app.route("/login", methods=["POST"])
def login():
    try:
        params = request.json
        user = User.authenticate(**params)
        token = user.get_token()
    except Exception as e:
        logger.warning(f'Error while login {request.json.get("email")}: {e}')
        return jsonify({"message": str(e)}), 400

    return {'access_token': token}  # доступ к аккаунту


# Получение проектов юзера
@app.route("/get_user_projects/<int:user_id>", methods=["GET"])
@marshal_with(ProjectSchema(many=True))
def get_projects(user_id):
    try:
        projects = Project.query.filter(Project.user_id == user_id)
    except Exception as e:
        logger.warning(f'Error while getting projects {user_id}: {e}')
        return jsonify({"message": str(e)}), 404

    return projects, 200


# добавление проекта юзером
@app.route("/post_project", methods=["POST"])
@jwt_required
@use_kwargs(ProjectSchema)
@marshal_with(ProjectSchema)
def post_project(**kwargs):
    try:
        user_id = get_jwt_identity()
        new_one = Project(user_id=user_id, **kwargs)
        db.session.add(new_one)  # подготовка к добавлению в БД
        db.session.commit()  # добавление в БД
    except Exception as e:
        logger.warning(f'Error while posting project {get_jwt_identity()}: {e}')
        return jsonify({"message": str(e)}), 400

    return new_one, 201


# изменение проекта юзером
@app.route("/update_project/<int:project_id>", methods=["PUT"])
@jwt_required()
@use_kwargs(ProjectSchema)
@marshal_with(ProjectSchema)
def update_project(project_id, **kwargs):
    try:
        user_id = get_jwt_identity()
        project = Project.query.filter(
            Project.user_id == user_id,
            Project.id == project_id).first()

        # Существует ли проект
        if not project:
            logger.warning(f'Проект с user_id: {user_id} и id: {project_id} не найден ')
            return jsonify({"message": "Проект не найден или вы не имеете к нему доступа"}), 404

        for key, value in kwargs.items():
            setattr(project, key, value)
        db.session.commit()
    except Exception as e:
        logger.warning(
            f'Error while updating project user:{get_jwt_identity()} project:{project_id}: {e}')
        return jsonify({"message": str(e)}), 401

    return project, 201


# удаление проекта юзером
@app.route("/delete_project/<int:project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    try:
        user_id = get_jwt_identity()
        project = Project.query.filter(
            Project.user_id == user_id,
            Project.id == project_id).first()

        if not project:
            logger.warning(f'Проект с user_id: {user_id} и id: {project_id} не найден ')
            return jsonify({"message": "Проект не найден или вы не имеете к нему доступа"}), 404

        db.session.delete(project)
        db.session.commit()
    except Exception as e:
        logger.warning(
            f'Error while deleting project user:{get_jwt_identity()} project:{project_id}: {e}')
        return jsonify({"message": str(e)}), 401

    return jsonify({"message": "Проект удален"}), 200


@app.errorhandler(422)
def error_handlesr(err):
    headers = err.data.get("headers", None)
    messages = err.data.get("messages", ["Invalid Request"])
    if headers:
        return jsonify({"message": messages}), 400, headers
    else:
        return jsonify({"message": messages}), 400


docs.register(get_projects)
docs.register(post_project)
docs.register(update_project)

# Запуск сайта
if __name__ == '__main__':
    with app.app_context():  # если нет БД - создаем
        db.create_all()  # создаем все модели, созданные в БД
    app.run(debug=True)
