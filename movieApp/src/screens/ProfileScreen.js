import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, Pressable} from 'react-native';
import users from '../../assets/data/users';
import { Auth } from 'aws-amplify';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Pressable onPress={() => Auth.signOut()}>
        <Text> Sign out </Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  
});

export default ProfileScreen;