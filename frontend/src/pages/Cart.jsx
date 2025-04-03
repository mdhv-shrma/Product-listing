import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart, addToCart } from "../store/actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart || []); // Ensure cart is always an array

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemoveItem = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleIncreaseQuantity = (cartItem) => {
    const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 }; // Increment quantity
    dispatch(addToCart(updatedItem)); // Dispatch the updated item
  };

  const handleDecreaseQuantity = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  return (
    <div className="w-4/5 mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-black">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col items-center p-4 border rounded-lg bg-gray-100 shadow-md hover:scale-105 transition-transform">
              <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="text-center mt-3">
                <h2 className="text-lg font-semibold text-black">{item.name}</h2>
                <p className="text-black">${item.price}</p>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <button
                    className="px-3 py-1 bg-gray-500 text-black rounded-lg"
                    onClick={() => handleDecreaseQuantity(item)}
                  >
                    -
                  </button>
                  <span className="text-lg text-black">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-500 text-black rounded-lg"
                    onClick={() => handleIncreaseQuantity(item)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveItem(item)} className="mt-3 px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600 transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
