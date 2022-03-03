from flask import request
from application import app
from application.db.User import User


@app.route("/refreshAccount", methods=['POST'])
def refreshAccount():
    req = request.json
    senderId = req["id"]
    user = User.query.filter_by(id='{}'.format(senderId)).one()
    return user.userToJSON()