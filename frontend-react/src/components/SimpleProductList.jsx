import React, { useEffect, useState } from "react";
import SimpleProductCard from "./SimpleProductCard";

const SimpleProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Stylish Handbag",
      price: 49.99,
      image: "handbag.jpg",
      description: "A fashionable handbag with multiple compartments"
    },
    {
      id: 2,
      name: "Smartphone Pro",
      price: 799.99,
      image: "mobilephone.jpg",
      description: "Latest smartphone with advanced features"
    },
    {
      id: 3,
      name: "Designer Sunglasses",
      price: 99.99,
      image: "sunglasses.jpg",
      description: "Trendy sunglasses with UV protection"
    }
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
      
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <SimpleProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleProductList;