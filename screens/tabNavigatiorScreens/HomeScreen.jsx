import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Modal, Text, Button, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env'; // Importamos la API key desde el entorno

export function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [places, setPlaces] = useState([]); // Lugares cercanos
  const [placeType, setPlaceType] = useState(''); // Tipo de lugar seleccionado
  const [showPlaces, setShowPlaces] = useState(false); // Mostrar u ocultar lugares

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

  const togglePlaces = async (type) => {
    if (placeType === type && showPlaces) {
      setShowPlaces(false); // Ocultar lugares si ya están visibles
      setPlaces([]);
    } else {
      setPlaceType(type);
      setShowPlaces(true);
      fetchNearbyPlaces(type);
    }
  };

  const fetchNearbyPlaces = async (type) => {
    if (!location) return;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=1500&type=${type}&key=${GOOGLE_MAPS_API_KEY}`
      );
      setPlaces(response.data.results);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  const getDirections = async (destinationLoc) => {
    const origin = `${location.latitude},${location.longitude}`;
    const destination = `${destinationLoc.latitude},${destinationLoc.longitude}`;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.routes.length > 0) {
        const points = decodePolyline(response.data.routes[0].overview_polyline.points);
        setRouteCoords(points);
      } else {
        Alert.alert('No se encontraron rutas');
      }
    } catch (error) {
      console.error('Error en la solicitud a Google Directions API:', error);
    }
  };

  const decodePolyline = (t, e = 5) => {
    let points = [];
    let index = 0, len = t.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Buscar destino"
        fetchDetails={true}
        onPress={(data, details = null) => {
          const destinationCoords = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          };
          setDestination(destinationCoords);
          getDirections(destinationCoords);

          const photoReference = details.photos ? details.photos[0].photo_reference : null;
          const photoUrl = photoReference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`
            : null;

          setPlaceDetails({
            name: details.name,
            address: details.formatted_address,
            photoUrl,
          });
          setModalVisible(true);
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'es',
        }}
        styles={{
          container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
          listView: { backgroundColor: 'white' },
        }}
      />

      <MapView
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
                photoUrl: place.photos
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
                  : null,
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

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => togglePlaces('restaurant')} style={styles.button}>
          <Text>Restaurantes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePlaces('tourist_attraction')} style={styles.button}>
          <Text>Lugares Turísticos</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          {placeDetails?.photoUrl && (
            <Image
              source={{ uri: placeDetails.photoUrl }}
              style={styles.modalImage}
              resizeMode="cover"
            />
          )}
          <Text style={styles.modalText}>{placeDetails?.name}</Text>
          <Text style={styles.modalText}>{placeDetails?.address}</Text>
          <Button
            title="Iniciar"
            onPress={() => {
              setModalVisible(false);
              if (destination) getDirections(destination);
            }}
          />
          <Button
            title="Cerrar"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
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
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
