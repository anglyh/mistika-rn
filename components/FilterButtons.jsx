import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../theme/colors';

export function FilterButtons({ togglePlaces }) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={() => togglePlaces('restaurant')} style={styles.button}>
        <Ionicons name="restaurant" size={20} color={colors.secundarioMorado} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => togglePlaces('tourist_attraction')} style={styles.button}>
        <Ionicons name="flag-outline" size={20} color={colors.secundarioMorado} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 80,
    left: 20,
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: colors.primarioGris,
    padding: 12,
    borderRadius: 25,
    elevation: 3,
  },
});

