import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Image } from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users';
import Like from './assets/yes.jpg';
import Dislike from './assets/no.webp';

import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, interpolate, withSpring, runOnJS} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const ROTATION = 60;
const SWIPE_VELOCITY = 600;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];

  const { width: screenWidth } = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  const translateX = useSharedValue(0);

  const rotate = useDerivedValue(() =>
    interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) + 'deg'
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: rotate.value },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.6, 1],
    ),
  }));


  useEffect(() => {
    translateX.value = 0; 
    setNextIndex(currentIndex + 1);}, [currentIndex]
);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.pageContainer}>
        {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            <Card user={nextProfile} />
          </Animated.View>
        </View>
        )}
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            translateX.value = nativeEvent.translationX;
          }}
          onEnded={({ nativeEvent }) => {
            if (Math.abs(nativeEvent.velocityX) < SWIPE_VELOCITY) {
              translateX.value = withSpring(0);
            } else {
              // Handle swiping the card out
              translateX.value = withSpring(hiddenTranslateX * Math.sign(nativeEvent.velocityX));
              runOnJS(setCurrentIndex)(currentIndex+1);
            }
          }}
        >
         
         <Animated.View style={[styles.animatedCard, cardStyle]}>
      {currentProfile && (
       <>
      <Image source={Like} style={[styles.like, {right: 10}]} resizeMethod = "contain"/>
      <Image source={Dislike} style={[styles.like, {left:10}]} resizeMethod = "contain"/>
      <Card user={currentProfile} />
    </>
  )}
</Animated.View>


        </PanGestureHandler>

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
  animatedCard: {
    width: '90%',
    height: '70%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: 150,
    height: 150,
    position: "absolute", 
    top: 10,
    zIndex: 1,

  }
});

export default App;