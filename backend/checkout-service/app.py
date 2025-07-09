from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/checkout', methods=['GET'])
def checkout_status():
    return jsonify({'message': 'Checkout service is running'}), 200

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    if not data or 'cart' not in data:
        return jsonify({'error': 'Invalid cart data'}), 400
    return jsonify({'message': 'Order placed successfully', 'order': data}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
