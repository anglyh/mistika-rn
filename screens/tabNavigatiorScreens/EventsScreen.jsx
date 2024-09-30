import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { SectionHeader, EventCard, RecommendedEvent } from '../../components/EventComponents';
import { getRecommendedEvents, getAllEvents } from '../../services/getEvents';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { EventDetailsScreen } from './EventDetailsScreen';

export function EventsScreen() {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener eventos recomendados y eventos del mes
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();
        setMonthlyEvents(allEvents);

        const recommendedEvents = await getRecommendedEvents();
        setRecommendedEvents(recommendedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Ocultar loader cuando se carguen los datos
      }
    };

    fetchEvents();

    // Configurar un intervalo para actualizar solo los eventos recomendados cada 60 segundos
    const interval = setInterval(() => {
      fetchEvents();
    }, 60000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Mostrar indicador de carga mientras los datos se están obteniendo
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexGrow: 0 }}>
        {/* Sección de Eventos Recomendados */}
        <SectionHeader title="Eventos Recomendados" onPress={() => {}} />
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recommendedEvents}
          keyExtractor={(event) => event._id}
          renderItem={({ item: event }) => (
            <RecommendedEvent 
              event={event}
              onPress={() => navigation.navigate("EventDetails")} 
            />
          )}
        />
      </View>

      <View style={{ flex: 1 }}>
        {/* Sección de Eventos del Mes */}
        <SectionHeader title="Eventos este Mes" onPress={() => {}} />
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          data={monthlyEvents}
          keyExtractor={(event) => event._id}
          renderItem={({ item: event }) => 
            <EventCard 
              event={event}
              onPress={() => navigation.navigate("EventDetails")}
            />
          }
        />
      </View>
    </View>
  );
}

