from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
cart_items = []  # in-memory cart

@app.route('/cart', methods=['GET'])
def get_cart():
    # Calculate total
    total = sum(item['price'] * item['quantity'] for item in cart_items)
    return jsonify({
        'items': cart_items,
        'total': total,
        'count': len(cart_items)
    }), 200

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    if not data or 'product_id' not in data or 'quantity' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    # Check if item already exists in cart
    for item in cart_items:
        if item['product_id'] == data['product_id']:
            item['quantity'] += data['quantity']
            return jsonify({'message': 'Item quantity updated in cart'}), 200
    
    # Add new item to cart
    cart_items.append(data)
    return jsonify({'message': 'Item added to cart'}), 201

@app.route('/cart/clear', methods=['DELETE'])
def clear_cart():
    global cart_items
    cart_items = []
    return jsonify({'message': 'Cart cleared'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
