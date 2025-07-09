import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_PRODUCT_API + "/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <section className="products-section">
      {products.map((product, idx) => (
        <ProductCard key={product.id || idx} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
