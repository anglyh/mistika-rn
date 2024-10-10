import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useAuthContext } from "../../context/AuthContext";
import { DrawerIcon } from '../../components/DrawerIcon'; // Asegúrate de importar el DrawerIcon

export function HomeScreen() {
  const { setIsLoggedIn } = useAuthContext();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <View style={styles.container}>
      <DrawerIcon />
      <Text>Home Screen</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
