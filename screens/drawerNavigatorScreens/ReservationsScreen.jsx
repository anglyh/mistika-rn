import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAuthContext } from "../../context/AuthContext";
import { getUserReservations } from '../../services/getReservations';
import { GlobalText } from '../../components/GlobalText';

export function ReservationsScreen({ navigation }) {
  const { user } = useAuthContext();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user && user.userId) {
        try {
          const reservationsData = await getUserReservations(user.userId);
          setReservations(reservationsData);
        } catch (error) {
          console.error('Error fetching reservations:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("Usuario no definido o sin ID");
      }
    };

    fetchReservations();

    // Actualiza las reservaciones cada 5 minutos
    const interval = setInterval(() => {
      fetchReservations();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : (
      <View style={styles.container}>
        <GlobalText style={styles.title}>Tus Reservaciones</GlobalText>
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reservationItem}>
              <GlobalText>ID: {item.id}</GlobalText>
              <GlobalText>Fecha: {item.date}</GlobalText>
              <GlobalText>Estado: {item.status}</GlobalText>
              <GlobalText>Monto: ${item.amount}</GlobalText>
              <GlobalText>Método de pago: {item.method}</GlobalText>
            </View>
          )}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  reservationItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
});
