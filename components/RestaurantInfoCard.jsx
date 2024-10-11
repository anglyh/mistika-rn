import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import { GlobalText } from './GlobalText';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

export function RestaurantInfoCard({ item, style }) {
  // Calcular la calificación promedio
  const calculateAverageRating = (reviews) => {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <View style={[styles.container, style]}>
      
      <GlobalText style={styles.title}>{item.title}</GlobalText>
      <GlobalText style={styles.description}>{item.description}</GlobalText>
      
      <View style={styles.row}>
        <Feather name="map-pin" size={16} color={colors.textPlaceholder} />
        <GlobalText style={styles.infoText}>{item.location.address|| "Dirección no disponible"}</GlobalText>
      </View>
      
      <View style={styles.row}>
        <Feather name="star" size={16} color={colors.textPlaceholder} />
        <GlobalText style={styles.infoText}>
          Calificación Promedio: {calculateAverageRating(item.reviews)}
        </GlobalText>
      </View>

      <GlobalText style={styles.menuTitle}>Menú:</GlobalText>
      <FlatList
        data={item.menu || []}
        keyExtractor={(item) => item.item}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <GlobalText style={styles.menuText}>{item.item}</GlobalText>
            <GlobalText style={styles.menuText}>S/. {item.price.toFixed(2)}</GlobalText>
          </View>
        )}
      />
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
    marginBottom: 5,
  },
  title: {
    fontFamily: 'DMSans_Bold',
    fontSize: 20,
    marginBottom: 14,
    color: colors.secundario,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
    color: colors.text,
  },
  menuTitle: {
    fontSize: 18,
    fontFamily: 'DMSans_Bold',
    color: colors.secundario,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  menuText: {
    fontSize: 14,
    color: colors.text,
  },
});
