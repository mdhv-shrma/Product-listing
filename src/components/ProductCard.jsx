
import React, { useContext } from 'react';
import { ThemeContext } from '../utilities/ThemeContext';

const ProductCard = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`h-full w-full flex flex-col rounded-lg overflow-hidden shadow-lg transition-colors duration-300
        ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"}`}
    >

      <div className="h-[70%] w-full">
        <img
          src={data.images[0]}
          alt={data.title}
          className="h-full w-full object-cover"
        />
      </div>


      <div className="h-[30%] w-full p-2">
        <p className="font-semibold">{data.title}</p>

        <div className="flex gap-2">
          <p className="line-through">${data.price}</p>
          <p>${(data.price - (data.price * (data.discountPercentage / 100))).toFixed(2)}</p>
        </div>

        <p className={`inline p-1 text-sm rounded-lg 
          ${theme === "light" ? "bg-black text-white" : "bg-white text-black"}`}>
          {data.discountPercentage}% off
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
