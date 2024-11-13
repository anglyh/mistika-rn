import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./tabNavigatiorScreens/HomeScreen";
import { EventsScreen } from "./tabNavigatiorScreens/EventsScreen";
import { ClientsScreen } from "./tabNavigatiorScreens/ClientsScreen";
import { PlacesScreen } from "./tabNavigatiorScreens/PlacesScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../theme/colors";

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secundarioMorado, // Color para pestaña seleccionada
        tabBarInactiveTintColor: colors.textPlaceholder,   // Color para pestaña inactiva
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Eventos"
        component={EventsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Servicios"
        component={ClientsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="business-center" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Lugares"
        component={PlacesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="place" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
