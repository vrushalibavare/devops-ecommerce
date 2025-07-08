import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <Link to="/">Shopmate</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/cart" style={{ marginLeft: "1rem" }}>
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
