import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function  ProductList ({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.li} 
      onPress={() => {
                navigation.navigate('Root1', {screen: 'Aaloo'});
              }}>
      <Text>Product 1</Text></TouchableOpacity>
      <TouchableOpacity
      style={styles.li} 
      onPress={() => {
                navigation.navigate('Root1', {screen: 'Piyaaz'});
              }}>
      <Text>Product 2</Text></TouchableOpacity>
      <TouchableOpacity
      style={styles.li} 
      onPress={() => {
                navigation.navigate('Root1', {screen: 'Timatar'});
              }}>
      <Text>Product 3</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  li: {
    width: 200,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    color: 'blue',
    borderWidth: 2,
    marginTop: 3
  }
});