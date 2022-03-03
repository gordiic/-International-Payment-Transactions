import pymysql
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:flasktest21@DB/DataBaseDRS'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:flasktest21@localhost/DataBaseDRS'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
from application.routs import __init__
