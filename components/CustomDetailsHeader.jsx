import React from 'react';
import { Header } from "@react-navigation/elements";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 
import colors from '../theme/colors';

export function CustomDetailsHeader({ navigation, screenToNavigate, rightButtonOnPress }) {
  return (
    <View style={styles.container}>
      <Header
        headerTitleStyle={styles.titleStyle}
        headerTitleAlign="center"
        headerStatusBarHeight={10}
        headerStyle={styles.headerStyle}
        headerRight={() => (
          <TouchableOpacity
            style={[styles.headerButton, { marginRight: 18 }] }
            onPress={rightButtonOnPress}
          >
            <Icon name="ellipsis-horizontal-sharp" size={20} color="#ffffff" />
          </TouchableOpacity>
        )}
        headerLeft={() => (
          <TouchableOpacity
            style={[styles.headerButton, { marginLeft: 18 }]}
            onPress={() => navigation.navigate(screenToNavigate)}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  titleStyle: {
    color: "#000",
  },
  headerButton: {
    padding: 14,
    borderRadius: 50,
    backgroundColor: "#aaaaaaaa",
    borderColor: colors.primario,
    borderWidth: 1,
  },
});