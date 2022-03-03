
from flask import request
from application import app
from application.db import db
from application.db.Balances import Balances
from application.db.User import User

@app.route("/conversion", methods=['POST'])
def conversion():
    req = request.json
    amount = float(req["amountFrom"])
    _to = req["valuteTo"]
    _from = req["valuteFrom"]
    userid = req["id"]
    curFrom = float(req["currencyFrom"])
    curTo = float(req["currencyTo"])
    amount2 = (amount/curFrom)*curTo
    balanceFrom = Balances.query.filter_by(valute='{}'.format(_from),
                                         user_id='{}'.format(userid)).one()  # NUMBER DOESN'T EXIST
    balanceFrom.balance -= amount
    user = User.query.filter_by(id='{}'.format(userid)).one()
    try:
        balanceTo = Balances.query.filter_by(valute='{}'.format(_to),
                                       user_id='{}'.format(userid)).one()  # Balans postoji
        balanceTo.balance += amount2  #DODAJ PARE NA POSTOJECI RACUN
        db.session.commit()
        return user.userToJSON()
    except:
        #ovdje pravi novi balans
        bal = Balances(valute=_to,balance=amount2,user_id=userid)
        db.session.add(bal)
        db.session.commit()
        return user.userToJSON()
