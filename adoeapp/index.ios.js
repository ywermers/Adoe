/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

<<<<<<< HEAD
=======
'use strict'

>>>>>>> 18f0c34db4bb9c6b94f7f73d1a882ed02c7974da
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
<<<<<<< HEAD
  View
} from 'react-native';

export default class adoeapp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
=======
  View,
  NavigatorIOS
} from 'react-native';

var SearchPage = require('./SearchPage');

class adoeapp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Charity Finder',
          component: SearchPage,
        }}/>
>>>>>>> 18f0c34db4bb9c6b94f7f73d1a882ed02c7974da
    );
  }
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
=======
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1,

>>>>>>> 18f0c34db4bb9c6b94f7f73d1a882ed02c7974da
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('adoeapp', () => adoeapp);
