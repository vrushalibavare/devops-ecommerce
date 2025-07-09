import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_ORDER_API}/orders`);
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-6">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        <p className="text-gray-600">No orders found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Orders ({orders.length})</h2>
      
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.order_id}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {order.status}
                </span>
                <p className="text-lg font-bold mt-1">${order.total}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Items:</h4>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-2 mt-2 text-sm text-gray-600">
              <p>Payment: {order.payment_status}</p>
              <p>Delivery: {order.estimated_delivery}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;