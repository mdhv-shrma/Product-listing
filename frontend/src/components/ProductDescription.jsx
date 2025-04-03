import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProductDescription = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product; // Retrieve product data from props
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const cartItem = cart.find((item) => item.product_id === product.id);

  const handleAddToCart = () => {
    dispatch({
      type: cartItem ? "UPDATE_CART_ITEM" : "ADD_TO_CART",
      payload: cartItem
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { id: product.id, quantity: 1 },
    });
  };

  const handleRemoveFromCart = () => {
    if (cartItem.quantity > 1) {
      dispatch({
        type: "UPDATE_CART_ITEM",
        payload: { ...cartItem, quantity: cartItem.quantity - 1 },
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: cartItem.id,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900">
      <Link to="/products" className="text-blue-500 hover:underline">← Back to Products</Link>
      <div className="mt-6 flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full md:w-1/2 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p> {/* Display description */}
            <p className="text-lg font-semibold text-green-600">${product.price}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            {cartItem ? (
              <div className="flex items-center gap-4">
                <button
                  className="px-3 py-1 bg-gray-500 text-white rounded-lg"
                  onClick={handleRemoveFromCart}
                >
                  -
                </button>
                <span className="text-lg">{cartItem.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-500 text-white rounded-lg"
                  onClick={handleAddToCart}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
