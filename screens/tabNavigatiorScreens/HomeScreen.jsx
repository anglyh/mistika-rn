import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuthContext } from "../../context/AuthContext";
import { DrawerIcon } from '../../components/DrawerIcon';

export function HomeScreen() {
  const { logout, user } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError(error.message || "Cierre de sesión fallido"); 
    }
  }

  return (
    <View style={styles.container}>
      <DrawerIcon />
      <Text>Home Screen</Text>
      <Text>{user.name}</Text>
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
