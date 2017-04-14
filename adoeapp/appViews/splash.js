import React, { Component } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('../assets/heart.png')}
          />
          <Text style={styles.title}>Adoe</Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#058ed9",
    flex: 1,
    justifyContent: 'center'
  },
  wrapper: {
    backgroundColor: '#058ed9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    width:100,
    height: 100,
    justifyContent: 'center'
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#f4ebd9',
    fontSize: 35,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#f4ebd9',
    fontWeight: '200',
    paddingBottom: 50
  },

});
