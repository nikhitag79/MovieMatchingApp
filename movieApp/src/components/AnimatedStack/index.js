import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Image } from 'react-native';
import Like from '../../../assets/yes.jpg';
import Dislike from '../../../assets/no.webp';

import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, interpolate, withSpring, runOnJS} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const ROTATION = 60;
const SWIPE_VELOCITY = 600;

const AnimatedStack = (props) => {
    const { data, renderItem, onSwipeRight, onSwipeLeft } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];

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

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0,hiddenTranslateX/5],
      [0, 1],
    ),
  }));
  
  const dislikeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0,-hiddenTranslateX/5],
      [0, 1],
    ),
  }));

  useEffect(() => {
    translateX.value = 0; 
    setNextIndex(currentIndex + 1);}, [currentIndex]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.root}>
        {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({item: nextProfile })}
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
              translateX.value = withSpring(hiddenTranslateX * Math.sign(nativeEvent.velocityX));
              runOnJS(setCurrentIndex)(currentIndex+1);
            }
          }}
        >
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            {currentProfile && (
              <>
                <Animated.Image source={Like} style={[styles.like, {left: 10}, likeStyle]} resizeMethod="contain"/>
                <Animated.Image source={Dislike} style={[styles.like, {right:10}, dislikeStyle]} resizeMethod="contain"/>
                {renderItem({item: currentProfile })}
              </>
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  animatedCard: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: 100,
    height: 100,
    position: "absolute", 
    top: 10,
    zIndex: 1,
  }
});

export default AnimatedStack;
