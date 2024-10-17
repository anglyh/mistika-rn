import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalText } from './GlobalText';

export function ClientCard({ client, onPress }) {

  return (
    <TouchableOpacity style={styles.clientCardContainer} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.clientCard}>
        <Image source={{ uri: client.photos[0]?.photoReference || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} style={styles.image} />
        <View style={styles.overlay} />
        <View style={styles.clientDetails}>
          <GlobalText style={styles.title}>{client.name}</GlobalText>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color="white" />
            <GlobalText style={styles.locationText}>{client.location.address}</GlobalText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  clientCardContainer: {
    borderRadius: 15,
    width: 280,
    height: 160,
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
