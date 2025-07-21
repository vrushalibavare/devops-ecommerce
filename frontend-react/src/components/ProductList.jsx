import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CONFIG from "../config";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(CONFIG.PRODUCT_API + "/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, idx) => (
        <ProductCard key={product.id || idx} product={product} />
      ))}
    </div>
  );
};

export default ProductList;