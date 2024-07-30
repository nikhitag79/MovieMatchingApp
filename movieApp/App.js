import 'react-native-gesture-handler';
import React from 'react';
import { Text, Image, ImageBackground, View, StyleSheet, Pressable} from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users'

import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler } from 'react-native-reanimated'
const App = () => {

  const sharedValue = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: sharedValue.value *500-250, 
    }]
    

  }));

  return (
    <View style = {styles.pageContainer}>
      <Animated.View style= {[styles.animatedCard, cardStyle]}> 
      <Card user = {users[2]}/>
      </Animated.View> 
      <Pressable onPress={()=> (sharedValue.value = withSpring(Math.random()))}>
        
        <Text>Change Value</Text></Pressable>
  </View>

  );
}; 

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
     alignItems: 'center', 
     flex:1
  }, 
  animatedCard: {
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center', 
  }


})

export default App;