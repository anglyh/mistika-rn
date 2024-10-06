import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { RestaurantCard } from '../../components/RestaurantCard'; 
import { getAllRestaurants } from '../../services/getRestaurants'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors'; 
import { GlobalText } from '../../components/GlobalText'; 

export function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const allRestaurants = await getAllRestaurants();
        setRestaurants(allRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secundario} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GlobalText style={styles.title}>Restaurantes</GlobalText>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar restaurantes"
          placeholderTextColor={colors.textPlaceholder}
          value={search}
          onChangeText={text => setSearch(text)} 
        />
        <Ionicons name="search" size={24} color={colors.text} style={{ marginLeft: 10 }} />
      </View>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        numColumns={2} 
        showsVerticalScrollIndicator={false}
        data={filteredRestaurants}
        keyExtractor={(restaurant) => restaurant._id}
        renderItem={({ item: restaurant }) => (
          <RestaurantCard 
            restaurant={restaurant}
            onPress={() => navigation.navigate("RestaurantDetailsScreen", { 
              image: restaurant.image,
              title: restaurant.title,
              description: restaurant.description,
              location: restaurant.location,
              menu: restaurant.menu 
            })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarioGris, // Cambia el color de fondo
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: "DMSans_SemiBold",
    color: colors.secundario,
    textAlign: 'center', // Centrar el texto
    marginTop: 30, // Espaciado vertical
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: colors.secundario, // Cambia el color del borde
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    fontFamily: 'DMSans', // Usa la misma fuente
  },
});
