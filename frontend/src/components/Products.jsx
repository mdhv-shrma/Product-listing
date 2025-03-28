import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { ThemeContext } from '../utilities/ThemeContext';
import { useSelector } from 'react-redux';

const Products = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const { theme } = useContext(ThemeContext);
  const api = "https://dummyjson.com/products";
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch(api);
      const jsonRes = await res.json();
      setData(jsonRes.products || []);
      setFilteredData(jsonRes.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredData(data);
      } else {
        setFilteredData(
          data.filter((prod) =>
            prod.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm, data]);

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`px-4 py-2 border border-gray-400 rounded-l-md focus:outline-none ${
            theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        />
        
        <button
          onClick={() => setSearchTerm("")}
          className={`px-4 py-2 rounded-r-md ${
            theme === "light" ? "bg-gray-400 text-black" : "bg-gray-900 text-white"
          }`}
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p className="text-center text-white">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {filteredData.length > 0 ? (
            filteredData.map((prod) => (
              <ProductCard key={prod.id} data={prod} />
            ))
          ) : (
            <p className="text-center text-gray-400">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
