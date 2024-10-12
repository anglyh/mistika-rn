import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { SectionHeader, EventCard, RecommendedEvent } from '../../components/EventComponents';
import { getRecommendedEvents, getAllEvents } from '../../services/getEvents';

export function EventsScreen({ navigation }) {

  const mapEventData = (event) => ({
    eventId: event._id,
    eventTitle: event.title,
    eventDescription: event.description,
    eventDate: event.date,
    eventLocation: event.location,
    eventImage: event.imageUri,
    eventTags: event.tags,
    eventCapacity: event.capacity,
  })

  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchEvents();
  }, []);

  return ( 
    loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 0 }}>
        {/* Sección de Eventos Recomendados */}
        <SectionHeader title="Eventos Recomendados" onPress={() => {}} style={{ marginBottom: 10 }} />
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          data={recommendedEvents}
          keyExtractor={(event) => event._id}
          renderItem={({ item: event }) => (
            <RecommendedEvent 
              event={event}
              onPress={() => navigation.navigate("EventDetails", { ...mapEventData(event) })} 
            />
          )}
        />
      </View>

      <View style={{ flex: 1 }}>
        {/* Sección de Eventos del Mes */}
        <SectionHeader title="Eventos este Mes" onPress={() => {}} style={{ marginVertical: 10 }}/>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          data={monthlyEvents}
          keyExtractor={(event) => event._id}
          renderItem={({ item: event }) => 
            <EventCard 
              event={event}
              onPress={() => navigation.navigate("EventDetails", { ...mapEventData(event) })}
            />
          }
        />
      </View>
      </View>
    )
  );
}

