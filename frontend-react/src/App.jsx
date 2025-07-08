import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";;
import bgImage from "./assets/bg.jpg";
import cartIcon from "./assets/cart-icon.jpg";
import sunglasses from "./assets/sunglasses.jpg";
import mobilephone from "./assets/mobilephone.jpg";
import handbag from "./assets/handbag.jpg";

const productAPI = import.meta.env.VITE_PRODUCT_API || "http://localhost:5101";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${productAPI}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {
        // fallback to static products if API fails
        setProducts([
          { id: 1, name: "Sunglasses", price: 29.99, image: sunglasses },
          { id: 2, name: "Mobile Phone", price: 599.99, image: mobilephone },
          { id: 3, name: "Handbag", price: 99.99, image: handbag },
        ]);
      });
  }, []);

  return (
    <>
      <Navbar />
      <header className="header">Welcome to Shopmate</header>

      <section
        className="bg-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></section>

      <section className="products-section">
        {products.map(({ id, name, price, image }) => (
          <div key={id} className="product-card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>${price.toFixed(2)}</p>
            <button className="add-cart-btn">
              <img src={cartIcon} alt="Cart" className="cart-icon" />
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
