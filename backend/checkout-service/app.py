from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    if not data or 'cart' not in data:
        return jsonify({'error': 'Invalid cart data'}), 400
    return jsonify({'message': 'Order placed successfully', 'order': data}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
