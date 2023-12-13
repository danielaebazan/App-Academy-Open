from flask import Flask, render_template

from .config import Config
from .routes import index
from .models import db

from flask_migrate import Migrate


# Initialize the app using the __name__ dunder.
app = Flask(__name__)

# Load the key using app.config.from_object config class
app.config.from_object(Config)

app.register_blueprint(index.index_bp)

db.init_app(app)
migrate = Migrate(app, db)