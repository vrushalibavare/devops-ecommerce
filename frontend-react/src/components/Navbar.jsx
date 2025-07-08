import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white p-4 flex items-center justify-between">
      {/* Brand */}
      <Link to="/" className="font-extrabold text-xl tracking-wide">
        ShopMate
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 font-semibold">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-indigo-600 rounded shadow-md py-2 px-4 flex flex-col space-y-2 md:hidden z-10">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
