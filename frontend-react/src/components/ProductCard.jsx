import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CART_API}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      alert(`${quantity} x ${product.name} added to cart`);
    } catch (err) {
      console.error("Error adding to cart:", err.message);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border">
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img 
          src={`/assets/${product.image}`} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Qty:</label>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span>🛒</span>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;