import React from 'react';

const products = [
  {
    id: 1,
    name: "Stylish Handbag",
    price: 49.99,
    image: "handbag.jpg"
  },
  {
    id: 2,
    name: "Smartphone Pro",
    price: 799.99,
    image: "mobilephone.jpg"
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 99.99,
    image: "sunglasses.jpg"
  }
];

function SimpleApp() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Product Images Test</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <img 
              src={`/assets/${product.image}`} 
              alt={product.name}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              onError={(e) => {
                console.error(`Failed to load image: ${product.image}`);
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.display = 'flex';
                e.target.style.justifyContent = 'center';
                e.target.style.alignItems = 'center';
                e.target.style.color = '#666';
                e.target.style.fontSize = '14px';
                e.target.style.padding = '10px';
                e.target.style.textAlign = 'center';
                e.target.innerText = `Image not found: ${product.image}`;
              }}
            />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleApp;