import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { normalizeImagePath } from "./utils/imageUtils";
import CONFIG from "./config";
import { getProducts, getCart, addToCart as mockAddToCart, clearCart as mockClearCart, checkout as mockCheckout } from "./utils/mockApi";
import ProductCatalog from "./components/ProductCatalog";
import OrderHistory from "./components/OrderHistory";

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
    if (CONFIG.USE_MOCK_DATA) {
      getProducts().then(products => {
        setProducts(products);
        // Initialize quantities
        const initialQuantities = {};
        products.forEach(product => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
      }).catch(console.error);
    } else {
      fetch(CONFIG.PRODUCT_API + "/products")
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
    }
  }, []);

  const addToCart = async (product) => {
    const quantity = quantities[product.id] || 1;
    try {
      console.log('Adding to cart:', product, 'Quantity:', quantity);
      
      const item = {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      };
      
      if (CONFIG.USE_MOCK_DATA) {
        await mockAddToCart(item);
        alert(`${quantity} x ${product.name} added to cart!`);
      } else {
        const response = await fetch(`${CONFIG.CART_API}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        
        if (response.ok) {
          alert(`${quantity} x ${product.name} added to cart!`);
        } else {
          const errorText = await response.text();
          console.error('Error adding to cart:', errorText);
          alert(`Failed to add to cart: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Cart error:', error);
      alert(`Failed to add to cart: ${error.message}`);
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
              <img 
                src={`/assets/${normalizeImagePath(product.image)}`} 
                alt={product.name} 
                className="product-img" 
              />
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        
        if (CONFIG.USE_MOCK_DATA) {
          const data = await getCart();
          console.log('Mock cart data:', data);
          setCart(data);
        } else {
          const cartApiUrl = CONFIG.CART_API;
          console.log('Fetching cart from:', cartApiUrl);
          
          const response = await fetch(`${cartApiUrl}/cart`);
          console.log('Cart response status:', response.status);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch cart: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Cart data:', data);
          setCart(data);
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCart();
  }, []);

  const checkout = async () => {
    try {
      console.log('Checkout data:', { cart: cart.items, total: cart.total });
      
      if (CONFIG.USE_MOCK_DATA) {
        // Use mock checkout
        await mockCheckout(cart);
        await mockClearCart();
        alert('Order placed successfully!');
        window.location.reload();
      } else {
        const checkoutApiUrl = CONFIG.CHECKOUT_API;
        const cartApiUrl = CONFIG.CART_API;
        
        const response = await fetch(`${checkoutApiUrl}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: cart.items, total: cart.total })
        });
        
        if (response.ok) {
          alert('Order placed successfully!');
          // Clear cart
          await fetch(`${cartApiUrl}/cart/clear`, { method: 'DELETE' });
          window.location.reload();
        } else {
          const errorText = await response.text();
          throw new Error(errorText || 'Checkout failed');
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Checkout failed: ${error.message}`);
    }
  };

  return (
    <div className="products">
      <h2>Your Cart</h2>
      
      {loading ? (
        <p>Loading cart...</p>
      ) : error ? (
        <div style={{color: 'red', padding: '1rem', border: '1px solid red', margin: '1rem 0'}}>
          <p>Error loading cart: {error}</p>
          <p>Please try again later or contact support.</p>
        </div>
      ) : cart.items?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.items?.map((item, idx) => (
            <div key={idx} style={{padding: '1rem', border: '1px solid #ddd', margin: '1rem 0'}}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price} x {item.quantity}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <h3>Total: ${cart.total}</h3>
            <button className="btn" onClick={checkout} style={{marginTop: '1rem'}}>Checkout</button>
          </div>
        </div>
      )}
      
      <div style={{marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '5px'}}>
        <h3>API Information</h3>
        <p>Cart API: {CONFIG.CART_API}</p>
        <p>Checkout API: {CONFIG.CHECKOUT_API}</p>
      </div>
    </div>
  );
};

// Products Page - Catalog Only (No Shopping)
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (CONFIG.USE_MOCK_DATA) {
      getProducts()
        .then(products => {
          console.log("Product catalog data:", products);
          setProducts(products);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error loading products:", error);
          setLoading(false);
        });
    } else {
      fetch(CONFIG.PRODUCT_API + "/products")
        .then((res) => res.json())
        .then(products => {
          console.log("Product catalog data:", products);
          setProducts(products);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error loading products:", error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="products">
      <h2>Product Catalog</h2>
      <p style={{textAlign: 'center', marginBottom: '2rem', color: '#666'}}>
        Browse our product details. <Link to="/" style={{color: '#2563eb', textDecoration: 'none'}}>Visit Home page to purchase</Link>.
      </p>
      
      {loading ? (
        <p style={{textAlign: 'center'}}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={{textAlign: 'center'}}>No products found.</p>
      ) : (
        <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div style={{padding: '1rem', backgroundColor: '#f9fafb', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem'}}>
              <img 
                src={`/assets/${normalizeImagePath(product.image)}`} 
                alt={product.name} 
                style={{width: '100%', height: '200px', objectFit: 'contain', marginBottom: '1rem'}} 
              />
            </div>
            <div className="product-info" style={{padding: '1.5rem', flex: '1', display: 'flex', flexDirection: 'column'}}>
              <div style={{marginBottom: '0.5rem'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>{product.name}</h3>
                <div style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem'}}>${product.price}</div>
              </div>
              
              <div style={{flex: '1'}}>
                <div style={{marginBottom: '1rem'}}>
                  <h4 style={{fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Description</h4>
                  <p style={{fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5'}}>
                    {product.description}
                  </p>
                </div>
                
                {product.features && (
                  <div style={{marginBottom: '1rem'}}>
                    <h4 style={{fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Features</h4>
                    <ul style={{fontSize: '0.9rem', color: '#4b5563', paddingLeft: '1.5rem'}}>
                      {product.features.map((feature, idx) => (
                        <li key={idx} style={{marginBottom: '0.25rem'}}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div style={{marginTop: 'auto', textAlign: 'center', padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem'}}>
                <Link to="/" style={{color: '#2563eb', textDecoration: 'none', fontWeight: 'medium'}}>
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        if (CONFIG.USE_MOCK_DATA) {
          const data = await getOrders();
          console.log('Mock orders data:', data);
          setOrders(data.orders || []);
        } else {
          const orderApiUrl = CONFIG.ORDER_API;
          console.log('Fetching orders from:', orderApiUrl);
          
          const response = await fetch(`${orderApiUrl}/orders`);
          console.log('Orders response status:', response.status);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch orders: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Orders data:', data);
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const clearOrders = async () => {
    if (confirm('Clear all order history?')) {
      try {
        if (CONFIG.USE_MOCK_DATA) {
          await mockClearOrders();
          setOrders([]);
          alert('Orders cleared!');
        } else {
          const orderApiUrl = CONFIG.ORDER_API;
          
          const response = await fetch(`${orderApiUrl}/orders/clear`, { method: 'DELETE' });
          
          if (!response.ok) {
            throw new Error(`Failed to clear orders: ${response.status}`);
          }
          
          setOrders([]);
          alert('Orders cleared!');
        }
      } catch (error) {
        console.error('Error clearing orders:', error);
        alert(`Failed to clear orders: ${error.message}`);
      }
    }
  };

  return (
    <div className="products">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2>Your Orders</h2>
        {!loading && !error && orders.length > 0 && (
          <button onClick={clearOrders} style={{background: '#dc2626', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer'}}>
            Clear History
          </button>
        )}
      </div>
      
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <div style={{color: 'red', padding: '1rem', border: '1px solid red', margin: '1rem 0'}}>
          <p>Error loading orders: {error}</p>
          <p>Please try again later or contact support.</p>
        </div>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} style={{padding: '1rem', border: '1px solid #ddd', margin: '1rem 0'}}>
            <h3>Order #{order.order_id}</h3>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
            {order.items && (
              <div style={{marginTop: '1rem'}}>
                <p><strong>Items:</strong></p>
                <ul style={{paddingLeft: '1.5rem'}}>
                  {order.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      {item.name} - ${item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
      
      <div style={{marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '5px'}}>
        <h3>API Information</h3>
        <p>Order API: {CONFIG.ORDER_API}</p>
      </div>
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
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;