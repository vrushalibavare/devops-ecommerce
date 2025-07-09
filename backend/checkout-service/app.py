from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random
import uuid

app = Flask(__name__)
CORS(app)

# In-memory order storage
orders = []

@app.route('/checkout', methods=['GET'])
def checkout_status():
    return jsonify({'message': 'Checkout service is running'}), 200

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    if not data or 'cart' not in data:
        return jsonify({'error': 'Invalid cart data'}), 400
    
    # Simulate payment processing delay
    time.sleep(2)
    
    # Mock payment processing (90% success rate)
    payment_success = random.random() > 0.1
    
    if not payment_success:
        return jsonify({
            'error': 'Payment failed',
            'message': 'Your payment could not be processed. Please try again.'
        }), 400
    
    # Generate order
    order_id = str(uuid.uuid4())[:8]
    order = {
        'order_id': order_id,
        'items': data['cart'],
        'total': data.get('total', 0),
        'status': 'confirmed',
        'payment_status': 'paid',
        'timestamp': data.get('timestamp'),
        'estimated_delivery': '3-5 business days'
    }
    
    # Store order in order service
    try:
        import requests
        requests.post('http://order-service:5000/orders', json=order)
    except:
        pass  # Continue even if order service is down
    
    # Also store locally for backward compatibility
    orders.append(order)
    
    return jsonify({
        'message': 'Order placed successfully!',
        'order': order
    }), 200

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify({'orders': orders}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
