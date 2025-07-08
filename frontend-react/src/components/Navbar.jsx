import React from "react";

const Navbar = () => (
  <nav
    style={{
      background: "#1f2937",
      color: "white",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <span style={{ fontWeight: "bold" }}>ShopMate</span>
    <div>
      <a href="/cart" style={{ marginRight: "1rem", color: "white" }}>
        🛒 Cart
      </a>
      <a
        href="http://localhost:5101/products"
        style={{ marginRight: "1rem", color: "white" }}
      >
        📦 Products
      </a>
      <a
        href="http://localhost:5102/cart"
        style={{ marginRight: "1rem", color: "white" }}
      >
        🛒 Cart API
      </a>
      <a href="http://localhost:5103/checkout" style={{ color: "white" }}>
        💳 Checkout
      </a>
    </div>
  </nav>
);

export default Navbar;
