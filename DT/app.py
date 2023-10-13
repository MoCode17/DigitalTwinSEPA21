from flask import Flask, render_template, jsonify, request
import utils.prediction as prediction
import utils.strings as str
import utils.database as db
from datetime import date
import os


app=Flask(__name__)

target = os.path.join(app.static_folder, 'table.csv')
@app.route('/')
@app.route('/index')
def index():
    today = date.today()
    year = today.year
    month = today.month + 1
    day = today.day
    return render_template('index.html', title="Digital Twin Prototype", year=year, month=month, day=day)


@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/selectmonth', methods=['GET'])
def selectmonth():
    month = request.args.get('month')
    month_str = str.get_month_string(month)
    sql = 'SELECT date_trunc(\'day\', reading_time)::text AS x , round(avg(reading_value), 1) AS y FROM "Reading" WHERE reading_type = 1 and date_trunc(\'month\', reading_time) = date_trunc(\'month\', timestamp \'2023-' + month_str + '-15\') GROUP  BY x ORDER BY x ASC;'
    readings = db.getResults(sql)
    return readings

@app.route('/selectdate', methods=['GET'])
def selectdate():
    date = request.args.get('date')
    sql = 'SELECT reading_day as x , round(avg(reading_value), 1) AS y FROM  ( SELECT date_trunc(\'hour\', reading_time) AS reading_day , reading_value FROM "Reading" WHERE reading_type = 1 and date_trunc(\'day\', reading_time) = date_trunc(\'day\', timestamp \'' + date +'\') GROUP BY reading_day, reading_value ) sub GROUP  BY 1;'
    readings = db.getResults(sql)
    return readings

@app.route('/selecttime', methods=['GET'])
def selecttime():
    month = request.args.get('month')
    time = request.args.get('time')
    month_str = str.get_month_string(month)
    sql = 'SELECT reading_day as x , round(avg(reading_value), 1) AS y FROM  ( SELECT date_trunc(\'hour\', reading_time) AS reading_day , reading_value FROM "Reading" WHERE node_id = 1  and reading_type = 1 and date_trunc(\'month\', reading_time) = date_trunc(\'month\', timestamp \'2023-' + month_str +'-01\') and EXTRACT(hour FROM reading_time) = EXTRACT(hour FROM time \'' + time + '\') GROUP  BY reading_day, reading_value ) sub GROUP  BY 1;'
    readings = db.getResults(sql)
    return readings

@app.route('/graphdata', methods=['GET'])
def graphdata():
    nodeId = request.args.get('nodeId')
    month = request.args.get('month')
    readingType = request.args.get('readingType')
    if readingType == None:
        readingType = str(1)
    sql = 'SELECT date_trunc(\'hour\', reading_time) as x , round(avg(reading_value), 1) AS y FROM "Reading" WHERE node_id = ' + nodeId + ' and reading_type = ' + readingType + ' and date_trunc(\'month\', reading_time) = date_trunc(\'month\', timestamp \'' + month + '-01\') GROUP BY x ORDER BY x ASC;'
    readings = db.getResults(sql)
    return readings

@app.route('/latestreadings', methods=['GET'])
def latestreadings():
    sql = 'WITH latest_readings AS ( SELECT r.*, ROW_NUMBER() OVER (PARTITION BY node_id, reading_type ORDER BY reading_time DESC) AS rn FROM "Reading" AS r ) SELECT * FROM latest_readings WHERE rn = 1;'
    readings = db.getResults(sql)
    return readings

@app.route('/regression')
def regression():
    return render_template('regression.html')

@app.route('/view')
def view():
    node = request.args.get('nodeId')
    return render_template('view.html', node=node)

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    month = request.args.get('month')
    return jsonify(prediction.predict(target, int(month)))

if __name__=='__main__':
    app.run(debug=True)