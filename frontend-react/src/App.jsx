import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

// Example products data (replace with your actual data or API)
const products = [
  {
    id: 1,
    name: "Sunglasses",
    price: 49.99,
    image: "/images/sunglasses.jpg",
  },
  {
    id: 2,
    name: "Mobile Phone",
    price: 699.99,
    image: "/images/mobilephone.jpg",
  },
  {
    id: 3,
    name: "Handbag",
    price: 89.99,
    image: "/images/handbag.jpg",
  },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
