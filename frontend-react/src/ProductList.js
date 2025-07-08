import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img
            src={`http://localhost:5001${product.image_url}`}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
