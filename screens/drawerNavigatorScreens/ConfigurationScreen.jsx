import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';

export function ConfigurationScreen() {
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError(error.message || "Cierre de sesión fallido"); 
    }
  }
  return (
    <View>
      <Text>Configuration Screen</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}
