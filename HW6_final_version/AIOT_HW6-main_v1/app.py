from flask import Flask, jsonify, request, render_template
from datetime import datetime
import pytz
import sqlite3

app = Flask(__name__)
DATABASE = 'temperature_data.sqlite'

# 设置时区
timezone = pytz.timezone('Asia/Taipei')

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS sensor_data (
                id INTEGER PRIMARY KEY,
                temperature REAL NOT NULL,
                humidity REAL NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""")
        conn.commit()

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/visualize-realtime')
def visualize_realtime():
    return render_template('realtime-data.html')

@app.route('/visualize-specifiedtime')
def visualize_specified_time():
    return render_template('specifiedtime-data.html')

@app.route('/post_data', methods=['POST'])
def post_data():
    try:
        content = request.get_json()
        print("Received data:", content)  # 打印接收到的數據
        temperature = content['temperature']
        humidity = content['humidity']
        current_time = datetime.now(timezone).strftime('%Y-%m-%d %H:%M:%S')
        print("Processed data:", temperature, humidity, current_time)  # 打印處理後的數據

        with get_db_connection() as conn:
            result = conn.execute('INSERT INTO sensor_data (temperature, humidity, timestamp) VALUES (?, ?, ?)',
                         (temperature, humidity, current_time))
            conn.commit()
            print("Database insert result:", result.rowcount)  # 打印插入結果

        return jsonify(success=True)
    except Exception as e:
        print("Error inserting data:", e)  # 打印錯誤信息
        return jsonify(success=False, error=str(e)), 500
    
@app.route('/get_data')
def get_data():
    start_time = request.args.get('start_time')
    end_time = request.args.get('end_time')
    print("Received times:", start_time, end_time)  # Debug print

    try:
        start = datetime.strptime(start_time, '%Y-%m-%dT%H:%M:%S')
        end = datetime.strptime(end_time, '%Y-%m-%dT%H:%M:%S')
        if start >= end:
            return jsonify(error="End time must be after start time."), 400
    except ValueError as e:
        return jsonify(error="Invalid date-time format: " + str(e)), 400

    query = """
        SELECT id, temperature, humidity, timestamp
        FROM sensor_data
        WHERE timestamp BETWEEN ? AND ?
        ORDER BY timestamp ASC
    """
    try:
        with get_db_connection() as conn:
            data = conn.execute(query, (start.strftime('%Y-%m-%d %H:%M:%S'), end.strftime('%Y-%m-%d %H:%M:%S'))).fetchall()
            if not data:
                return jsonify(error="No data available."), 404
            result = [{'id': row['id'], 'temperature': row['temperature'], 'humidity': row['humidity'], 'timestamp': row['timestamp']} for row in data]
            return jsonify(result)
    except sqlite3.DatabaseError as e:
        return jsonify(error="Database error: " + str(e)), 500


@app.route('/get_latest_data')
def get_latest_data():
    limit = request.args.get('limit', 10)  # default to 10 if not specified
    query = """
        SELECT id, temperature, humidity, timestamp
        FROM sensor_data
        ORDER BY timestamp DESC
        LIMIT ?
    """
    try:
        with get_db_connection() as conn:
            data = conn.execute(query, (limit,)).fetchall()
            result = [{'id': row['id'], 'temperature': row['temperature'], 'humidity': row['humidity'], 'timestamp': row['timestamp']} for row in data]
            return jsonify(result)
    except sqlite3.DatabaseError as e:
        return jsonify(error="Database error"), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
