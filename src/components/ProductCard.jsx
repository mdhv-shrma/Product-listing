
import React, { useContext } from 'react';
import { ThemeContext } from '../utilities/ThemeContext';
import { useDispatch, useSelector} from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart);
  const cartItem = cart.find((item)=>item.id===data.id)
  return (
    <div
      className={`h-full w-full flex flex-col rounded-lg overflow-hidden shadow-lg transition-colors duration-300
        ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"}`}
    >
<Link to={`/products/${data.id}`}>
      <div className="h-[70%] w-full">
        <img
          src={data.images[0]}
          alt={data.title}
          className="h-full w-full object-cover"
        />
      </div>


      <div className="h-[30%] w-full p-2">
        <p className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{data.title}</p>

        <div className="flex gap-2">
          <p className="line-through">${data.price}</p>
          <p>${(data.price - (data.price * (data.discountPercentage / 100))).toFixed(2)}</p>
        </div>

        <p className={`inline p-1 text-sm rounded-lg 
          ${theme === "light" ? "bg-black text-white" : "bg-white text-black"}`}>
          {data.discountPercentage}% off
        </p>


      </div>
      </Link>
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
          className={`mt-2 px-4 py-2 bg-black text-white rounded-lg ${theme === "light" ? "bg-black text-white" : " bg-gray-500 "}`}
          onClick={() => dispatch(addToCart(data))}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
