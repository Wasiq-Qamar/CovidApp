import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import CountryList from './components/CountryList';
import FavouriteList from './components/FavouriteList';


const CountryStack = createStackNavigator();
const FavouriteStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Root1() {
  return (
      <CountryStack.Navigator initialRouteName="List of Countries">
        <CountryStack.Screen name="List of Countries" component={CountryList} />
      </CountryStack.Navigator>
  );
}

function Root2() {
  return (
      <FavouriteStack.Navigator >
        <FavouriteStack.Screen name="Favourite Countries" component={FavouriteList} />
      </FavouriteStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Statistics">
        <Drawer.Screen name="Country Statistics" component={Root1} />
        <Drawer.Screen name="Favourite Countries" component={Root2} />
        <Drawer.Screen name="World Statistics" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

