import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalText } from './GlobalText';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import { formatDateToPeruTime, formatHourToPeruTime } from '../utils/dateUtils';

export function InfoCard({ item, style }) {
  // Verificar si `item` es un evento o un lugar
  const isEvent = item?.eventTitle !== undefined;

  return (
    <View style={[styles.container, style]}>
      <GlobalText style={styles.title}>{isEvent ? item.eventTitle : item.name || "Nombre no disponible"}</GlobalText>
      {isEvent ? (
        <>
          <View style={styles.row}>
            <Feather name="calendar" size={16} color={colors.textPlaceholder} />
            <GlobalText style={styles.infoText}>
              {item.eventDate ? `${item.eventDate}` : "Fecha no disponible"}
            </GlobalText>
          </View>
          <View style={styles.row}>
            <Feather name="map-pin" size={16} color={colors.textPlaceholder} />
            <GlobalText style={styles.infoText}>{item.eventLocation?.address || "Ubicación no disponible"}</GlobalText>
          </View>
          <View style={styles.row}>
            <Feather name="users" size={16} color={colors.textPlaceholder} />
            <GlobalText style={styles.infoText}>{item.eventCapacity ? `${item.eventCapacity} personas` : "Capacidad no disponible"}</GlobalText>
          </View>
        </>
      ) : (
        <>
          <View style={styles.row}>
            <Feather name="star" size={16} color="gold" />
            <GlobalText style={styles.infoText}>{item.rating ? `${item.rating}` : "Rating no disponible"}</GlobalText>
          </View>
          <View style={styles.row}>
            <Feather name="map-pin" size={16} color={colors.textPlaceholder} />
            <GlobalText style={styles.infoText}>{item.address || "Dirección no disponible"}</GlobalText>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    gap: 10,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'DMSans_Bold',
    fontSize: 20,
    marginBottom: 14,
    color: colors.secundario,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
  },
});
