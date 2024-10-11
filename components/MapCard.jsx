import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const MapCard = ({ place }) => {
    const renderImages = ({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{place.name}</Text>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{place.rating}</Text>
                <View style={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                        <FontAwesome
                        key={i}
                        name="star"
                        size={20}
                        color={i < Math.round(place.rating) ? '#f1c40f' : '#bdc3c7'}
                        />
                    ))}
                </View>
            </View>
            <Text style={styles.address}>{place.address}</Text>
            <FlatList
                data={place.images}
                renderItem={renderImages}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                style={styles.imageList}
                showsHorizontalScrollIndicator={false}
            />
        </View> 
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,

    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 5,
  },
  stars: {
    flexDirection: 'row',
  },
  address: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  imageList: {
    marginTop: 10,
  },
  image: {
    width: 83,
    height: 83,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default MapCard;