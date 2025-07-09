from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data: Product list with image URLs
products = [
    {"id": 1, "name": "Sunglasses", "price": 120, "image": "sunglasses.jpg"},
    {"id": 2, "name": "Mobile Phone", "price": 800, "image": "mobilephone.jpg"},
    {"id": 3, "name": "Handbag", "price": 300, "image": "handbag.jpg"}
]

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
