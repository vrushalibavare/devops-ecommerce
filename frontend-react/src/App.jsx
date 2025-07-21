import React from 'react';
import './App.css';

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

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>ShopMate</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Cart</a>
        </nav>
      </header>
      
      <main>
        <section className="hero">
          <h2>Welcome to ShopMate</h2>
          <p>Discover amazing products at great prices</p>
        </section>
        
        <section className="products">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img 
                  src={`/assets/${product.image}`} 
                  alt={product.name} 
                  className="product-img"
                  onError={(e) => {
                    console.error(`Failed to load image: ${product.image}`);
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/200x200?text=No+Image";
                  }}
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <button className="add-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer>
        <p>&copy; 2025 ShopMate. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;