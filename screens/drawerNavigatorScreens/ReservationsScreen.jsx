import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAuthContext } from "../../context/AuthContext";
import { getUserReservations } from '../../services/getReservations';

export function ReservationsScreen({ navigation }) {
  const { user } = useAuthContext();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user && user.id) {
        try {
          const reservationsData = await getUserReservations(user.id);
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
  }, [user]);

  return (
    loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>Tus Reservaciones</Text>
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reservationItem}>
              <Text>ID: {item.id}</Text>
              <Text>Fecha: {item.date}</Text>
              <Text>Estado: {item.status}</Text>
              <Text>Monto: ${item.amount}</Text>
              <Text>Método de pago: {item.method}</Text>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reservationItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
});
