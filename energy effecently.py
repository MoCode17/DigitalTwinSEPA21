import random
from pyowm import OWM



desired_temp = 20  # int(input("Enter desired temperature: "))

door_open = input("Is the door open? (y/n/r): ")


current_temp = 17  # random.randint(outside_temp - 5, outside_temp + 5)

heater_on = "off"

minit = 00
hour = 00

cooling_power = 1000  # Cooling capacity of the AC system in watts
heating_power = 2000  # Heating capacity of the AC system in watts
time_minutes = 30 #time in minits
time_seconds = time_minutes * 60 # time in secconds
specific_heat_capacity = 1005 ## the specific heat capacity of ait in J/(kg·K)
room_volume = 1000 # the amout of volume of the room
density_of_air = 1.225 # the avrage presher of air in  kg/m³
thermal_transmittance_glass = 5 #how thermal conductive the glass is. the lower the number the better the inulator it is
thermal_transmittance_walls = 1#how thermal conductive the walls is. the lower the number the better the inulator it is
wall_area = 50 #how big is the wals meserd in area
glass_area = 10 #how big is the glass meserd in area
door_area = 1 # how big is the door meserd in area

mass_air = room_volume * density_of_air # the total mass of the air in the room

#get local tempture
owm = OWM('c17174c638bcc5788f88083be39f6a39') #free lisens key https://openweathermap.org/
mgr = owm.weather_manager()
weather = mgr.weather_at_place('Melbourne,AU').weather #get the location
temp_dict_celsius = weather.temperature('celsius') #get the weather
outside_temp = (temp_dict_celsius ['temp_min'] + temp_dict_celsius ['temp_max']) / 2 # get the avrave out side tempture for the day

def calculate_temperature_change(power, time):
    #Calculate the how cool or hot the AC makes the rom
    temperature_change = power * time / (mass_air * specific_heat_capacity)
    return temperature_change

def calculate_heat_transfer(current_temp):
    time_hours = time_minutes / 60
    # Calculate the temperature difference between the outside and inside
    temperature_difference = outside_temp- current_temp

    # Calculate the heat transfer through the glass wall
    glass_heat_transfer = thermal_transmittance_glass * glass_area * temperature_difference * time_hours

    # Calculate the heat transfer through the other walls
    walls_heat_transfer = thermal_transmittance_walls * wall_area * temperature_difference * time_hours

    # Total heat transfer into the room
    total_heat_transfer = glass_heat_transfer + walls_heat_transfer

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
        current_temp += calculate_temperature_change_door(current_temp, random.randint(0, 30))

    print( heater_on, "   |", round(current_temp), "     |", hour, ":", minit)

    minit = minit + 30
    if minit == 60:
        hour = hour + 1
        minit = 00


