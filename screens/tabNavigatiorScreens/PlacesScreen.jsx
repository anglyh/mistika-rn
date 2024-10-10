import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { getAllPlaces } from '../../services/getPlaces';

export function PlacesScreen() {
  const [places, setPlaces] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlaces = async () => {
      const places = await getAllPlaces();
      setPlaces(places);
    };
    fetchPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Lugares Turísticos" placeholder="Buscar lugares turísticos"/>
      <FlatList
        data={places}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.placeCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("PlaceDetailsScreen", {
              image: item.imageUri,
              name: item.title,
              history: item.history,
            })}
          >
            <Image source={{ uri: item.imageUri }} style={styles.placeImage} />
            <Text style={styles.placeName}>{item.title}</Text>
            <View style={styles.interactions}>
              <View style={styles.interactionItem}>
                <Ionicons name="heart-outline" size={20} color="black" />
                <Text>{item.likes}</Text>
              </View>

              <View style={styles.interactionItem}>
                <Ionicons name="chatbox-ellipses-outline" size={20} color="black" />
                <Text>{item.comments}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  placeCard: {
    borderRadius: 10,
    marginVertical: 10
  },
  placeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  placeName: {
    fontSize: 18,
    fontFamily: 'DMSans_SemiBold',
    marginTop: 10,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
