from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory order storage
orders = []

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify({'orders': orders}), 200

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    if not data:
        return jsonify({'error': 'Invalid order data'}), 400
    
    orders.append(data)
    return jsonify({'message': 'Order stored successfully'}), 201

@app.route('/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    order = next((o for o in orders if o.get('order_id') == order_id), None)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    return jsonify({'order': order}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)