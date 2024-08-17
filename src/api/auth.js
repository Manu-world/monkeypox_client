// src/api/auth.js
import axios from "axios";

const API_URL = "https://monkeypox-api.onrender.com/api/auth/";
// const API_URL = "http://localhost:5000/api/auth/";

axios.defaults.withCredentials = true;

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    return response.data; // Ensure backend is returning { token, user }
  } catch (error) {
    console.error("Login API error:", error.response?.data || error.message);
    throw error.response?.data || new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
