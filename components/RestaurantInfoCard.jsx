import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import { GlobalText } from './GlobalText';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

export function RestaurantInfoCard({ restaurant, style }) {
  // Calcular la calificación promedio
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <GlobalText style={styles.title}>{restaurant.title}</GlobalText>
      <GlobalText style={styles.description}>{restaurant.description}</GlobalText>
      
      <View style={styles.row}>
        <Feather name="map-pin" size={16} color={colors.textPlaceholder} />
        <GlobalText style={styles.infoText}>{restaurant.location}</GlobalText>
      </View>
      
      <View style={styles.row}>
        <Feather name="star" size={16} color={colors.textPlaceholder} />
        <GlobalText style={styles.infoText}>
          Calificación Promedio: {calculateAverageRating(restaurant.reviews)}
        </GlobalText>
      </View>

      <GlobalText style={styles.menuTitle}>Menú:</GlobalText>
      <FlatList
        data={restaurant.menu}
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontFamily: 'DMSans_Bold',
    fontSize: 20,
    marginBottom: 8,
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
