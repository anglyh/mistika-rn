import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getAllRestaurants() {
  try {
    const response = await axios.get(`${apiUrl}/clients/`);
    console.log(response.data); // Verifica los
    const restaurants = response.data;
    
    // Suponiendo que cada fila tiene 2 tarjetas, limitamos el total a 4 restaurantes (2 filas de 2 tarjetas)
    const limitedRestaurants = restaurants.slice(0, 4); 
    return limitedRestaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}
