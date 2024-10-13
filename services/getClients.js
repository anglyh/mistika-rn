import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getAllClients() {
  try {
    const response = await axios.get(`${apiUrl}/clients/`);
    const clients = response.data;
    //console.log("Clients:", clients);
    
    return clients;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}