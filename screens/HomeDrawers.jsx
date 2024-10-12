import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomMainHeader } from "../components/CustomMainHeader";
import { HomeTabs } from "./HomeTabs";
import { ProfileScreen } from "./drawerNavigatorScreens/ProfileScreen";
import { ReservationsScreen } from "./drawerNavigatorScreens/ReservationsScreen";
import { ConfigurationScreen } from "./drawerNavigatorScreens/ConfigurationScreen";

const Drawer = createDrawerNavigator();

export function HomeDrawers() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: () => <CustomMainHeader navigation={navigation} />, // Asigna el header personalizado
      })}
    >
      <Drawer.Screen name="Mistika" component={HomeTabs} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Reservaciones" component={ReservationsScreen} />
      <Drawer.Screen name="Configuracion" component={ConfigurationScreen} />
    </Drawer.Navigator>
  );
}
