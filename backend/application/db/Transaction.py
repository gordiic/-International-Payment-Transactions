from application import db

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(20), nullable=False)
    sender = db.Column(db.String(20), nullable=False)
    reciever = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Float)
    destination = db.Column(db.String(20), nullable=False)


