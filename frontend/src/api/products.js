import axios from "axios";

const API_URL = "http://localhost:5000/api/products";


export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch products";
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to add product";
  }
};
