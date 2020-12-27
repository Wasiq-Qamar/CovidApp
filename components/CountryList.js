import React, {useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Icon, ScrollView, Button } from 'react-native';
import { DataTable} from 'react-native-paper';


export default function CountryList ({navigation}) {
  const [isLoading, setLoading] = React.useState(true);
  const [dataSource, setDataSource] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const from = page * 10;
  const to = (page + 1) * 10;

  useEffect(() => {
    getList();
  }, [getList]);

  const getList= () => {
    fetch('https://covid-19-data.p.rapidapi.com/help/countries', {
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

  const handleAdd = (name) => {
    setFavourites({...favourites, name});
  }


  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Data from JSON Placeholder API ...</Text>
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <DataTable >
        <DataTable.Header >
          <DataTable.Title style={{flex: 2}}> Country Name </DataTable.Title>
          <DataTable.Title style={{flex: 2}}> Country Code </DataTable.Title>
          <DataTable.Title style={{flex: 1.5}}> Add to Favourites </DataTable.Title>
        </DataTable.Header>
      </DataTable>

        <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.5}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderColor: 'grey',
              }}>
              <View style={{ paddingLeft: 5, paddingRight: 10, flexDirection:'row' }}>
                <Text style={{width: 160}}>{item.name} </Text>
                <Text style={{width: 150}}>{item.alpha2code} </Text>
                <Text style={{width: 150}}>
                  <Button onPress={() => handleAdd(item.name)} title="FAV" />
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});