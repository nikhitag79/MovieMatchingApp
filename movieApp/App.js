import React from 'react';
import { Text, Image, ImageBackground, View, StyleSheet} from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users'
const App = () => {
  return (
    <View style = {styles.pageContainer}>
      <Card user = {users[2]}/>

      
  </View>

  );
}; 

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
     alignItems: 'center', 
     flex:1
  }


})

export default App;