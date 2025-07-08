from flask import Flask, jsonify

app = Flask(__name__)

# Sample data: Product list with image URLs
products = [
    {"id": 1, "name": "Sunglasses", "price": 120, "image_url": "/static/images/sunglasses.jpg"},
    {"id": 2, "name": "Mobile Phone", "price": 800, "image_url": "/static/images/mobilephone.jpg"},
    {"id": 3, "name": "Handbag", "price": 300, "image_url": "/static/images/handbag.jpg"}
]

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
