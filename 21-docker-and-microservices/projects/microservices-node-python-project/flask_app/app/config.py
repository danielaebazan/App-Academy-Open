import os

class Configuration():
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    # SQLALCHEMY_DATABASE_URI =  "postgresql://ratings_user:password@localhost/ratings"
        
    SQLALCHEMY_TRACK_MODIFICATIONS = False