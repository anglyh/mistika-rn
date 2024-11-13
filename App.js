import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Main } from './screens/Main';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';


export default function App() {
  
  let [fontsLoaded] = useFonts({
    DMSans_Regular: require('./assets/fonts/DMSans-Regular.ttf'),
    DMSans_Medium: require('./assets/fonts/DMSans-Medium.ttf'),
    DMSans_SemiBold: require('./assets/fonts/DMSans-SemiBold.ttf'),
    DMSans_Bold: require('./assets/fonts/DMSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // No mostrar nada hasta que las fuentes estén cargadas
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Main/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
