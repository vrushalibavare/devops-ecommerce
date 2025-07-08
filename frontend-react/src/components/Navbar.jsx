// frontend-react/src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <Link to="/" className="text-xl font-bold">
      ShopMate
    </Link>
    <div>
      <Link to="/" className="mr-4 hover:underline">
        Home
      </Link>
      <Link to="/cart" className="hover:underline">
        Cart
      </Link>
    </div>
  </nav>
);

export default Navbar;
