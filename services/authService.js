import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, { name, email, password });
      await AsyncStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyToken: async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
