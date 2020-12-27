import React, {useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';

export default function HomeScreen ({navigation}) {
  const [isLoading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const [dataSource2, setDataSource2] = React.useState([]);

  useEffect(() => {
    getStats();
    getWorld();
  }, [getStats, getWorld]);

  const getStats = () => {
    fetch('https://covid-19-data.p.rapidapi.com/totals',{
      method: 'GET',
      headers:{
        "x-rapidapi-key": "179055a260msh5b685b581363fdep17dbb4jsn55c72ae6dc44",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    }})
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getWorld= () => {
    fetch('https://world-population.p.rapidapi.com/worldpopulation',{
      method: 'GET',
      headers:{
        "x-rapidapi-key": "179055a260msh5b685b581363fdep17dbb4jsn55c72ae6dc44",
        "x-rapidapi-host": "world-population.p.rapidapi.com",
    }})
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setDataSource2(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Data from JSON Placeholder API ...</Text>
      </View>
    );
  }

  let cp = (dataSource[0].confirmed / dataSource2.body.world_population * 100).toFixed(2);
  let rp = (dataSource[0].recovered / dataSource2.body.world_population * 100).toFixed(2);
  let crp = (dataSource[0].critical / dataSource2.body.world_population * 100).toFixed(2);
  let dp = (dataSource[0].deaths / dataSource2.body.world_population * 100).toFixed(2);
 
  return (
    <View style={styles.container}>
      <View>
        <Text  style={styles.header}>World Statistics</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.boldText}>World Population: {dataSource2.body.world_population} </Text>
        <Text style={styles.text}>Total Cases: {dataSource[0].confirmed} ({cp} %)</Text>
        <Text style={styles.text}>Recovered: {dataSource[0].recovered} ({rp} %)</Text>
        <Text style={styles.text}>Critical Cases: {dataSource[0].critical} ({crp} %)</Text>
        <Text style={styles.text}>Total Deaths: {dataSource[0].deaths} ({dp} %)</Text>
        <Text style={styles.text}>Last Updated: {dataSource[0].lastUpdate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    marginTop: 50
  },
  stats: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    letterSpacing: 1,
    lineHeight: 200
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    letterSpacing: 0.5,
    lineHeight: 50
  },
 header: {
   textAlign: 'center',
   fontSize: 30,
   fontWeight: 'bold',
 }
});