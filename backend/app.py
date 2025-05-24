from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from sqlalchemy import text  #-вставила
from config import Config

app = Flask(__name__)
app.config.from_object(Config)


db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)


from routes.friends import friends_bp
from routes.notifications import notifications_bp

app.register_blueprint(friends_bp, url_prefix='/api')
app.register_blueprint(notifications_bp, url_prefix='/api')

# Регистрация маршрутов (позже добавим)
#from routes.auth import auth_bp
#from routes.tasks import tasks_bp

#app.register_blueprint(auth_bp)
#app.register_blueprint(tasks_bp)


if __name__ == '__main__':
    app.run(debug=True)