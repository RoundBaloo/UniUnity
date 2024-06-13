# CRUD - Create Read Update Delete
from flask import jsonify, request
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_apispec import use_kwargs, marshal_with
from config import app, db, docs, logger
from models import User, Project
from schemas import ProjectSchema
import os
import glob
from werkzeug.utils import secure_filename

CORS(app)


class Filter:
    institute_filter = None
    study_direction_filter = None
    course_filter = None
    profession_filter = None
    skill_level_filter = None
    team_search_state_filter = None


site_filter = Filter()


# Получение юзеров по страницам
@app.route("/users/<int:page_number>", methods=["GET"])
def get_users(page_number):
    try:
        users = User.get_users_list(page_number=page_number, site_filter=site_filter)
        json_users = list(map(lambda x: x.to_json(), users))
    except Exception as e:
        logger.warning(f'Error while getting users: {e}')
        return jsonify({"message": str(e)}), 400
    return jsonify({"users": json_users}), 200


# Изменение фильтров
@app.route("/filters", methods=["PATCH"])
def change_filters():
    data = request.json
    site_filter.institute_filter = data.get('institute')
    site_filter.study_direction_filter = data.get('studyDirection')
    site_filter.course_filter = data.get('course')
    site_filter.profession_filter = data.get('profession')
    site_filter.skill_level_filter = data.get('skillLevel')
    site_filter.team_search_state_filter = data.get('teamSearchState')
    return jsonify({"message": "Filters updated successfully"}), 200


# Получение юзера с проектами по токену
@app.route("/get_user_with_projects", methods=["GET"])
def get_user_with_projects():
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        user = User.get_user_by_id(user_id=user_id)
        projects = Project.get_projects_by_user_id(user_id=user_id)
        json_projects = list(map(lambda x: x.to_json(), projects))
    except Exception as e:
        logger.warning(f'Error while getting user_id:{get_jwt_identity()}: {e}')
        return jsonify({"message": str(e)}), 401

    return jsonify({"user": user.to_json(), "projects": json_projects}), 200


# Получение юзера с проектами по id
@app.route("/get_user/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    try:
        user = User.get_user_by_id(user_id=user_id)
        projects = Project.get_projects_by_user_id(user_id=user_id)
        json_projects = list(map(lambda x: x.to_json(), projects))
    except Exception as e:
        logger.warning(f'Error while getting user_id:{get_jwt_identity()}: {e}')
        return jsonify({"message": str(e)}), 401

    return jsonify({"user": user.to_json(), "projects": json_projects}), 200


# Обновление юзера
@app.route("/update_user", methods=["PATCH"])
def update_user():
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        user = User.get_user_by_id(user_id=user_id)

        data = request.json  # Словарь
        user.update_user(**data)
    except Exception as e:
        logger.warning(f'Error while updating user: {get_jwt_identity()}: {e}')
        return jsonify({"message": str(e)}), 401

    return jsonify({"message": "Данные о пользователе обновлены"}), 201


# Удаление юзера
@app.route("/delete_user", methods=["DELETE"])
def delete_user():
    try:
        user_id = get_jwt_identity()
        user = User.get_user_by_id(user_id=user_id)
        user.delete_user()
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

        user.save_user()
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
        logger.warning(f'Error while login with email: {request.json.get("email")}: {e}')
        return jsonify({"message": str(e)}), 400

    return {'access_token': token}  # доступ к аккаунту


# Получение проектов юзера
@app.route("/get_user_projects/<int:user_id>", methods=["GET"])
@marshal_with(ProjectSchema(many=True))
def get_projects(user_id):
    try:
        projects = Project.get_projects_by_user_id(user_id=user_id)
    except Exception as e:
        logger.warning(f'Error while getting projects {user_id}: {e}')
        return jsonify({"message": str(e)}), 404

    return projects, 200


# Получение проекта юзера по айди проекта
@app.route("/get_project/<int:project_id>", methods=["GET"])
@marshal_with(ProjectSchema)
def get_project(project_id):
    try:
        project = Project.get_project_by_project_id(project_id=project_id)
    except Exception as e:
        logger.warning(f'Error while getting project {project_id}: {e}')
        return jsonify({"message": str(e)}), 404

    return project, 200


# добавление проекта юзером
@app.route("/post_project", methods=["POST"])
def post_project():
    try:
        verify_jwt_in_request()
        params = request.json
        user_id = get_jwt_identity()
        new_one = Project(user_id=user_id, **params)
        new_one.save_project()  # добавление в БД
    except Exception as e:
        logger.warning(f'Error while posting project {get_jwt_identity()}: {e}')
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Проект добавлен"})


# изменение проекта юзером
@app.route("/update_project/<int:project_id>", methods=["PUT"])
@jwt_required()
@use_kwargs(ProjectSchema)
@marshal_with(ProjectSchema)
def update_project(project_id, **kwargs):
    try:
        user_id = get_jwt_identity()
        project = Project.get_project(user_id=user_id, project_id=project_id)
        project.update_project(**kwargs)
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
        project = Project.get_project(user_id=user_id, project_id=project_id)
        project.delete_project()
    except Exception as e:
        logger.warning(
            f'Error while deleting project user:{get_jwt_identity()} project:{project_id}: {e}')
        return jsonify({"message": str(e)}), 401

    return jsonify({"message": "Проект удален"}), 200


# Добавление картинки к проекту
@app.route("/add_image_for_project/<int:project_id>", methods=["POST"])
@jwt_required()
def post_image_for_project(project_id):
    allowed_extensions = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
    try:
        user_id = get_jwt_identity()
        project = Project.get_project(user_id=user_id, project_id=project_id)
        if not project:
            return jsonify({"message": "Проекта не существует или вы не имеете к нему доступа"}), 400
        if 'files[]' not in request.files:
            return jsonify({'message': 'в запросе нет файлов'}), 400
        file = request.files['files[]']
        file_is_allowed = '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in allowed_extensions
        if file and file_is_allowed:
            # Получаем расширение файла
            _, extension = os.path.splitext(file.filename)
            # Формируем новое имя файла как "ID_расширение"
            new_filename = f"{project_id}{extension}"
            upload_folder = app.config['UPLOAD_FOLDER']  # Используем путь из конфигурации
            os.makedirs(upload_folder, exist_ok=True)  # Создает директорию, если она не существует
            path = os.path.join(upload_folder, new_filename)
            
            # Проверяем, существует ли старый файл, и если да, то удаляем его
            old_files_pattern = os.path.join(upload_folder, f"{project_id}*")
            for old_file in glob.glob(old_files_pattern):
                if os.path.exists(old_file):
                    os.remove(old_file)
            
            file.save(path)
            project.project_image_link = path
    except Exception as e:
        logger.warning(f'Ошибка при добавлении изображения к проекту:{project_id}: {e}')
        return jsonify({"message": str(e)}), 401


    return jsonify({"message": "Картинка добавлена"}), 200


@app.errorhandler(422)
def error_handlesr(err):
    headers = err.data.get("headers", None)
    messages = err.data.get("messages", ["Invalid Request"])
    logger.warning(f'Invalid Input params: {messages}')
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
