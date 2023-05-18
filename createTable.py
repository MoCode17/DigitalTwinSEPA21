import pymysql


dbConn = pymysql.connect(host='localhost', user='root', password='', database='dtdb')

mycursor = dbConn.cursor()


mycursor.execute("DROP TABLE IF EXISTS `readings`;")

mycursor.execute("DROP TABLE IF EXISTS `sensors`;")

mycursor.execute("DROP TABLE IF EXISTS `type`;")


mycursor.execute("CREATE TABLE IF NOT EXISTS `readings` (`readingID` int(11) NOT NULL PRIMARY KEY,`sensorName` VARCHAR(50) NOT NULL,  `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,`readingValue` float NOT NULL,`typeName` VARCHAR(50) NOT NULL);")

mycursor.execute("CREATE TABLE IF NOT EXISTS `sensors` (`sensorID` int(11) NOT NULL PRIMARY KEY, `sensorName` varchar(50) NOT NULL, `activeState` enum('Y','N') NOT NULL DEFAULT 'Y', `x` decimal(7,2) NOT NULL, `y` decimal(7,2) NOT NULL)")

mycursor.execute("CREATE TABLE IF NOT EXISTS `type` (`typeID` int(11) NOT NULL PRIMARY KEY, `typeName` varchar(50) NOT NULL, `unit` varchar(20) NOT NULL)")


mycursor.execute("INSERT INTO `sensors` (`sensorID`, `sensorName`, `activeState`, `x`, `y`) VALUES(1, 'Sensor1', 'Y', '1.00', '1.00'),(2, 'Sensor2', 'Y', '8.00', '8.00');")

mycursor.execute("INSERT INTO `type` (`typeID`, `typeName`, `unit`) VALUES (1, 'Temperature', '°C'), (2, 'Humidity', '%'), (3, 'Light', 'cd');")


mycursor.execute("ALTER TABLE `readings` MODIFY `readingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;")

mycursor.execute("ALTER TABLE `sensors` MODIFY `sensorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;")

mycursor.execute("ALTER TABLE `type` MODIFY `typeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;")


mycursor.execute("SHOW TABLES")

for x in mycursor:
	print(x)

mycursor.close()