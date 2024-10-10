import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerIcon } from '../components/DrawerIcon';
import { HomeTabs } from './HomeTabs';
import { ReservationsScreen } from './drawerNavigatorScreens/ReservationsScreen';
import { ConfigurationScreen } from './drawerNavigatorScreens/ConfigurationScreen';

const Drawer = createDrawerNavigator();

export function HomeDrawers() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeft: () => <DrawerIcon />,
      }}
    >
      <Drawer.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="Reservations" component={ReservationsScreen} />
      <Drawer.Screen name="Configuration" component={ConfigurationScreen} />
    </Drawer.Navigator>
  );
}
