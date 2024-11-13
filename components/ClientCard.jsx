import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalText } from './GlobalText';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.75; // Card takes up 75% of screen width

export function ClientCard({ client, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.clientCardContainer}>
      <View style={styles.clientCard}>
        <Image
          source={{ 
            uri: client.photos?.[0]?.photoReference || 
                 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.clientDetails}>
          <GlobalText style={styles.title}>{client.name}</GlobalText>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="white" />
            <GlobalText style={styles.locationText}>{client.location.address}</GlobalText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  clientCardContainer: {
    width: CARD_WIDTH,
    height: 150, // Altura fija para la tarjeta
    borderRadius: 15,
  },
  clientCard: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
  },
  clientDetails: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  title: {
    color: '#ffffff',
    fontFamily: 'DMSans_Bold',
    fontSize: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
  },
});