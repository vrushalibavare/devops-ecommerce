import React from "react";
import ProductCard from "./ProductCard";

const sampleProducts = [
  { name: "Sunglasses", price: 49.99, image: "/sunglasses.jpg" },
  { name: "Mobile Phone", price: 699.99, image: "/mobilephone.jpg" },
  { name: "Handbag", price: 89.99, image: "/handbag.jpg" },
];

const ProductList = () => (
  <div className="products-section">
    {sampleProducts.map((p, index) => (
      <ProductCard key={index} {...p} />
    ))}
  </div>
);

export default ProductList;
