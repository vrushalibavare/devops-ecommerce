import React from "react";

const CartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.16 14.26l.84-3h7.92l.96 3H7.16zM7 4h2l1 5h8l1.1-2.2-1.33-1.33A.996.996 0 0016.66 5H7zm2.12 6l-.55 2H17v-2H9.12z" />
  </svg>
);

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <div className="price">${product.price.toFixed(2)}</div>
    <button>
      <CartIcon />
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
