import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login/customer", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again."
    );
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register/customer", userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again."
    );
  }
};
