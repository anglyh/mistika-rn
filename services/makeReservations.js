import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const makeReservation = async (reservationData) => {
  const response = await axios.post(`${apiUrl}/reservations/`, reservationData);
  return response.data
}