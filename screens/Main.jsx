import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Register } from "./Register";
import { HomeTabs } from "./HomeTabs";
import { Login } from "./Login";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { authService } from "../services/authService";

const Stack = createStackNavigator();

function MainNavigator() {
  const insets = useSafeAreaInsets();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
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