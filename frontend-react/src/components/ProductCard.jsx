import React from "react";

const ProductCard = ({ product }) => {
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
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      alert(`${product.name} added to cart`);
    } catch (err) {
      console.error("Error adding to cart:", err.message);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="product-card">
      <img src={`/assets/${product.image}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <button className="add-to-cart" onClick={handleAddToCart}>
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
