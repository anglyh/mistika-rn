import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { ClientCard } from '../../components/ClientCard'; 
import { getAllClients } from '../../services/getClients'; 
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors'; 
import { SearchBar } from '../../components/SearchBar';
import { SectionHeader } from '../../components/SectionHeader';

export function ClientsScreen() {
  const [clients, setClients] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchClients = async () => {
    try {
      const allclients = await getAllClients();
      setClients(allclients);
      setFilteredItems(allclients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchClients();
  }, []);

  const handleFilter = (filtered) => {
    setFilteredItems(filtered);
  }

  return (
    loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secundario} />
      </View>
    ) : (
      <View style={styles.container}>
        <SearchBar item={clients} onFilter={handleFilter} />
        <SectionHeader title="Restaurantes" onPress={() => {}} style={{ marginBottom: 10 }} />
        <View style={{ flex: 0 }}>
          {/* Sección de Restaurantes Recomendados */}
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 16 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            data={filteredItems}
            keyExtractor={(client) => client._id}
            renderItem={({ item: client }) => (
              <ClientCard 
                client={client}
                onPress={() => navigation.navigate("ClientDetailsScreen", {
                  image: client.photos[0]?.photoReference || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
                  name: client.name,
                  description: client.description,
                  location: client.location,
                  menu: client.menu 
                })}
              />
            )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
