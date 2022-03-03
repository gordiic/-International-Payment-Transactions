import json

from application import db

class Balances(db.Model):
    idb = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Float)
    valute = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)