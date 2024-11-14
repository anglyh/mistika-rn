import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../theme/colors';
import { GlobalText } from './GlobalText';
import { Button } from './Button';

export function PlaceDetailsModal({ placeDetails, modalVisible, setModalVisible, getDirections, destination }) {
  if (!modalVisible) return null;

  // Función para renderizar estrellas basadas en el rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Número de estrellas completas
    const hasHalfStar = rating % 1 >= 0.5; // Si tiene media estrella
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Número de estrellas vacías

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16} color="gold" />
        ))}
        {hasHalfStar && <Ionicons name="star-half" size={16} color="gold" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="gold" />
        ))}
      </>
    );
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalView}>
        <GlobalText style={styles.modalTitle}>{placeDetails?.name}</GlobalText>
        <View style={styles.ratingContainer}>
          <GlobalText style={styles.ratingText}>{placeDetails?.rating || '4.5'}</GlobalText>
          {renderStars(placeDetails?.rating || 4.5)}
        </View>
        <GlobalText style={styles.addressText}>{placeDetails?.address}</GlobalText>

        {/* FlatList para mostrar imágenes */}
        <FlatList
          data={placeDetails?.photos}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.thumbnailImage} resizeMode="cover" />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageScroll}
        />

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              setModalVisible(false);
              if (destination) getDirections(destination);
            }}
            color={colors.secundarioMorado}
            variant="filled"
            buttonStyles={styles.directionButton}
          >
            <GlobalText style={styles.buttonText}>Iniciar</GlobalText>
          </Button>
          <Button
            onPress={() => setModalVisible(false)}
            color={colors.secundario}
            variant="filled"
            buttonStyles={styles.closeButton}
          >
            <GlobalText style={styles.buttonText}>Cerrar</GlobalText>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 10,
    alignItems: 'center',
  },
  modalView: {
    width: '94%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    elevation: 3,
    gap: 5,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.secundario,
    fontFamily: 'DMSans_SemiBold',
    paddingBottom: 7,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginRight: 5,
  },
  addressText: {
    fontSize: 14,
    color: colors.textPlaceholder,
  },
  imageScroll: {
    marginVertical: 3,
  },
  thumbnailImage: {
    width: 90,
    height: 70,
    borderRadius: 8,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  directionButton: {
    flex: 1,
    backgroundColor: colors.secundarioMorado,
    alignItems: 'center',
    marginRight: 5,
  },
  closeButton: {
    flex: 1,
    backgroundColor: colors.secundario,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'DMSans_SemiBold',
  },
});
