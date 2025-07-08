import React from "react";
import Navbar from "./components/Navbar";
import BackgroundSection from "./components/BackgroundSection";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <Navbar />
      <header>Welcome to ShopMate</header>
      <BackgroundSection />
      <ProductList />
    </>
  );
}

export default App;
