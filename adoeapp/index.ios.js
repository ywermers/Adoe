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
import Splash from "./content/splash";

var Welcome = require('./content/-Welcome');

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



AppRegistry.registerComponent('adoeapp', () => adoeapp);
