import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={`/assets/${product.image}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button className="add-to-cart">
        <img
          src="/assets/cart-icon.jpg"
          alt="Cart"
          style={{ width: "20px", marginRight: "8px" }}
        />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
