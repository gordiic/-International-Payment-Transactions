from application.db.User import User

from flask import request
from application import app
from application.db import db


@app.route("/changeAccount", methods=['POST'])
def changeAccount():
    req = request.json
    user = User.query.filter_by(id='{}'.format(req["id"])).one()

    user.name = (req["name"])
    user.lastname = (req["lastname"])
    user.address = (req["address"])
    user.city = (req["city"])
    user.country = (req["country"])
    user.phoneNumber = (req["phoneNumber"])
    user.email = (req["email"])
    user.password = (req["password"])
    db.session.commit()
    return "Updated."