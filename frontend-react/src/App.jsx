// frontend-react/src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import BackgroundSection from "./components/BackgroundSection";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <header className="text-center p-6 bg-gray-100 text-3xl font-bold">
        Welcome to ShopMate
      </header>
      <main className="flex-grow">
        <BackgroundSection />
        <section className="p-6">
          <ProductList />
        </section>
      </main>
    </div>
  );
}

export default App;
