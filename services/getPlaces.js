import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getAllPlaces() {
  try {
    const response = await axios.get(`${apiUrl}/places/`);
    const places = response.data;
    return places;
  } catch (error) {
    console.error(error);
  }
}
