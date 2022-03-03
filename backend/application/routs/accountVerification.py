import datetime

from application.db.Balances import Balances
from application.db.User import User
from application.db.CCards import CCards
from application.db.CreditCard import CreditCard
from flask import request
from application import app
from application.db import db


@app.route("/accountVerification", methods=['POST'])
def accountVerification():
    req = request.json
    a = int(datetime.date.today().year)
    b = int(datetime.date.today().month)
    br = int(req["number"])
    idUser = req["id"]
    try:
        card = CreditCard.query.filter_by(number='{}'.format(req["number"])).one()
        return "Verification failed."
    except:
        try:
            cCard = CCards.query.filter_by(number='{}'.format(req["number"]),
                                           csc='{}'.format(req["csc"])).one()  # NUMBER DOESN'T EXIST
            y = str(cCard.expirationDate).split("/")
            m = int(y[0])
            y1 = int("20" + y[1])
            if (a < y1):
                try:
                    idUser = req["id"]
                    CreditCard.query.filter_by(user_id='{}'.format(idUser)).one()
                    return "Verification failed."
                except:
                    kar = CreditCard(number=cCard.number, csc=cCard.csc, balance=int(cCard.balance) - 100,
                                     user_id=idUser,
                                     expirationDate=cCard.expirationDate)
                    db.session.add(kar)
                    user = User.query.filter_by(id='{}'.format(idUser)).one()
                    user.verified = True
                    db.session.commit()
                    return user.userToJSON()
            elif (a == y1):
                if (b < m):
                    try:
                        CreditCard.query.filter_by(user_id='{}'.format(req["id"])).one()
                        return "Verification failed."
                    except:
                        kar = CreditCard(number=cCard.number, csc=cCard.csc, balance=cCard.balance, user_id=req["id"],
                                         expirationDate=cCard.expirationDate)
                        db.session.add(kar)
                        user = User.query.filter_by(id='{}'.format(req["id"])).one()
                        user.verified = True
                        db.session.commit()
                        return user.userToJSON()
        except:
            return "Verification failed."
