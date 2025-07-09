from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import json
import os

app = Flask(__name__)
CORS(app)

def get_db_connection():
    database_url = os.getenv('DATABASE_URL', 'postgresql://shopmate:password@localhost:5432/shopmate')
    return psycopg2.connect(database_url)

def init_db():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                order_id VARCHAR(50) UNIQUE NOT NULL,
                items JSONB NOT NULL,
                total DECIMAL(10,2) NOT NULL,
                status VARCHAR(50) NOT NULL,
                payment_status VARCHAR(50) NOT NULL,
                timestamp TIMESTAMP NOT NULL,
                estimated_delivery VARCHAR(100)
            )
        ''')
        conn.commit()
        cur.close()
        conn.close()
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database initialization error: {e}")

@app.route('/orders', methods=['GET'])
def get_orders():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT order_id, items, total, status, payment_status, timestamp, estimated_delivery FROM orders ORDER BY timestamp DESC')
        rows = cur.fetchall()
        
        orders = []
        for row in rows:
            orders.append({
                'order_id': row[0],
                'items': row[1],
                'total': float(row[2]),
                'status': row[3],
                'payment_status': row[4],
                'timestamp': row[5].isoformat(),
                'estimated_delivery': row[6]
            })
        
        cur.close()
        conn.close()
        return jsonify({'orders': orders}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'Invalid order data'}), 400
        
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''
            INSERT INTO orders (order_id, items, total, status, payment_status, timestamp, estimated_delivery)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (
            data['order_id'],
            json.dumps(data['items']),
            data['total'],
            data['status'],
            data['payment_status'],
            data['timestamp'],
            data.get('estimated_delivery', '3-5 business days')
        ))
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'message': 'Order stored successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT order_id, items, total, status, payment_status, timestamp, estimated_delivery FROM orders WHERE order_id = %s', (order_id,))
        row = cur.fetchone()
        
        if not row:
            return jsonify({'error': 'Order not found'}), 404
        
        order = {
            'order_id': row[0],
            'items': row[1],
            'total': float(row[2]),
            'status': row[3],
            'payment_status': row[4],
            'timestamp': row[5].isoformat(),
            'estimated_delivery': row[6]
        }
        
        cur.close()
        conn.close()
        return jsonify({'order': order}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)