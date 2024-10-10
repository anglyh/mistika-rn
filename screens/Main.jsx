import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider, useAuthContext } from '../context/AuthContext';
import { authService } from "../services/authService";
import { Login } from "./Login";
import { Register } from "./Register";
import { HomeDrawers } from './HomeDrawers';
import { HomeTabs } from './HomeTabs';

const Stack = createStackNavigator();

function MainNavigator() {
  const insets = useSafeAreaInsets();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const data = await authService.verifyToken(token);
          if (data.msg === "Token válido") {
            setIsLoggedIn(true);
          } else {
            throw new Error("Token inválido");
          }
        } catch (error) {
          await AsyncStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, [isLoggedIn]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Stack.Navigator>
        {isLoggedIn ? (

          <Stack.Group>
            
            <Stack.Screen name="HomeDrawers" component={HomeDrawers} options={{ headerShown: false }} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </View>
  );
}

export function Main() {
  return (
    <AuthProvider>
      <NavigationContainer>
        
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
