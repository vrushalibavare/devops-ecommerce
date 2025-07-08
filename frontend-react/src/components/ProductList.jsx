import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Sunglasses",
    description: "Stylish UV protection sunglasses.",
    price: 49.99,
    image: "/sunglasses.jpg",
  },
  {
    id: 2,
    name: "Mobile Phone",
    description: "Latest smartphone with great features.",
    price: 699.99,
    image: "/mobilephone.jpg",
  },
  {
    id: 3,
    name: "Handbag",
    description: "Elegant leather handbag.",
    price: 129.99,
    image: "/handbag.jpg",
  },
];

const ProductList = () => {
  return (
    <section className="products-section">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
