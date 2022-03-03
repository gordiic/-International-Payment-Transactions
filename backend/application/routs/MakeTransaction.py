from flask import request
from application import app
from application.db import db
from application.db.Balances import Balances
from application.db.CreditCard import CreditCard
from application.db.Transaction import Transaction
from application.db.User import User
from _thread import *
import time

def transactionThreadBank(traId,senderId,amount,reciever):
    time.sleep(10)
    user = User.query.filter_by(id='{}'.format(senderId)).one()
    transaction = Transaction.query.filter_by(id='{}'.format(traId)).one()
    creditCard = CreditCard.query.filter_by(number='{}'.format(reciever)).one()
    senderBalance = Balances.query.filter_by(user_id='{}'.format(senderId), valute='RSD').one()
    if(senderBalance.balance-amount >=0): #Odobrena transakcija
        senderBalance.balance -= amount
        creditCard.balance += amount
        transaction.state = "Obradjeno"
        db.session.commit()
    else: #Odbijeno
        transaction.state = "Odbijeno"
        db.session.commit()
    user = User.query.filter_by(id='{}'.format(senderId)).one()
    return user.userToJSON()

def transactionThreadOnLineAcc(traId,senderId,amount,reciever):
    time.sleep(10)
    recieverBalance = Balances.query.filter_by(user_id='{}'.format(reciever), valute='RSD').one()
    senderBalance = Balances.query.filter_by(user_id='{}'.format(senderId), valute='RSD').one()
    transaction = Transaction.query.filter_by(id='{}'.format(traId)).one()
    if(senderBalance.balance-amount >=0): #Odobrena transakcija
        senderBalance.balance -= amount
        recieverBalance.balance += amount
        transaction.state = "Obradjeno"
        db.session.commit()
    else: #Odbijeno
        transaction.state = "Odbijeno"
        db.session.commit()
    return

def transactionThreadBtcTransaction(traId,senderId,amount,reciever):
    time.sleep(10)
    recieverBalance = Balances.query.filter_by(user_id='{}'.format(reciever), valute='BTC').one()
    senderBalance = Balances.query.filter_by(user_id='{}'.format(senderId), valute='BTC').one()
    transaction = Transaction.query.filter_by(id='{}'.format(traId)).one()
    if(senderBalance.balance-(amount+amount*0.05) >=0 ): #Odobrena transakcija
        senderBalance.balance -= amount+amount*0.05
        recieverBalance.balance += amount
        transaction.state = "Obradjeno"
        db.session.commit()
    else: #Odbijeno
        transaction.state = "Odbijeno"
        db.session.commit()
    return

@app.route("/makeTransaction", methods=['POST'])
def makeTransaction():
    req = request.json
    senderId = req["id"]
    user = User.query.filter_by(id='{}'.format(senderId)).one() #user posiljalac

    reciever = req["reciever"]
    destination = req["destination"]

    if(destination == "banka"):
        try:
            amount = float(req["amount"])
            creditCard = CreditCard.query.filter_by(number='{}'.format(reciever)).one()
            tra = Transaction(state="U obradi", sender=f"{user.email}", reciever=f"{creditCard.number}", amount=amount, destination="Banka")
            db.session.add(tra)
            db.session.commit()
            start_new_thread(transactionThreadBank,(tra.id,senderId,amount,reciever) )
            return user.userToJSON()
        except:
            return "Transaction failed."
    elif(destination== "onlineaccount"):
        try:
            amount = float(req["amount"])
            recieverUser = User.query.filter_by(email='{}'.format(reciever),verified=True).one()
            tra = Transaction(state="U obradi", sender=f"{user.email}", reciever=f"{recieverUser.email}",amount=amount,destination="Online racun")
            db.session.add(tra)
            db.session.commit()
            start_new_thread(transactionThreadOnLineAcc, (tra.id, senderId, amount, recieverUser.id))
            return user.userToJSON()
        except:
            return "Transaction failed."
    else: #BTC
        try:
            amount = float(req["btcamount"])
            recieverUser = User.query.filter_by(email='{}'.format(reciever),verified=True).one()
            tra = Transaction(state="U obradi", sender=f"{user.email}", reciever=f"{recieverUser.email}",amount=amount,destination="BTC racun")
            db.session.add(tra)
            db.session.commit()
            start_new_thread(transactionThreadBtcTransaction, (tra.id, senderId, amount, recieverUser.id))
            return user.userToJSON()
        except:
            return "Transaction failed."

