import json

from flask import request
from application import app
from application.Encoder import AlchemyEncoder
from application.db.CreditCard import CreditCard
from application.db.Transaction import Transaction
from application.db.User import User


@app.route("/viewTransactionHistory", methods=['POST'])
def viewTransactionHistory():
    req = request.json
    senderId = req["id"]
    user = User.query.filter_by(id='{}'.format(senderId)).one()
    creditCard = CreditCard.query.filter_by(user_id='{}'.format(senderId)).one()

    c = Transaction.query.filter_by(sender='{}'.format(user.email)).all()
    c += Transaction.query.filter_by(reciever='{}'.format(user.email)).all()
    c += Transaction.query.filter_by(reciever='{}'.format(creditCard.number)).all()
    return json.dumps(c, cls=AlchemyEncoder)


