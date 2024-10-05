import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalText } from './GlobalText';
import { formatDateToPeruTime, formatHourToPeruTime, monthParser } from '../utils/dateUtils';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

export function InfoCard({ item, style }) {
  return (
    <View style={[styles.container, style]}>
      <GlobalText style={styles.title}>{item.eventTitle}</GlobalText>
      <View style={styles.row}>
        <Feather name="calendar" size={16} color={colors.textPlaceholder} />
        <GlobalText style={styles.infoText}>
          {formatDateToPeruTime(item.eventDate)} a las {formatHourToPeruTime(item.eventDate)}
        </GlobalText>
      </View>
      <View style={styles.row}>
        <Feather name="map-pin" size={16} color={colors.textPlaceholder} />
        <GlobalText style={styles.infoText}>{item.eventLocation.address}</GlobalText>
      </View>
      <View style={styles.row}>
        <Feather name="users" size={16} color={colors.textPlaceholder} />
        <GlobalText style={styles.infoText}>{item.eventCapacity} personas</GlobalText>
      </View>
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
