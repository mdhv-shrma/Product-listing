import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../utilities/ThemeContext';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const cart = useSelector((state)=>state.cart);
  const totalQuantity = cart.reduce((total,item)=>total+item.quantity,0);
  return (
    <nav className={`z-1 top-0 sticky w-full h-16 flex justify-between items-center px-6 shadow-md transition-colors duration-300
    ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>

      <Link to="/" className="text-2xl font-bold">ShoppersStop</Link>

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

        <div className="relative">
          <Link to="/cart">
            <ShoppingCart size={28} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
