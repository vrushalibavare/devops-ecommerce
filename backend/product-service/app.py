from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data: Product list with descriptions
products = [
    {
        "id": 1, 
        "name": "Premium Sunglasses", 
        "price": 120, 
        "image": "sunglasses.jpg",
        "description": "Stylish UV protection sunglasses with polarized lenses. Perfect for outdoor activities and fashion.",
        "features": ["UV Protection", "Polarized Lenses", "Lightweight Frame"]
    },
    {
        "id": 2, 
        "name": "Smartphone Pro", 
        "price": 800, 
        "image": "mobilephone.jpg",
        "description": "Latest smartphone with advanced camera, long battery life, and lightning-fast performance.",
        "features": ["48MP Camera", "5000mAh Battery", "128GB Storage"]
    },
    {
        "id": 3, 
        "name": "Designer Handbag", 
        "price": 300, 
        "image": "handbag.jpg",
        "description": "Elegant leather handbag with spacious compartments. Perfect for work or casual outings.",
        "features": ["Genuine Leather", "Multiple Compartments", "Adjustable Strap"]
    }
]

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
