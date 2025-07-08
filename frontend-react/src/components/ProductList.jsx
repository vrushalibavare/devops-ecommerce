import React from "react";
import ProductCard from "./ProductCard";

const products = [
  { name: "Sunglasses", price: 1200, image: "sunglasses.jpg" },
  { name: "Mobile Phone", price: 25000, image: "mobilephone.jpg" },
  { name: "Handbag", price: 3400, image: "handbag.jpg" },
];

const ProductList = () => {
  return (
    <section className="products-section">
      {products.map((p, idx) => (
        <ProductCard key={idx} product={p} />
      ))}
    </section>
  );
};

export default ProductList;
