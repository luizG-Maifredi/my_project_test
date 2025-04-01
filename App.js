import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import GoogleMapsScreen from './GoogleMapsScreen';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>sdfas</Text>
      <Text>asdfsdf</Text>
      <View style={styles.mapa}>
       <GoogleMapsScreen/>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  mapa:{
    display: 'flex',
    justifyContent: 'center'
  }
});
