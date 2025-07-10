import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

const Header = () => (
  <header className="header">
    <div className="logo">ShopMate</div>
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
    </nav>
  </header>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch(import.meta.env.VITE_PRODUCT_API + "/products")
      .then((res) => res.json())
      .then(products => {
        setProducts(products);
        // Initialize quantities
        const initialQuantities = {};
        products.forEach(product => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch(console.error);
  }, []);

  const addToCart = async (product) => {
    const quantity = quantities[product.id] || 1;
    try {
      const response = await fetch(`${import.meta.env.VITE_CART_API}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        }),
      });
      if (response.ok) {
        alert(`${quantity} x ${product.name} added to cart!`);
      }
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  return (
    <div>
      <section className="hero">
        <h1>Welcome to ShopMate</h1>
        <p>Discover amazing products at great prices</p>
        <button className="btn">Shop Now</button>
      </section>

      <section className="products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={`/assets/${product.image}`} alt={product.name} className="product-img" />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
                  <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Qty:</label>
                  <select 
                    value={quantities[product.id] || 1}
                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                    style={{padding: '0.25rem', border: '1px solid #ddd', borderRadius: '0.25rem'}}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <button className="add-btn" onClick={() => addToCart(product)}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Simple Cart Component
const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_CART_API}/cart`)
      .then(res => res.json())
      .then(setCart)
      .catch(console.error);
  }, []);

  const checkout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CHECKOUT_API}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cart.items, total: cart.total })
      });
      if (response.ok) {
        alert('Order placed successfully!');
        // Clear cart
        await fetch(`${import.meta.env.VITE_CART_API}/cart/clear`, { method: 'DELETE' });
        window.location.reload();
      }
    } catch (error) {
      alert('Checkout failed');
    }
  };

  return (
    <div className="products">
      <h2>Your Cart</h2>
      {cart.items?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.items?.map((item, idx) => (
            <div key={idx} style={{padding: '1rem', border: '1px solid #ddd', margin: '1rem 0'}}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price} x {item.quantity}</p>
            </div>
          ))}
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <h3>Total: ${cart.total}</h3>
            <button className="btn" onClick={checkout} style={{marginTop: '1rem'}}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Products Page - Catalog Only (No Shopping)
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_PRODUCT_API + "/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="products">
      <h2>Product Catalog</h2>
      <p style={{textAlign: 'center', marginBottom: '2rem', color: '#666'}}>
        Browse our product details. <Link to="/" style={{color: '#2563eb', textDecoration: 'none'}}>Visit Home page to purchase</Link>.
      </p>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={`/assets/${product.image}`} alt={product.name} className="product-img" />
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '1rem'}}>
                {product.description}
              </p>
              {product.features && (
                <div style={{marginBottom: '1rem'}}>
                  <strong style={{fontSize: '0.8rem'}}>Features:</strong>
                  <ul style={{fontSize: '0.8rem', color: '#666', paddingLeft: '1rem'}}>
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
    </div>
  );
};

// Simple Orders Component
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_ORDER_API}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .catch(console.error);
  }, []);

  const clearOrders = async () => {
    if (confirm('Clear all order history?')) {
      try {
        await fetch(`${import.meta.env.VITE_ORDER_API}/orders/clear`, { method: 'DELETE' });
        setOrders([]);
        alert('Orders cleared!');
      } catch (error) {
        alert('Failed to clear orders');
      }
    }
  };

  return (
    <div className="products">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2>Your Orders</h2>
        {orders.length > 0 && (
          <button onClick={clearOrders} style={{background: '#dc2626', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer'}}>
            Clear History
          </button>
        )}
      </div>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} style={{padding: '1rem', border: '1px solid #ddd', margin: '1rem 0'}}>
            <h3>Order #{order.order_id}</h3>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;