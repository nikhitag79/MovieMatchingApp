import 'react-native-gesture-handler';
import React from 'react';
import { Text, Image, ImageBackground, View, StyleSheet, Pressable } from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users';

import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const sharedValue = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: sharedValue.value * 500 - 250,
    }]
  }));

  const panGesture = Gesture.Pan()
    .onStart(() => {
      console.warn("Touch Start");
    })
    .onUpdate((event) => {
      console.log("Touch x: ", event.translationX);
      sharedValue.value = withSpring(event.translationX / 500 + 0.5);
    })
    .onEnd(() => {
      console.warn("Touch end");
      sharedValue.value = withSpring(1); // Reset to original position
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.pageContainer}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Card user={users[2]} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  animatedCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
