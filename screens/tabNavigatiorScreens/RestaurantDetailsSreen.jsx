import { StyleSheet, View, Image, ScrollView } from "react-native";
import React from "react"; 
import { RestaurantInfoCard } from "../../components/RestaurantInfoCard"; 
import { GlobalText } from "../../components/GlobalText";
import { Button } from "../../components/Button";
import colors from '../../theme/colors'; // Asegúrate de importar los colores

export function RestaurantDetailsScreen({ route }) {
  const {
    image,
    title,
    description,
    menu,
  } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.primario }}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.container}>
        <RestaurantInfoCard restaurant={{ 
          title, 
          description, 
          menu, 
          image 
        }} />
        <View style={styles.restaurantDetails}>
          <GlobalText style={styles.restaurantDescription} numberOfLines={3}>
            {description}
          </GlobalText>
          <Button content="Reservar Mesa" onPress={() => { /* Aquí puedes agregar la lógica para reservar */ }} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200, // Ajusta según sea necesario
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200, // Ajusta según sea necesario
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    padding: 16,
    backgroundColor: colors.primario,
  },
  restaurantDetails: {
    marginTop: 20,
  },
  restaurantDescription: {
    // Estilos para la descripción del restaurante
  },
});
