import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import config from "../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use hardcoded products for now
    const hardcodedProducts = [
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
    ];
    
    setProducts(hardcodedProducts);
    setLoading(false);
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="text-lg">Loading products...</div></div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Catalog</h1>
          <p className="text-gray-600">Browse our complete product collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;