# import mysql.connector
from application.db.CCards import CCards
from application.db import db

# connection = mysql.connector.connect(
#     user='root',
#     password='flasktest21',
#     host='localhost',
#     )
# my_cursor = connection.cursor()
#
# #kreiranje baze
# my_cursor.execute("CREATE DATABASE DataBaseDRS")
#
#
# my_cursor.close()
# connection.close()

for i in range(0, 10):
    cCards = CCards(number=str(1000000000000000+i), expirationDate="11/22", csc=100+i,balance=10000+i*10000)
    db.session.add(cCards)
    db.session.commit()
