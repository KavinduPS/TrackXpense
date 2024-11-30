import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.log("Error logging in", error);
  }
};
