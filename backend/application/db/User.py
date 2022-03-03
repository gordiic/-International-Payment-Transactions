import copy
import json
from application.db import db
from application.db.Balances import Balances


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    country = db.Column(db.String(30), nullable=False)
    phoneNumber = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    verified = db.Column(db.Boolean, default=False)
    creditCards = db.relationship('CreditCard', backref='id', lazy=True)
    balancesRelation = db.relationship('Balances', backref='id', lazy=True)

    def userToJSON(self):
        balances = Balances.query.filter_by(user_id='{}'.format(self.id)).all()
        data = {}
        for b in balances:
            data[b.valute] = b.balance
        return json.dumps({"id":self.id, "name":self.name, "lastname":self.lastname, "address":self.address, "city":self.city, "country":self.country, "phoneNumber":self.phoneNumber, "email":self.email, "verified":self.verified, "password":self.password, "balances":data})

