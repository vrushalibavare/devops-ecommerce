import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4 flex justify-between">
    <Link to="/" className="font-bold text-lg">
      ShopMate
    </Link>
    <div>
      <Link to="/" className="mr-4">
        Home
      </Link>
      <Link to="/cart">Cart</Link>
    </div>
  </nav>
);

export default Navbar;
