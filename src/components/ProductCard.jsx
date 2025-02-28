import React from 'react';

const ProductCard = ({ data }) => {
  console.log('data', data);
  
  return (
    <div className='h-full w-full flex flex-col rounded-lg overflow-hidden shadow-lg'>
      <div className='h-[70%] w-full'>
        <img 
          src={data.images[0]} 
          alt={data.title} 
          className='h-full w-full object-cover' 
        />
      </div>

      <div className='h-[30%] w-full  p-2 bg-white'>
        <p className=' font-semibold text-gray-800'>{data.title}</p>
        <div className='flex gap-2'>
            <p className='line-through'>${data.price}</p>
            <p>${(data.price - (data.price*(data.discountPercentage/100))).toFixed(2) }</p>
        </div>
        <p className='bg-black text-white inline p-1 text-sm rounded-lg'>{data.discountPercentage}% off</p>
      </div>
    </div>
  );
};

export default ProductCard;
