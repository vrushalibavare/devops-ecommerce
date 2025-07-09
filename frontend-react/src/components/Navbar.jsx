import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <Link to="/" className="text-xl font-bold">
      ShopMate
    </Link>
    <div className="flex space-x-4">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <Link to="/cart" className="hover:underline">
        🛒 Cart
      </Link>
      <Link to="/orders" className="hover:underline">
        📋 Orders
      </Link>
      <a href="http://localhost:5101/products" className="hover:underline" target="_blank">
        📦 Products API
      </a>
      <a href="http://localhost:5102/cart" className="hover:underline" target="_blank">
        🛒 Cart API
      </a>
      <a href="http://localhost:5104/orders" className="hover:underline" target="_blank">
        📋 Orders API
      </a>
    </div>
  </nav>
);

export default Navbar;
