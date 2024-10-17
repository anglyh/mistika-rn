import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { RestaurantCard } from '../../components/RestaurantCard'; 
import { getAllClients } from '../../services/getClients';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors'; 
import { GlobalText } from '../../components/GlobalText'; 

export function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const fetchRestaurants = async () => {
    try {
      const allRestaurants = await getAllClients();
      console.log(allRestaurants); // Verifica los datos aquí
      setRestaurants(allRestaurants); // Asegúrate de que allRestaurants sea un array
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secundario} />
      </View>
    );
  }

  if (restaurants.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <GlobalText>No se encontraron restaurantes</GlobalText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        numColumns={2} 
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 5 }}
        data={filteredRestaurants}
        keyExtractor={(restaurant) => restaurant._id}
        renderItem={({ item: restaurant }) => (
          <RestaurantCard 
            restaurant={restaurant}
            onPress={() => navigation.navigate("RestaurantDetailsScreen", { // Asegúrate de que el nombre coincida
              image: restaurant.image,
              name: restaurant.name,
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
    backgroundColor: colors.primario,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: colors.secundario,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 16,
    fontFamily: 'DMSans_Regular', // Usa la misma fuente
  },
});
