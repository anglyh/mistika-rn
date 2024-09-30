import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { AuthContext } from "../../context/AuthContext";

export function HomeScreen() {

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({})