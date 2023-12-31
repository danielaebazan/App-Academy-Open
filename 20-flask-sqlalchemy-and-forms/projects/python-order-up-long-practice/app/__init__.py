from flask import Flask
from .config import Configuration
from .models import db, Employee, Menu, MenuItem, MenuItemType
from .routes import orders, session
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Configuration)
app.register_blueprint(orders.bp)
app.register_blueprint(session.bp)
db.init_app(app)  # Configure the application with SQLAlchemy

login = LoginManager(app) #  Create the login manager for your application to protect routes.
login.login_view = "session.login" # Instruct the login manager to use the "session.login" Blueprint function

# Configure the LoginManager to use your load_user function to get Employee objects from the database.
@login.user_loader
def load_user(id):
    return Employee.query.get(int(id))