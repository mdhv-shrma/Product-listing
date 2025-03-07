import React, { useContext } from 'react';
import { ThemeContext } from '../utilities/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItem = cart.find((item) => item.id === data.id);

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden shadow-lg transition duration-300 transform hover:scale-105
        ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"}
      `}
    >
      <Link to={`/products/${data.id}`}>
        <div className="w-full h-56 flex justify-center items-center overflow-hidden bg-gray-200">
          <img
            src={data.images[0]}
            alt={data.title}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <p className="font-semibold truncate">{data.title}</p>
        <div className="flex gap-2 mt-1">
          <p className="line-through text-gray-500">${data.price}</p>
          <p className="font-bold">
            ${(data.price - (data.price * (data.discountPercentage / 100))).toFixed(2)}
          </p>
        </div>

        <p className={`inline w-1/3 p-1 text-sm rounded-lg 
          ${theme === "light" ? "bg-black text-white" : "bg-white text-black"}`}>
          {data.discountPercentage}% off
        </p>

        <div className="mt-auto flex justify-center ">
          {cartItem ? (
            <div className="flex items-center justify-center gap-4 mt-2">
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded-lg"
                onClick={() => dispatch(removeFromCart(data.id))}
              >
                -
              </button>
              <span className="text-lg">{cartItem.quantity}</span>
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded-lg"
                onClick={() => dispatch(addToCart(data))}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="mt-2 px-4 py-2 bg-black text-white rounded-lg w-full hover:bg-gray-700"
              onClick={() => dispatch(addToCart(data))}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
