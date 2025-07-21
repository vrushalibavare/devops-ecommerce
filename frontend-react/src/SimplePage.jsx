import React from "react";
import SimpleProductList from "./components/SimpleProductList";

const SimplePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">ShopMate</h1>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Products</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Cart</a>
          </nav>
        </div>
      </header>
      
      <main>
        <section className="py-12 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to ShopMate</h1>
            <p className="text-xl mb-6">Discover amazing products at great prices</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </section>
        
        <SimpleProductList />
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 ShopMate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SimplePage;