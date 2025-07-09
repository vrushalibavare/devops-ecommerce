import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_PRODUCT_API + "/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CART_API}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        }),
      });
      if (response.ok) {
        alert(`${product.name} added to cart!`);
      }
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              Shop the Best Products Online
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover amazing deals on premium quality products. Fast shipping, easy returns.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/products" 
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                Browse All Products
              </Link>
              <Link 
                to="/cart" 
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 text-lg">Hand-picked items just for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={`/assets/${product.image}`} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Hot Deal
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-lg text-gray-400 line-through">${product.price + 50}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>🛒</span>
                    <span>Add to Cart</span>
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">↩️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;