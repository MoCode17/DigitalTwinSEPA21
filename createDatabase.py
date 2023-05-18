import pymysql


dbConn = pymysql.connect(host='localhost', user='root', password='')

print(dbConn)

mycursor = dbConn.cursor()

mycursor.execute("CREATE DATABASE IF NOT EXISTS dtdb;")

mycursor.close()

dbConn.close()