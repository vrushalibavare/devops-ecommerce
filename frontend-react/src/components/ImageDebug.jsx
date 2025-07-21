import React, { useEffect, useState } from 'react';
import CONFIG from '../config';

const ImageDebug = () => {
  // List of known image filenames
  const imageFiles = [
    'handbag.jpg',
    'mobilephone.jpg',
    'sunglasses.jpg',
    'cart-icon.jpg',
    'bg.jpg'
  ];
  
  const [productData, setProductData] = useState(null);
  
  useEffect(() => {
    // Try to fetch product data to see what image paths are coming from the API
    const apiUrl = CONFIG.PRODUCT_API;
    fetch(`${apiUrl}/products`)
      .then(res => res.json())
      .then(data => {
        console.log('API product data:', data);
        setProductData(data);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{padding: '20px', backgroundColor: '#f0f0f0', marginTop: '20px'}}>
      <h2>Image Debug</h2>
      
      <div style={{marginBottom: '20px'}}>
        <h3>Static Image Tests</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
          {imageFiles.map(img => (
            <div key={img} style={{border: '1px solid #ddd', padding: '10px', textAlign: 'center'}}>
              <img 
                src={`/assets/${img}`} 
                alt={img}
                style={{maxWidth: '100px', maxHeight: '100px'}}
                onError={(e) => {
                  e.target.style.border = '2px solid red';
                  e.target.style.padding = '5px';
                  e.target.style.width = '50px';
                  e.target.style.height = '50px';
                }}
              />
              <div>{img}</div>
            </div>
          ))}
        </div>
      </div>
      
      {productData && (
        <div style={{marginTop: '20px'}}>
          <h3>API Product Images</h3>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
            {productData.map((product, idx) => (
              <div key={idx} style={{border: '1px solid #ddd', padding: '10px', textAlign: 'center'}}>
                <div style={{fontWeight: 'bold', marginBottom: '5px'}}>{product.name}</div>
                <div style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>Image path: {product.image}</div>
                <img 
                  src={`/assets/${product.image}`} 
                  alt={product.name}
                  style={{maxWidth: '100px', maxHeight: '100px', marginBottom: '10px'}}
                  onError={(e) => {
                    e.target.style.border = '2px solid red';
                    e.target.style.padding = '5px';
                    e.target.style.width = '50px';
                    e.target.style.height = '50px';
                  }}
                />
                <div style={{fontSize: '12px', marginTop: '5px'}}>Using filename only:</div>
                <img 
                  src={`/assets/${product.image?.split('/').pop() || product.image}`} 
                  alt={product.name}
                  style={{maxWidth: '100px', maxHeight: '100px'}}
                  onError={(e) => {
                    e.target.style.border = '2px solid red';
                    e.target.style.padding = '5px';
                    e.target.style.width = '50px';
                    e.target.style.height = '50px';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDebug;