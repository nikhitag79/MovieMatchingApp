import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from './../components/Card';
import users from '../../assets/data/users';

import AnimatedStack from '../components/AnimatedStack';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const onSwipeLeft = user => {
    console.warn('swipe left', user.name);
  };

  const onSwipeRight = user => {
    console.warn('swipe right: ', user.name);
  };

  return (
    <View style={styles.pageContainer}>
      <AnimatedStack
        data={users}
        renderItem={({item}) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      <View style = {styles.icons}>
        <FontAwesome name = "undo" size = {24} color = "#FBD88B"/>
        <Entypo name = "cross" size ={24} color = "#F76C6B"/>
        <FontAwesome name = "star" size = {24} color = "#3AB4CC"/>
        <FontAwesome name = "heart" size = {24} color = "#4FCC94"/>
        <Ionicons name = 'flash' size = {24} color = '#A65CD2'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  }
});

export default HomeScreen;