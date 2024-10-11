import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { InfoCard } from "../../components/InfoCard";
import { GlobalText } from "../../components/GlobalText";
import MapView from "react-native-maps";
import { Button } from "../../components/Button";
import { SafeAreaView } from 'react-native-safe-area-context';

export function EventDetailsScreen({ route }) {
  const {
    eventImage,
    eventDescription,
    eventLocation,
  } = route.params;

  return (
    <View className="flex-1 justify-between bg-primario">
      <Image source={{ uri: eventImage }} style={styles.image} />
      <View style={styles.overlay} />
      <View className="flex-1" />
      {/* Vista principal */}
      <View style={styles.container}>
        <InfoCard item={route.params}/>
        <View style={styles.eventMapWrapper}>
          <View className="overflow-hidden h-16 mt-4 md:mt-8">
            <GlobalText className="text-sm md:text-lg" style={styles.eventDescription} numberOfLines={3}>{eventDescription}</GlobalText>
          </View>
          <View style={styles.mapContainer}>
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: eventLocation.coordinates[1],
                longitude: eventLocation.coordinates[0],
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
              }}
            />
          </View>
          <Button content="Inscribirse" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    position: "absolute",
    height: "50%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    height: "50%",
  },
  container: { 
    height: "65%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 9,
    paddingHorizontal: 16,
  },
  eventMapWrapper: {
    gap: 20,
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
  },
  eventDescription: {
    textAlign: "justify",
  },
  mapContainer: {
    borderRadius: 50, // Aquí aplicas el borde redondeado
    overflow: "hidden", // Evita que el contenido (mapa) sobrepase los bordes redondeados
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
  },
});
