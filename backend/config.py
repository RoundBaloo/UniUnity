from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec import APISpec
from flask_apispec.extension import FlaskApiSpec

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
docs = FlaskApiSpec()
docs.init_app(app)
app.config.update({
    'APISPEC_SPEC': APISpec(
        title='Digital Portfolio',
        version='v1',
        openapi_version='2.0',
        plugins=[MarshmallowPlugin()],
    ),
    'APISPEC_SWAGGER_URL': '/swagger/'
})

app.config['SECRET_KEY'] = '4bc3c1f05653443ca31d24b89dbedb90'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
