from application.db.User import User
from application.db.Balances import Balances
from flask import request
from application import app
from application.db import db

@app.route("/register", methods=['GET', 'POST'])
def register():
    req = request.json
    user = User(name=req["name"], lastname=req["lastname"], address=req["address"], city=req["city"],
                country=req["country"], phoneNumber=req["phoneNumber"], email=req["email"], password=req["password"],
                verified=False)

    try:
        db.session.add(user)
        db.session.commit()
        user2 = User.query.filter_by(email='{}'.format(req["email"])).one()
        balance = Balances(balance=0, valute="RSD", user_id=user2.id)
        balance1 = Balances(balance=0, valute="BTC", user_id=user2.id)
        db.session.add(balance)
        db.session.add(balance1)
        db.session.commit()
        return "Successfully registered." # mejl je jedinstven posalji pozitivan odg
    except:
        return "E-mail already exists."