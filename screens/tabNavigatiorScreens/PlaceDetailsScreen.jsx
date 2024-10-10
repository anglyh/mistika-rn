import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../theme/colors";
 
export function PlaceDetailsScreen({ route }) {
    const { image, name, history } = route.params;

    return(
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>
                {history}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primarioGris,
      padding: 20,
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      color: colors.secundario,
    },
    description: {
      marginTop: 10,
      fontSize: 16,
      color: '#333',
    },
  });