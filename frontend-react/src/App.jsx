import React from "react";
import Navbar from "./components/Navbar";
import bgImage from "./assets/bg.jpg";
import cartIcon from "./assets/cart-icon.jpg"; // put your cart icon here

const products = [
  {
    id: 1,
    name: "Sunglasses",
    price: 99.99,
    image: require("./assets/sunglasses.jpg"),
  },
  {
    id: 2,
    name: "Mobile Phone",
    price: 499.99,
    image: require("./assets/mobilephone.jpg"),
  },
  {
    id: 3,
    name: "Handbag",
    price: 199.99,
    image: require("./assets/handbag.jpg"),
  },
];

export default function App() {
  return (
    <>
      <Navbar />
      <header>Welcome to ShopMate</header>

      <section
        className="bg-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></section>

      <section className="products-section">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image.default || product.image}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            >
              <img
                src={cartIcon}
                alt="cart"
                style={{ width: 20, marginRight: 8 }}
              />
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
