import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-black text-white flex justify-between items-center px-6 shadow-md">

      <div className="text-2xl font-bold">ShoppersStop</div>

      <div className="hidden md:flex gap-6">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/about" className="hover:text-gray-400">About Us</Link>
        <Link to="/products" className="hover:text-gray-400">Products</Link>
        <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
      </div>

      <div className="md:hidden">
        <button className="text-white text-2xl">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
