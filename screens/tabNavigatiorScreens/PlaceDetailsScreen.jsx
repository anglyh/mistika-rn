import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../../theme/colors";
import MapView from "react-native-maps";
import { Button } from "../../components/Button";
import { InfoCard } from "../../components/InfoCard";

export function PlaceDetailsScreen({ route }) {
    const { image, location } = route.params;
    // console.log("PlaceDetailsScreen -> image", image);
    // console.log("PlaceDetailsScreen -> location", location);

    const imageSource =
        image && typeof image === 'object' && image.photo_reference
            ? { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${image.photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}` }
            : { uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' };

    console.log('Photo reference ',image.photo_reference);

    return (
        <View style={styles.screen}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.overlay} />
            <View style={styles.flex1} />
            <View style={styles.mainContent}>
                <InfoCard item={route.params} />
                <View style={styles.placeMapWrapper}>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location?.lat || 0,
                                longitude: location?.lng || 0,
                                latitudeDelta: 0.025,
                                longitudeDelta: 0.025,
                            }}
                        />
                    </View>
                    <Button content="Ver más" onPress={() => {}} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.primarioGris,
    },
    flex1: {
        flex: 1
    },
    image: {
        width: "100%",
        position: "absolute",
        height: "50%",
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        zIndex: -1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        height: "50%",
    },
    mainContent: {
        height: "65%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 9,
        paddingHorizontal: 16,
    },
    placeMapWrapper: {
        gap: 20,
        justifyContent: "flex-end",
        flex: 0.6,
        width: "100%",
    },
    mapContainer: {
        borderRadius: 40,
        overflow: "hidden",
        flex: 1,
        width: "100%",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});