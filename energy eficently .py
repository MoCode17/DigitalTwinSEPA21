import random
from pyowm import OWM
import sys

#input
current_temp = 20
desired_temp = 10  # int(input("Enter desired temperature: "))
if_it_is_curent_day = True
door_open = input("Is the door open? (y/n/r): ")
#get outside temp options
if if_it_is_curent_day == True:
    # get local tempture
    owm = OWM('c17174c638bcc5788f88083be39f6a39')  # free lisens key https://openweathermap.org/
    mwr = owm.weather_manager()
    weather = mwr.weather_at_place('Melbourne,AU').weather
    temp_dict_celsius = weather.temperature('celsius')  # get the weather
    outside_temp = (temp_dict_celsius['temp_min'] + temp_dict_celsius['temp_max']) / 2  # get the avrave out side tempture for the day
elif if_it_is_curent_day == False:
    #input form website
    outside_temp = int(input("put in outside temp"))
else:
    sys.exit("faild to get outside tempture")

#veriable
cooling_power = 1000  # Cooling capacity of the AC system in watts
heating_power = 1000  # Heating capacity of the AC system in watts
thermal_transmittance_glass =  100  #how thermal conductive the glass is. the lower the number the better the inulator it is.
thermal_transmittance_walls = 40  #how thermal conductive the walls is. the lower the number the better the inulator it.



#constant
minit = 00
hour = 00
heater_on = "off"
time_minutes = 30 #time in minits
time_seconds = time_minutes * 60 # time in secconds
density_of_air = 1.225 # the avrage presher of air in  kg/m³
specific_heat_capacity = 1005 ## the specific heat capacity of ait in J/(kg·K)
#lenth is door ro windows direction
room_hight_low = 2.465 #m
room_hight_low_lenth = 2.270
room_hight_high = 3.335 #m
room_lenth = 8.662 #m
room_with = 8.36 #m
door_hight = 2.62 #m
door_with = 1.47 #m
output_per_hour = [4]
output = []




#equation
room_volume = (room_with * room_hight_high * (room_lenth - room_hight_low_lenth)) + (room_with * room_hight_low * room_hight_low_lenth) # the amout of volume of the room
mass_air = room_volume * density_of_air # the total mass of the air in the room
door_area = door_hight * door_with # how big is the door meserd in area
glass_wall_area = room_with * room_hight_high #how big is the glass and the other wall meserd in area
wall_area = (room_lenth * room_hight_high) - ((room_hight_high - room_hight_low) * room_hight_low_lenth) #how big is the wals  meserd in area
roof_area = room_lenth * room_with








def calculate_temperature_change(power, time):
    #Calculate the how cool or hot the AC makes the rom
    temperature_change = power * time / (mass_air * specific_heat_capacity)
    return temperature_change

def calculate_heat_transfer(current_temp):
    time_hours = time_minutes / 60
    # Calculate the temperature difference between the outside and inside
    temperature_difference = outside_temp- current_temp


    # Calculate the heat transfer through the glass wall
    glass_wall_transfer = thermal_transmittance_glass * glass_wall_area * temperature_difference * time_hours

    # Calculate the heat transfer through the longer walls
    walls_heat_transfer_1 = thermal_transmittance_walls * wall_area * temperature_difference * time_hours

    # Calculate the heat transfer through the shorter walls
    walls_heat_transfer_2 = thermal_transmittance_walls * glass_wall_area * temperature_difference * time_hours

    # Calculate the heat transfer through the roof
    roof_heat_transfer = thermal_transmittance_walls * roof_area * temperature_difference * time_hours

    # Total heat transfer into the room
    total_heat_transfer = glass_wall_transfer + walls_heat_transfer_1 + walls_heat_transfer_2 + roof_heat_transfer

    # Calculate the change in temperature
    temperature_change = total_heat_transfer / (room_volume * specific_heat_capacity)
    return temperature_change

def calculate_temperature_change_door(current_temp, time_seconds):
    # Calculate the volume of air exchanged when the door is open
    air_exchange_volume = door_area * time_seconds

    # Calculate the temperature change using the heat exchange formula
    temperature_change = (outside_temp  - current_temp) * air_exchange_volume / (room_volume * specific_heat_capacity)
    return temperature_change

for i in range(0, 24 * 2):  # for every 30 minutes in 24 hours
    if round(current_temp) > (desired_temp + 1):
        heater_on = "Cooling"
        current_temp = current_temp - calculate_temperature_change(cooling_power, time_seconds)
        if round(current_temp) < desired_temp:
            current_temp = desired_temp

    elif round(current_temp) < (desired_temp - 1):
        heater_on = "heating"
        current_temp = current_temp + calculate_temperature_change(heating_power, time_seconds)
        if round(current_temp) > desired_temp:
            current_temp = desired_temp

    elif round(current_temp) == desired_temp:
        heater_on = "off"

    current_temp = current_temp + calculate_heat_transfer(current_temp)

    if door_open == 'y':
        current_temp += calculate_temperature_change_door(current_temp,time_seconds)
    elif door_open == 'r':
        current_temp += calculate_temperature_change_door(current_temp, random.randint(5, 31))

    output_per_hour = [heater_on,round(current_temp), hour,minit]
    output.append(output_per_hour)

    minit = minit + time_minutes
    if minit == 60:
        hour = hour + 1
        minit = 00

for i in range(0, len(output)):
    print(output[i][0], "   |", output[i][1], "     |", output[i][2], ":", output[i][3])

