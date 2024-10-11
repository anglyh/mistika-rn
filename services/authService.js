import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      console.log("Login response:", response.data);
      return "Login exitoso";
    } catch (error) {
      console.error("Error en el servicio de login: ", error.response?.data.message || error.message);
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, { name, email, password });  
      await AsyncStorage.setItem("token", response.data.token);
      console.log("Register response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en el servicio de registro: ", error.response?.data.message || error.message);
      throw new Error(error.response?.data?.message || error.message);
    }
  },
  
  getToken: async () => {
    return await AsyncStorage.getItem("token");
  },
  
  decodeToken: (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }
};
