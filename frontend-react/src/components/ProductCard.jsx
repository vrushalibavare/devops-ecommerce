import React from "react";

const ProductCard = ({ product }) => (
  <div className="border rounded p-4 shadow">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover"
    />
    <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
    <p className="text-sm text-gray-700">{product.description}</p>
    <p className="mt-2 font-semibold">${product.price}</p>
    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
