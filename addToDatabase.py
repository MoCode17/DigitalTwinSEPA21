import time
import paho.mqtt.client as paho
from paho import mqtt
import json
import pymysql

mqtt_topic = "esp8266_data"
mqtt_broker_ip = "f12a8adb79f5492a9a5d34aeacf0087e.s2.eu.hivemq.cloud"

client = paho.Client(client_id="", userdata=None, protocol=paho.MQTTv5)

dbConn = pymysql.connect(host='localhost', user='root', password='', database='dtdb', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
cursor = dbConn.cursor()
insertSQL = "INSERT INTO readings (sensorName, readingValue, typeName) VALUES (%s, %s, %s)"

def on_connect(client, userdata, flags, rc, properties=None):
	print("Connected!", str(rc))
	client.subscribe(mqtt_topic)

def on_message(client, userdata, msg):
	x = str((msg.payload).decode('utf-8'))
	print("Topic: ", msg.topic + "\nJSON: " + x)
	y = json.loads(x)
	if y["readingValue"] != None:
		floatReadingValue = float(y["readingValue"])
		cursor.execute(insertSQL, (y["sensorName"], floatReadingValue, y["typeName"]))
		dbConn.commit()
client.on_connect = on_connect
client.on_message = on_message
client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
client.username_pw_set("SEPA21","Sepa1212")
client.connect(mqtt_broker_ip, 8883)

client.loop_forever()
client.disconnect()
