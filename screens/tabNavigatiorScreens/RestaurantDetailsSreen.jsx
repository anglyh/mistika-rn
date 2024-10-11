import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { RestaurantInfoCard } from "../../components/RestaurantInfoCard"; 
import { GlobalText } from "../../components/GlobalText";
import MapView from "react-native-maps";
import { Button } from "../../components/Button";

export function RestaurantDetailsScreen({ route }) {
  const {
    image,
    title,
    description,
    location,
    menu,
  } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: colors.primario }}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={{ flex: 1 }} />
      <View style={styles.container}>
        <RestaurantInfoCard restaurant={{ 
          title, 
          description, 
          location, 
          menu, 
          image 
        }} />
        <View style={styles.restaurantMapWrapper}>
          <View style={{ overflow: "hidden", height: 64, marginTop: 20 }}>
            <GlobalText style={styles.restaurantDescription} numberOfLines={3}>
              {description}
            </GlobalText>
          </View>
          <View style={styles.mapContainer}>
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: location.coordinates[1],
                longitude: location.coordinates[0],
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
              }}
            />
          </View>
          <Button content="Reservar Mesa" onPress={() => { }} />
        </View>
      </View>
    </View>
  );
}