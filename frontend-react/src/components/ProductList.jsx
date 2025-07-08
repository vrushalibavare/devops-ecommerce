import React from "react";
import { API } from "../config";

const ProductList = ({ products }) => {
  const handleAddToCart = async (productId) => {
    try {
      const res = await fetch(`${API.cartService}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      if (res.ok) {
        alert("Added to cart!");
      } else {
        alert("Failed to add to cart");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="product-list grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded p-4 flex flex-col items-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-40 h-40 object-cover mb-2"
          />
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-700">${product.price}</p>
          <button
            onClick={() => handleAddToCart(product.id)}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            <img
              src="/cart-icon.png"
              alt="cart"
              className="w-5 h-5 mr-2"
            />
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
