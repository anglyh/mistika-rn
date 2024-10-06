import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { RestaurantInfoCard } from "../../components/RestaurantInfoCard";
import MapView from "react-native-maps";
import { Button } from "../../components/Button";
import colors from "../../theme/colors";
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalText } from "../../components/GlobalText";

export function RestaurantDetailsScreen({ route }) {
  const { image, title, description, location, menu } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primario }}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay} />
      <RestaurantInfoCard restaurant={{ title, description, location, menu, image }} />
      <View style={styles.eventMapWrapper}>
        <GlobalText style={styles.eventDescription}>{description}</GlobalText>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "50%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    position: "absolute",
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    height: "50%",
  },
  eventMapWrapper: {
    gap: 20,
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
    paddingBottom: 20, // Espaciado adicional
  },
  eventDescription: {
    textAlign: "justify",
    padding: 16, // Espaciado interno
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 50, // Borde redondeado para el mapa
    overflow: "hidden", // Evita que el contenido (mapa) sobrepase los bordes redondeados
  },
});
