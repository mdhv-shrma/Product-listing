import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../utilities/ThemeContext";
import { ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isAuthenticated", "false");
    setDropdownOpen(false);
    toast.success("Logged out successfully!", { position: "top-center" });
    navigate("/");
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      toast.warning("Please log in to access the cart!", { position: "top-center", autoClose: 2000 });
      navigate("/signup");
    }
  };

  return (
    <>
      <nav
        className={`z-1 top-0 sticky w-full h-16 flex justify-between items-center px-6 shadow-md transition-colors duration-300 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <Link to="/" className="text-2xl font-bold">
          ShoppersStop
        </Link>

        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/aboutus" className="hover:text-gray-400">About Us</Link>
          <Link to="/products" className="hover:text-gray-400">Products</Link>
          <Link to="/contactus" className="hover:text-gray-400">Contact Us</Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-300">
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {/* Cart Button with Authentication Check */}
          <div className="relative">
            <button onClick={handleCartClick} className="relative">
              <ShoppingCart size={28} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>

          {!isAuthenticated ? (
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500">
              Sign Up
            </Link>
          ) : (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 flex items-center gap-2">
                <User size={20} />
                Profile
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                    My Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Toast Container (Required for displaying toasts) */}
      <ToastContainer />
    </>
  );
};

export default Navbar;
