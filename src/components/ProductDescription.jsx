import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900">
      <Link to="/products" className="text-blue-500 hover:underline">← Back to Products</Link>
      <div className="mt-6 flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-green-600">${product.price}</p>
          </div>
          <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;