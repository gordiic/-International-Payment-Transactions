import datetime

from application.db.Balances import Balances
from application.db.User import User
from application.db.CreditCard import CreditCard
from flask import request
from application import app
from application.db import db



@app.route("/depositOnAccount", methods=['POST'])
def depositOnAccount():
    req = request.json
    amount = int(req["amount"])
    userId= req["id"]

    kar = CreditCard.query.filter_by(user_id='{}'.format(userId)).one()
    user = User.query.filter_by(id='{}'.format(userId)).one()
    rsdBalanceUser = Balances.query.filter_by(user_id='{}'.format(userId),valute="RSD").one()
    if(kar.balance - amount >= 0):
        kar.balance -= amount
        rsdBalanceUser.balance +=amount
        db.session.commit()
        return user.userToJSON()
    else:
        return "Deposition failed."