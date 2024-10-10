import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

export function StoresScreen({ navigation }) {
  const categories = [
    { id: 1, name: 'Restaurantes y Gastronomía', icon: 'restaurant' },
    { id: 2, name: 'Hoteles y Alojamiento', icon: 'bed' },
    { id: 3, name: 'Artesanías y Souvenirs', icon: 'basket' },
    { id: 4, name: 'Agencias de Tours', icon: 'airplane' },
    { id: 5, name: 'Transporte Local', icon: 'bus' },
    { id: 6, name: 'Hoteles y Alojamiento', icon: 'bed' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Tiendas Locales" placeholder="Buscar tiendas locales"/>

      <View style={styles.gridContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('CategoryDetails', { category })}
          >
            <Ionicons name={category.icon} size={50} color="white" style={styles.icon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 15
  },

  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10
  },
  categoryCard: {
    width: '45%',
    backgroundColor: '#898ACA',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'DMSans_SemiBold',
    textAlign: 'center',
    color: '#fff'
  },
});
