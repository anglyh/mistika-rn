import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GoogleSearchBar } from '../../components/GoogleSearchBar';
import { PlaceDetailsModal } from '../../components/PlaceDetailsModal';
import { getDirections, fetchNearbyPlaces } from '../../utils/mapUtils';
import { FilterButtons } from '../../components/FilterButtons';
import colors from '../../theme/colors';

export function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [places, setPlaces] = useState([]);
  const [placeType, setPlaceType] = useState('');
  const [showPlaces, setShowPlaces] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso de ubicación denegado');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  const handlePlaceSelected = async (coords, details) => {
    setDestination(coords);
  
    if (location) {
      await getDirections(
        `${location.latitude},${location.longitude}`,
        `${coords.latitude},${coords.longitude}`,
        setRouteCoords
      );
    }
  
    const photos = details.photos
      ? details.photos.map(
          (photo) =>
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
        )
      : [];
  
    setPlaceDetails({
      name: details.name,
      address: details.formatted_address,
      rating: details.rating,
      photos, // Pasa la lista de URLs de fotos
    });
    setModalVisible(true);
  };
  

  const togglePlaces = async (type) => {
    if (placeType === type && showPlaces) {
      setShowPlaces(false);
      setPlaces([]);
    } else {
      setPlaceType(type);
      setShowPlaces(true);
      // Llama a fetchNearbyPlaces desde el archivo de utilidades y pasa los parámetros necesarios
      await fetchNearbyPlaces(location, type, setPlaces);
    }
  };

  const centerToUserLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSearchBar onPlaceSelected={handlePlaceSelected} />

      <MapView
        ref={mapRef}
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : -16.4090474,
          longitude: location ? location.longitude : -71.537451,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onPress={(e) => {
          const coords = e.nativeEvent.coordinate;
          setDestination(coords);
          setPlaceDetails({
            name: 'Lugar Seleccionado',
            address: '',
            photoUrl: null,
          });
          setModalVisible(true);
        }}
      >
        {location && <Marker coordinate={location} title="Tu ubicación actual" />}
        {showPlaces && places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            onPress={() => {
              setDestination({
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              });
              setPlaceDetails({
                name: place.name,
                address: place.vicinity,
                rating: place.rating,
                photos: place.photos
                ? place.photos.map(photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`)
                : [],
              });
              setModalVisible(true);
            }}
          />
        ))}
        {destination && (
          <Marker coordinate={destination} pinColor="blue" title="Destino Seleccionado" />
        )}
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="blue" />}
      </MapView>

      <TouchableOpacity style={styles.locationButton} onPress={centerToUserLocation}>
        <Ionicons name="locate" size={24} color={colors.secundarioMorado} />
      </TouchableOpacity>

      <FilterButtons togglePlaces={togglePlaces}/>

      <PlaceDetailsModal
        placeDetails={placeDetails}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        getDirections={() => getDirections(`${location.latitude},${location.longitude}`, `${destination.latitude},${destination.longitude}`, setRouteCoords)}
        destination={destination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationButton: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: colors.primarioGris,
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
});

