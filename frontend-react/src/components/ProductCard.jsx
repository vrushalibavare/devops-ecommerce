import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>
      <button>
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
