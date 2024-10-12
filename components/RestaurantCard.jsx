import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';    
import colors from '../theme/colors'; // Asegúrate de importar tu archivo de colores
import { GlobalText } from '../components/GlobalText'; // Asegúrate de importar GlobalText

export function RestaurantCard({ restaurant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <GlobalText style={styles.title}>{restaurant.name}</GlobalText>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.addressContainer}>
        <Ionicons name="location-sharp" size={18} color={colors.secundario} />
        <GlobalText style={styles.addressText}>{restaurant.location.address}</GlobalText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.primario  , // Usa el color de fondo definido
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: "DMSans_Medium",
    color: colors.secundario,
    marginBottom: 5,
    height: 20, // Define la altura para el título
    textAlign: 'center', // Centra el texto
  },
  image: {
    width: '100%', // Ajusta al 100% del contenedor
    height: 100, // Define la altura de la imagen
    borderRadius: 10,
    marginBottom: 5, // Ajusta el margen inferior si es necesario
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40, // Define la altura para la dirección
  },
  addressText: {
    marginLeft: 5,
    fontSize: 11,
    color: colors.textPlaceholder, // Usa el color del texto del placeholder
  },
});
