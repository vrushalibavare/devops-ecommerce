from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
cart_items = []  # in-memory cart

@app.route('/cart', methods=['GET'])
def get_cart():
    return jsonify(cart_items), 200

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    if not data or 'product_id' not in data or 'quantity' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    cart_items.append(data)
    return jsonify({'message': 'Item added to cart'}), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
