import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { normalizeImagePath } from "../utils/imageUtils";
import CONFIG from "../config";
import { getProducts } from "../utils/mockApi";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        if (CONFIG.USE_MOCK_DATA) {
          const data = await getProducts();
          console.log("Product catalog data:", data);
          setProducts(data);
        } else {
          const response = await fetch(`${CONFIG.PRODUCT_API}/products`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Product catalog data:", data);
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="products">
      <h2>Product Catalog</h2>
      <p style={{textAlign: 'center', marginBottom: '2rem', color: '#666'}}>
        Browse our product details. <Link to="/" style={{color: '#2563eb', textDecoration: 'none'}}>Visit Home page to purchase</Link>.
      </p>
      
      {loading ? (
        <p style={{textAlign: 'center'}}>Loading products...</p>
      ) : error ? (
        <div style={{color: 'red', padding: '1rem', border: '1px solid red', margin: '1rem 0'}}>
          <p>Error loading products: {error}</p>
          <p>Please try again later or contact support.</p>
        </div>
      ) : products.length === 0 ? (
        <p style={{textAlign: 'center'}}>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img 
                src={`/assets/${normalizeImagePath(product.image)}`} 
                alt={product.name} 
                className="product-img" 
              />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
                <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '1rem'}}>
                  {product.description}
                </p>
                {product.features && (
                  <div style={{marginBottom: '1rem'}}>
                    <strong style={{fontSize: '0.9rem'}}>Features:</strong>
                    <ul style={{fontSize: '0.8rem', color: '#666', paddingLeft: '1.5rem', marginTop: '0.5rem'}}>
                      {product.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div style={{textAlign: 'center', padding: '0.5rem', background: '#f8f9fa', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#666'}}>
                  <Link to="/" style={{color: '#2563eb', textDecoration: 'none'}}>
                    Visit Home page to purchase this item
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;