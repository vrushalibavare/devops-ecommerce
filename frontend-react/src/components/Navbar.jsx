import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4 flex justify-between">
    <Link to="/" className="font-bold">
      eShop
    </Link>
    <Link to="/cart">Cart</Link>
  </nav>
);

export default Navbar;
