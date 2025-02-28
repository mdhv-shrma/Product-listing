import React from 'react'
import { Link } from 'react-router-dom';
import bgImage from '../assets/bg-img.avif';

const Home = () => {
  return (
    <div className='w-full relative'>
        <img src={bgImage} className='h-full w-full object-cover'/>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Link 
          to="/products" 
          className="px-6 py-3 bg-white text-black font-semibold text-lg rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
        >
          Explore More
        </Link>
      </div>
    </div>
  )
}

export default Home