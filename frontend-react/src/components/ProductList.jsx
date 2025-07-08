// frontend-react/src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import cartIcon from "../assets/cart-icon.jpg";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_PRODUCT_API + "/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(({ id, name, price, imageName }) => (
        <div
          key={id}
          className="bg-white rounded-md shadow-md p-4 flex flex-col items-center"
        >
          <img
            src={`/src/assets/${imageName}`}
            alt={name}
            className="w-40 h-40 object-contain mb-4"
          />
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-gray-700 mb-4">${price}</p>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            <img src={cartIcon} alt="cart" className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
