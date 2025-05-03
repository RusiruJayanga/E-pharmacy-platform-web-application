import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API}/login`, { email, password });
    return res.data;
  } catch (error) {
    throw error.response.data.message || "Login failed";
  }
};
