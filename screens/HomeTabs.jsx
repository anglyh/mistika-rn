import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./tabNavigatiorScreens/HomeScreen";
import { EventsScreen } from "./tabNavigatiorScreens/EventsScreen";

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Eventos" component={EventsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
