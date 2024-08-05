import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Image } from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users';
import Like from './assets/yes.jpg';
import Dislike from './assets/no.webp';
import AnimatedStack from './src/components/AnimatedStack';

import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, interpolate, withSpring, runOnJS} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const ROTATION = 60;
const SWIPE_VELOCITY = 600;

const App = () => {
  const onSwipeLeft = (user) => {
    console.warn("Swipe Left", user.name)
  };

  const onSwipeRight = (user) => {
    console.warn("Swipe right: ", user.name)
  }



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.pageContainer}>
      <AnimatedStack 
        data = {users}
        renderItem={({item}) => <Card user = {item} />}
        onSwipeLeft ={onSwipeLeft}
        onSwipeRight = {onSwipeRight}
        />

      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;