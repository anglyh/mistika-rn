import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { fetchNearbyPlaces } from '../../utils/mapUtils';
import colors from '../../theme/colors';
import { GlobalText } from '../../components/GlobalText';

export function PlacesScreen() {
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getLocationAndFetchPlaces = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso de ubicación denegado');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      await fetchNearbyPlaces(userLocation.coords, 'tourist_attraction', setPlaces, 2500);
    };

    getLocationAndFetchPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => {
            //console.log(JSON.stringify(item, null, 2));
            return index.toString()
          }
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.placeCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("PlaceDetailsScreen", {
              image: item.photos?.[0], // Usa la primera foto si está disponible
              name: item.name,
              address: item.vicinity,
              rating: item.rating,
              location: item.geometry.location,
            })}
          >
            <Image 
              source={
                item.photos && item.photos[0]
                  ? { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}` }
                  : { uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }
              } 
              style={styles.placeImage} 
            />
            <View style={styles.interactions}>
            <GlobalText style={styles.placeName}>{item.name}</GlobalText>
              <View style={styles.interactionItem}>
                <Ionicons name="star" size={20} color="gold" />
                <GlobalText>{item.rating}</GlobalText>
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
    color: colors.secundario,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
