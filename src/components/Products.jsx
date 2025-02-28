import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Products = () => {
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
  }, [searchTerm,data]);

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-l-md focus:outline-none"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-800"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p className="text-center text-white">Loading products...</p>
      ) : (
        <div className="flex flex-wrap gap-10 justify-center">
          {filteredData.length > 0 ? (
            filteredData.map((prod) => (
              <div key={prod.id} className="h-96 w-[20%]">
                <Link to={`/products/${prod.id}`}>
                  <ProductCard data={prod} />
                </Link>
              </div>
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
