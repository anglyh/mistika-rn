import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = `http://192.168.1.40:5000/auth`;

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      await AsyncStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyToken: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
