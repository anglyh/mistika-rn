import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./tabNavigatiorScreens/HomeScreen";
import { EventsScreen } from "./tabNavigatiorScreens/EventsScreen";
import { RestaurantsScreen } from "./tabNavigatiorScreens/RestaurantsScreen";
import { StoresScreen } from "./tabNavigatiorScreens/StoresScreen";
import { PlacesScreen } from "./tabNavigatiorScreens/PlacesScreen";

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Eventos" component={EventsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Restaurantes" component={RestaurantsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Tiendas" component={StoresScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Lugares" component={PlacesScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
