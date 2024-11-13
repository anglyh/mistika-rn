import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';  // Añadido Text
import { ClientCard } from '../../components/ClientCard'; 
import { getAllClients } from '../../services/getClients'; 
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors'; 
import { SearchBar } from '../../components/SearchBar';
import { SectionHeader } from '../../components/SectionHeader';

export function ClientsScreen() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [others, setOthers] = useState([]);

  const fetchClients = async () => {
    try {
      const allClients = await getAllClients();
      setClients(allClients);
      filterClientsByType(allClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchClients();
  }, []);

  const filterClientsByType = (clientsList) => {
    const restaurantsList = clientsList.filter(client => client.clientType === 'Restaurante');
    const hotelsList = clientsList.filter(client => client.clientType === 'Hotel');
    const othersList = clientsList.filter(client => client.clientType === 'Otro');

    setRestaurants(restaurantsList);
    setHotels(hotelsList);
    setOthers(othersList);
  };

  const handleFilter = (filtered) => {
    filterClientsByType(filtered);
  };

  const ClientList = ({ data, title }) => (
    <View style={styles.sectionContainer}>
      <SectionHeader 
        title={title} 
        onPress={() => {}} 
        style={styles.sectionHeader} 
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        data={data}
        keyExtractor={(client) => client._id}
        renderItem={({ item: client }) => (
          <ClientCard 
            client={client}
            onPress={() => navigation.navigate("ClientDetailsScreen", {
              clientId: client._id,
              image: client.photos[0]?.photoReference || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
              name: client.name,
              clientType: client.clientType,
              description: client.editorialSummary,
              location: client.location,
            })}
          />
        )}
      />
    </View>
  );

  const NoResultsMessage = () => {
    const hasNoResults = restaurants.length === 0 && hotels.length === 0 && others.length === 0;
    return hasNoResults ? (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>No se encontraron resultados</Text>
      </View>
    ) : null;
  };

  return (
    loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secundario} />
      </View>
    ) : (
      <View style={styles.container}>
        <SearchBar items={clients} onFilter={handleFilter} />
        <View style={styles.contentContainer}>
          <FlatList
            data={[
              { key: 'restaurants', title: 'Restaurantes', data: restaurants },
              { key: 'hotels', title: 'Hoteles', data: hotels },
              { key: 'others', title: 'Otros', data: others }
            ]}
            renderItem={({ item }) => (
              <ClientList 
                data={item.data} 
                title={item.title}
              />
            )}
            keyExtractor={(item) => item.key}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoResultsMessage />}
          />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primario,
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontFamily: 'DMSans_Regular',
    fontSize: 16,
    color: colors.textPlaceholder,
  },
});