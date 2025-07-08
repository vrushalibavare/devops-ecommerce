import React, { useEffect, useState } from "react";
import CONFIG from "../config";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${CONFIG.PRODUCT_API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <section className="products-section">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={`/assets/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button>Add to Cart 🛒</button>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </section>
  );
};

export default ProductList;
