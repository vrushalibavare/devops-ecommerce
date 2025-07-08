import React, { useEffect, useState } from "react";
import { API } from "../config";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API.cartService}/cart`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      alert("Error fetching cart: " + err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${API.checkoutService}/checkout`, {
        method: "POST",
      });
      if (res.ok) {
        alert("Checkout successful!");
        setCartItems([]);
      } else {
        alert("Checkout failed.");
      }
    } catch (err) {
      alert("Error during checkout: " + err.message);
    }
  };

  return (
    <div className="cart p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.map((item) => (
        <div
          key={item.product_id}
          className="cart-item border p-2 mb-2 flex justify-between"
        >
          <div>
            <p className="font-semibold">{item.product_name}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
          <p>${item.price}</p>
        </div>
      ))}
      {cartItems.length > 0 && (
        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded"
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
