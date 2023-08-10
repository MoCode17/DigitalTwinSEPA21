import pymysql as ps
import pandas as pd
from sqlalchemy import create_engine
import numpy as np


import xgboost as xgb


engine = create_engine('mysql+pymysql://root:@localhost:3306/dtdb', echo=False)
sensers_amout = (len(pd.read_sql_table('sensors', con = engine)))
df = pd.read_sql_table('readings', con = engine)

print(sensers_amout)
tempture = []
for x in range(sensers_amout):
    tempture_temp = (df.loc[(df["typeName"] == 'temperature') & (df["sensorName"] == ('Sensor' + str(x + 1))), ["time","readingValue"]])
    tempture.append(tempture_temp)

df = df.set_index('time')

for x in range(sensers_amout):
    print(tempture[x])

tempture[0].plot()


