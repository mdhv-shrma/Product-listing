// src/api/cartApi.js
import axios from 'axios';

// Assume your backend runs on localhost:5000
const API_URL = 'http://localhost:5000/api/cart';

// Helper to get the auth token (if you use token-based auth)
// Adjust this based on how you store your token (localStorage, sessionStorage, etc.)
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken'); // Example: Get token from local storage
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Function to get the user ID - replace with your actual logic
// Maybe from Redux state or Auth Context
const getUserId = (getState) => {
   // Example: Assuming user info is stored in an 'auth' slice of your Redux state
   // const userId = getState().auth.user.id;
   // return userId;

   // For now, let's assume it's passed directly or retrieved differently
   // Replace this placeholder logic
   const userId = localStorage.getItem('userId'); // Example placeholder
   if (!userId) {
       console.error("User ID not found. Ensure user is logged in.");
       // You might want to throw an error or handle this more gracefully
   }
   return userId;
}

// Fetch all cart items for the logged-in user
export const apiGetCart = async (userId) => {
  if (!userId) throw new Error("User ID is required to fetch cart.");
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data; // Should be an array of cart items
  } catch (error) {
    console.error("API Error fetching cart:", error.response?.data || error.message);
    throw error;
  }
};

// Add an item to the cart
export const apiAddToCart = async (productId, quantity, userId) => {
  if (!userId) throw new Error("User ID is required to add to cart.");
  try {
    const response = await axios.post(`${API_URL}/add`,
      { user_id: userId, product_id: productId, quantity },
      { headers: getAuthHeaders() }
    );
    return response.data; // Contains { message, cartItem }
  } catch (error) {
    console.error("API Error adding to cart:", error.response?.data || error.message);
    throw error;
  }
};

// Update item quantity (increases/decreases)
// Note: Your backend uses cartItemId for update/remove.
// You'll need to ensure your frontend knows the cart.id after fetching/adding.
export const apiUpdateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/update/${cartItemId}`,
      { quantity },
      { headers: getAuthHeaders() }
    );
    return response.data; // Contains { message, cartItem }
  } catch (error) {
    console.error("API Error updating cart item:", error.response?.data || error.message);
    throw error;
  }
};

// Remove an item entirely from the cart
export const apiRemoveCartItem = async (cartItemId) => {
  try {
    const response = await axios.delete(`${API_URL}/remove/${cartItemId}`, {
      headers: getAuthHeaders(),
    });
    return response.data; // Contains { message }
  } catch (error) {
    console.error("API Error removing cart item:", error.response?.data || error.message);
    throw error;
  }
};

// Optional: Clear the entire cart
export const apiClearCart = async (userId) => {
  if (!userId) throw new Error("User ID is required to clear cart.");
  try {
    const response = await axios.delete(`${API_URL}/clear/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data; // Contains { message }
  } catch (error) {
    console.error("API Error clearing cart:", error.response?.data || error.message);
    throw error;
  }
};