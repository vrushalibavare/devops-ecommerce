import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_PRODUCT_API + "/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
            <div key={product.id} className="bg-white rounded-lg border p-4">
              <img 
                src={`/assets/${product.image}`} 
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-3">${product.price}</p>
              
              {product.features && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-1">Features:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="text-sm text-gray-500 space-y-1">
                <p><span className="font-medium">Quality:</span> Premium</p>
                <p><span className="font-medium">Warranty:</span> 1 Year</p>
                <p><span className="font-medium">Shipping:</span> Free</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;