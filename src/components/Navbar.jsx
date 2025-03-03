import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../utilities/ThemeContext';

const Navbar = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <nav className={`w-full h-16 flex justify-between items-center px-6 shadow-md transition-colors duration-300
    ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>

      <div className="text-2xl font-bold">ShoppersStop</div>

      <div className="hidden md:flex gap-6">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/about" className="hover:text-gray-400">About Us</Link>
        <Link to="/products" className="hover:text-gray-400">Products</Link>
        <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-300"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
