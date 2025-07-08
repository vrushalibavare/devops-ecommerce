from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/checkout', methods=['POST'])
def checkout():
    # In a real app, you'd handle payment and order processing
    return jsonify({"status": "Order placed successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
