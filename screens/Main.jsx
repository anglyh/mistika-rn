import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Register } from "./Register";
import { Home } from "./Home"; // Asegúrate de crear este componente
import { Login } from "./Login"; // Asegúrate de crear este componente
import { View } from "react-native";

const Stack = createStackNavigator();

export function Main() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
