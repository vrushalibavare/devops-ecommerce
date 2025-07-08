import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
