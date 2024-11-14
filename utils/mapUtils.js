import axios from 'axios';
import { Alert } from 'react-native';
import { decodePolyline } from './polylineUtils';

export const getDirections = async (origin, destination, setRouteCoords) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
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

export const fetchNearbyPlaces = async (location, type, setPlaces) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=1500&type=${type}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    setPlaces(response.data.results);
  } catch (error) {
    console.error('Error fetching nearby places:', error);
  }
};
