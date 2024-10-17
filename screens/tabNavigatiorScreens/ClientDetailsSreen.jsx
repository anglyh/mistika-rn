import { StyleSheet, View, Image } from "react-native";
import React from "react"; 
import { ClientDetailsInfoCard } from "../../components/ClientDetailsInfoCard";
import { Button } from "../../components/Button";

export function ClientDetailsScreen({ route }) {
  const {
    image,
  } = route.params;

  return (
    <View className="flex-1 justify-between bg-primario">
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay} />
      <View className="flex-1"></View>
      <View style={styles.container}>
        <ClientDetailsInfoCard item={route.params} />
        <View style={styles.restaurantDetails}>
          <Button content="Reservar Mesa" onPress={() => { /* Aquí puedes agregar la lógica para reservar */ }} />
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
  restaurantDetails: {
    marginTop: 20,
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
    paddingTop: 20,
  },
  restaurantDescription: {
    textAlign: "justify",
  },
});
