/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StackNavigator,
} from 'react-native';

export default class adoeapp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to ADOE
        </Text>
        <Text style={styles.instructions}>
          Donate to social good
        </Text>
      </View>
    );
  }
}

const App = StackNavigator({
  Main: {screen: MainScreen},
  Profile: {screen: ProfileScreen}
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
