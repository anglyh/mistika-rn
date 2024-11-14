import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '../theme/colors';

const EXPO_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export function GoogleSearchBar({ onPlaceSelected }) {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Buscar destino"
        placeholderTextColor={colors.textPlaceholder}
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            const destinationCoords = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            onPlaceSelected(destinationCoords, details);
          }
        }}
        query={{
          key: EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
          language: 'es',
        }}
        styles={{
          container: { flex: 0, width: '90%', alignSelf: 'center' },
          textInputContainer: styles.searchContainer,
          textInput: styles.searchInput,
          listView: styles.listView,
          row: styles.row, // Estilo del contenedor de cada resultado
          description: styles.description, // Estilo del texto de cada resultado
          separator: styles.separator, // Estilo de la línea entre resultados
          predefinedPlacesDescription: styles.predefinedPlacesDescription,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    width: '100%',
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: colors.primarioGris,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: 'DMSans_Regular',
    paddingLeft: 10,
    backgroundColor: 'transparent',
    borderRadius: 50,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 6,
    shadowOffset: { width: 0, height: 1 },
  },
  row: {
    backgroundColor: 'white',

    borderBottomColor: colors.primarioGris,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  description: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: 'DMSans_Regular',
  },
  separator: {
    height: 1,
    backgroundColor: colors.primarioGris,
  },
  predefinedPlacesDescription: {
    color: colors.secundarioMorado,
    fontSize: 14,
  },
});

