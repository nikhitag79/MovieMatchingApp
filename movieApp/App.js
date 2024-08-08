import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Image, SafeAreaView, Pressable } from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users';
import Like from './assets/yes.jpg';
import Dislike from './assets/no.webp';
import AnimatedStack from './src/components/AnimatedStack';

import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, interpolate, withSpring, runOnJS} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screens/HomeScreens';
 


const ROTATION = 60;
const SWIPE_VELOCITY = 600;

const App = () => {
  const [activeScreen, setActiveScreen] = useState("HOME");
  const color = "#b5b5b5";
  const activeColor = '#f76c6b';

  return (
    <GestureHandlerRootView style={ styles.root }>
      <SafeAreaView style = {{flex: 1}} > 
      <View style={styles.pageContainer}>
        <View style = {styles.topNavigation}>
          <Pressable onPress = {() => setActiveScreen('HOME')}>
            <Fontisto name = "tinder" size={30} color={activeScreen === 'HOME' ? activeColor : color}/>
         </Pressable>
         <MaterialCommunityIcons name="star-four-points" size ={30} color = {color}/>
         <Pressable  onPress = {() => setActiveScreen('CHAT')}>
          <Ionicons name = 'chatbubbles' size = {30} color = {activeScreen === 'CHAT' ? activeColor : color}/>

         </Pressable>
            <FontAwesome name = "user" size = {30} color = {color}/>
        </View>
        
      <HomeScreen/>
      </View>
      </SafeAreaView>
     
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {

    flex: 1,
  },
  topNavigation:{

    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },

  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;