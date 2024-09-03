import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screens/HomeScreens';
import ProfileScreen from './src/screens/ProfileScreen';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'; 
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

const App = () => {
  const [activeScreen, setActiveScreen] = useState("HOME");
  const color = "#b5b5b5";
  const activeColor = '#f76c6b';

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.pageContainer}>
        <View style={styles.topNavigation}>
          <Pressable onPress={() => setActiveScreen('HOME')}>
            <Fontisto name="tinder" size={30} color={activeScreen === 'HOME' ? activeColor : color} />
          </Pressable>
          <MaterialCommunityIcons name="star-four-points" size={30} color={color} />
          <Pressable onPress={() => setActiveScreen('CHAT')}>
            <Ionicons name='chatbubbles' size={30} color={activeScreen === 'CHAT' ? activeColor : color} />
          </Pressable>
          <Pressable onPress={() => setActiveScreen('PROFILE')}>
            <FontAwesome name="user" size={30} color={activeScreen === 'PROFILE' ? activeColor : color} />
          </Pressable>
          
        </View>
        
        {activeScreen === 'HOME' && <HomeScreen />}
        {activeScreen === 'PROFILE' && <ProfileScreen />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topNavigation: {
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

export default withAuthenticator(App); 
