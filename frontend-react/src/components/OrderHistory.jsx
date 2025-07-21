import React, { useEffect, useState } from "react";
import CONFIG from "../config";
import { getOrders, clearOrders as mockClearOrders } from "../utils/mockApi";

const OrderHistory = () => {
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

  const clearOrderHistory = async () => {
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
          <button onClick={clearOrderHistory} style={{background: '#dc2626', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer'}}>
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
        <div>
          {orders.map((order, idx) => (
            <div key={idx} style={{padding: '1rem', border: '1px solid #ddd', margin: '1rem 0', borderRadius: '0.5rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.5rem'}}>
                <h3>Order #{order.order_id}</h3>
                <span style={{
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '0.25rem', 
                  fontSize: '0.8rem',
                  backgroundColor: order.status === 'Delivered' ? '#dcfce7' : '#fef9c3',
                  color: order.status === 'Delivered' ? '#166534' : '#854d0e'
                }}>
                  {order.status}
                </span>
              </div>
              
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              
              {order.items && (
                <div style={{marginTop: '1rem', backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.25rem'}}>
                  <p><strong>Items:</strong></p>
                  <ul style={{paddingLeft: '1.5rem'}}>
                    {order.items.map((item, itemIdx) => (
                      <li key={itemIdx} style={{marginBottom: '0.5rem'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <img 
                            src={`/assets/${item.image}`} 
                            alt={item.name}
                            style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '0.25rem'}}
                          />
                          <div>
                            <div>{item.name}</div>
                            <div style={{fontSize: '0.8rem', color: '#666'}}>
                              ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div style={{marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '5px'}}>
        <h3>API Information</h3>
        <p>Order API: {CONFIG.ORDER_API}</p>
      </div>
    </div>
  );
};

export default OrderHistory;