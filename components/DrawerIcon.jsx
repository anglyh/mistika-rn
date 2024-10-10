import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export function DrawerIcon() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <MaterialIcons
        name="menu"
        size={24}
        color="black"
        style={{ marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
}
