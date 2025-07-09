import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BackgroundSection from "./components/BackgroundSection";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

const HomePage = () => (
  <>
    <header className="text-center p-6 bg-gray-100 text-3xl font-bold">
      Welcome to ShopMate
    </header>
    <BackgroundSection />
    <section className="p-6">
      <ProductList />
    </section>
  </>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
