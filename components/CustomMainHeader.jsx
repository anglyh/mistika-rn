import React from 'react';
import { Header } from "@react-navigation/elements";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { GlobalText } from './GlobalText';
import colors from '../theme/colors';

export function CustomMainHeader({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        headerTitleAlign="center"
        headerStatusBarHeight={0}
        headerStyle={styles.headerStyle}
        headerLeft={() => (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.headerButton}>
            <MaterialIcons
              name="menu"
              size={30}
              color={colors.secundario}
            />
          </TouchableOpacity>
        )}
        headerRight={() => (
          <View style={styles.titleContainer}>
            <GlobalText style={styles.title}>Mistika</GlobalText>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },  
  headerStyle: {
    backgroundColor: '#ffffff',
    elevation: 0,
    shadowOpacity: 0,
  },
  titleContainer: {
    
  },
  title: {
    fontSize: 24,
    color: colors.secundario,
    fontFamily: "DMSans_SemiBold",
  },
});
