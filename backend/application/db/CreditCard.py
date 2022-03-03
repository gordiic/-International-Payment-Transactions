from application import db

class CreditCard(db.Model):
    ide = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String(50))
    expirationDate = db.Column(db.String(20), nullable=False)
    csc = db.Column(db.Integer, nullable=False)
    balance = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)