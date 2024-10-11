import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getUserReservations(userId) {
  try {
    const response = await axios.get(`${apiUrl}/reservations/getByUserId/${userId}`);
    const reservations = response.data;

    console.log('Reservations:', reservations);
    return reservations.map(reservation => ({
      id: reservation._id,
      date: reservation.reservationDate,
      status: reservation.status,
      clientId: reservation.clientId,
      amount: reservation.paymentInfo.amount,
      method: reservation.paymentInfo.method,
      paymentDate: reservation.paymentInfo.paymentDate,
    }));
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
}
