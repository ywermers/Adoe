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
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
} from 'react-native';

var Welcome = require('./appViews/Welcome');

export default class adoeapp extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Welcome,
          title: 'Welcome',
        }}
        style={{flex:1}}
      />
    );
  }
}

var styles = StyleSheet.create({
  buttonText: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 80,
    width: 160,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});

AppRegistry.registerComponent('adoeapp', () => adoeapp);
