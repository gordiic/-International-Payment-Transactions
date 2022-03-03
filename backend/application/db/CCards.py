from application import db

class CCards(db.Model):
    number = db.Column(db.String(50), primary_key=True)
    expirationDate = db.Column(db.String(20), nullable=False)
    csc = db.Column(db.Integer, nullable=False)
    balance = db.Column(db.Float)