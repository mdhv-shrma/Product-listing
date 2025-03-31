import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Base API URL


export const signUpUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Sign Up Failed";
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Login Failed";
  }
};
