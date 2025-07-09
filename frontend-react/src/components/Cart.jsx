import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CART_API}/cart`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_CHECKOUT_API}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart.items,
          total: cart.total,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        const result = await response.json();
        const order = result.order;
        alert(`🎉 Order Confirmed!\n\nOrder ID: ${order.order_id}\nTotal: $${order.total}\nStatus: ${order.status}\nEstimated Delivery: ${order.estimated_delivery}`);
        
        // Clear cart after successful checkout
        await fetch(`${import.meta.env.VITE_CART_API}/cart/clear`, {
          method: 'DELETE'
        });
        
        // Refresh cart display
        fetchCart();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Checkout failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="p-6">Loading cart...</div>;

  if (cart.count === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart ({cart.count} items)</h2>
      
      <div className="space-y-4">
        {cart.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <img 
                src={`/assets/${item.image || 'placeholder.jpg'}`} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${item.price}</p>
              <p className="text-sm text-gray-600">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total: ${cart.total.toFixed(2)}</span>
          <button 
            onClick={handleCheckout}
            disabled={checkingOut}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded"
          >
            {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;