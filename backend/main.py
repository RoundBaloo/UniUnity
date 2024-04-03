# CRUD - Create Read Update Delete
from flask import jsonify, request
from config import app, db
from models import User


# Получение юзера
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users}), 200


# Создание юзера
@app.route("/create_user", methods=["POST"])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")

    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")

    institute = request.json.get("institute")
    study_direction = request.json.get("studyDirection")
    course = request.json.get("course")
    profession = request.json.get("profession")
    search_aim = request.json.get("searchAim")
    about = request.json.get("about")
    skill_level = request.json.get("skillLevel")
    team_search_state = request.json.get("teamSearchState")

    if not email or not password or not first_name or not last_name or not institute or not study_direction or not course or not profession or not search_aim or not about or not skill_level or not team_search_state:
        # if not all([email, password, first_name, last_name, institute, study_direction, course, profession, search_aim, about, skill_level, team_search_state]):
        return (
            jsonify({"message": "Не все обязательные поля были заполнены!"}),
            400,
        )

    new_user = User(email, password, first_name, last_name, institute, study_direction, course, profession, search_aim,
                    about, skill_level, team_search_state)

    # Отлавливаем ошибки во время добавления юзера в БД
    try:
        db.session.add(new_user)  # подготовка к добавлению в БД
        db.session.commit()  # добавление в БД
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    # Если прошли проверку
    return jsonify({"message": "Пользователь успешно создан"}), 201


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
    user.study_direction = data.get("")
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


# Запуск сайта
if __name__ == '__main__':
    with app.app_context():  # если нет БД - создаем
        db.create_all()  # создаем все модели, созданные в БД
    app.run(debug=True)
