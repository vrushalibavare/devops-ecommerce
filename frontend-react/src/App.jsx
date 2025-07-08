import React from "react";
import Navbar from "./components/Navbar";
import BackgroundSection from "./components/BackgroundSection";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <>
      <Navbar />
      <header
        style={{
          textAlign: "center",
          padding: "2rem 0",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        Welcome to Shopmate
      </header>
      <BackgroundSection />
      <ProductList />
    </>
  );
};

export default App;
