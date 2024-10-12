import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAuthContext } from "../../context/AuthContext";
import { getUserReservations } from '../../services/getReservations';
import { GlobalText } from '../../components/GlobalText';
import { formatDateToPeruTime } from '../../utils/dateUtils';
import colors from '../../theme/colors';

export function ReservationsScreen({ navigation }) {
  const { user } = useAuthContext();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchReservations();
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
              <GlobalText>Fecha: {formatDateToPeruTime(item.date)}</GlobalText>
              <GlobalText>Estado: {item.status}</GlobalText>
              <GlobalText>Monto: S./ {item.amount}</GlobalText>
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
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontFamily: 'DMSans_SemiBold',
    color: colors.secundario,
  },
  reservationItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
});
