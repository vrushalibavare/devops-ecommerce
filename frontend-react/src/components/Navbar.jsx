import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white shadow-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">ShopMate</span>
        </Link>
        
        {/* Center Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Products
          </Link>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <span>🛒</span>
            <span>Cart</span>
          </Link>
          <Link to="/orders" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Orders
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;