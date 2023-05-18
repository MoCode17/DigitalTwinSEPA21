import datetime
import time
import random
import pandas as pd
from sqlalchemy import create_engine
import pymysql as ps


random.seed(time.time())
temperature_temp = (random.randrange(150,300)/10)
temperature1 = [temperature_temp]
out_temp = (random.randrange(150,350)/10)
minutes = int(input('how often do the sense record') or 10)
days = int(input('how many days of data') or 14)
a = int(((days*24)*60)/minutes)
amount_of_sensors = int(input('how many sensors') or 4)
m = int(input('the starting position of first sensor x') or 2)
n = int(input('the starting position of first sensor y') or 2)
u=int(input('how far apart are the sensors x') or 8)
p=int(input('how far apart are the sensors y') or 8)

temperature_data = [[0 for x in range(0)] for y in range(amount_of_sensors)]


port = int(input('what port is the mysql sever ') or 3306)
engine = create_engine('mysql+pymysql://root:@localhost:3306/dtdb', echo=False)
sensor_df = pd.read_sql_table('sensors', con = engine)
sensor_df.drop(sensor_df.index, inplace=True)
sensor_df = sensor_df.drop('level_0', axis=1)
df = pd.read_sql_table('readings', con = engine)
df.drop(df.index, inplace=True)
df = df.drop('index', axis=1)

print(sensor_df)
print(df)

for x in range(amount_of_sensors):

    sensor_df.loc[x] = [x,(x+1),('sensor'+str(x+1)),'y',m,n]
    if (x % 2) == 0:
        n = n + u
    else:
        l = n
        n = m
        m = m + p


def compare_temp(temperature, out_temp, add):

    if temperature > out_temp:
        add = add - 0.2
    elif temperature < out_temp:
        add = add + 0.2
    temperature = round((temperature + add),1)


    return temperature

def temp_restriction(temperature):
    if temperature < 10:
        temperature = 10
    elif temperature > 30:
        temperature = 30
    return temperature

def temp_restriction_out(temperature):
    if temperature < 0:
        temperature = 0
    elif temperature > 35:
        temperature = 35
    return temperature
def out_side(outside,clock):
    if 0< clock.month < 4:
        out = (random.randrange(-80, 120) / 10)
    elif 3 < clock.month < 7:
        out = (random.randrange(-120, 80) / 10)
    elif 6 < clock.month < 10:
        out = (random.randrange(-110, 90) / 10)
    elif 9 < clock.month < 13:
        out = (random.randrange(-90, 110) / 10)
    outside = outside + out
    outside = round(outside,1)
    outside = temp_restriction_out(outside)
    return outside

b = 0
clock = datetime.datetime(2023,1,1,00,00,00)
spike = random.randrange(60, 100)

check_day = 0
check = 0
def reset_spike(spike, outside):

    out = random.randrange(0, 1)
    if out == 0:
        outside = outside + 10
    elif out == 1:
        outside = outside - 10

    spike = random.randrange(60, 100)
    print(spike)
    return spike, outside

for x in range(a):
    if spike == 0:
        spike, out_temp = reset_spike(spike,out_temp)
    elif check_day != clock.day:
        check_day = clock.day
        spike = spike - 1

    add = (random.randrange(-20,20)/10)

    if temperature_temp > out_temp:
        if out_temp > 0:
            add = add - 0.3
        else:
            add = add + 0.3
    elif temperature_temp < out_temp:
        if out_temp > 0:
            add = add + 0.3
        else:
            add = add - 0.3
    if (temperature_temp == 30) | (temperature_temp == 30):
        check = check + 1
        if check > 64:
            if temperature_temp == 30:
                temperature_temp = temperature_temp - 2
            else:
                temperature_temp = temperature_temp + 2
    else:
        check = 0


    temperature_temp = temperature_temp + add
    temperature_data[0].append(temp_restriction(round(temperature_temp,1)))
    df.loc[b] = [(b + 1), 'sensor1', clock, temperature_data[0][x], 'temperature']
    b = b + 1

    for y in range((amount_of_sensors - 1)):
        add = (random.randrange(-5, 5) / 10)
        temperature_data[(y+1)].append(temp_restriction(compare_temp(temperature_temp, out_temp, add)))

        df.loc[b] = [(b + 1), 'sensor2', clock, temperature_data[(y+1)][x], 'temperature']
        b = b + 1

    add_time = datetime.timedelta(minutes=+minutes)
    clock = clock + add_time
    out_temp = out_side(out_temp,clock)
    print(str(x+1) + '/' +str(a))


#df.loc[0] = [1,'sensor 1', '2023-05-17 17:29:58', temperature1[0], 'temperature']


print(sensor_df)
sensor_df.to_sql('sensors', engine, if_exists='replace')


df.to_sql('readings', engine, if_exists='replace')
print(df)




