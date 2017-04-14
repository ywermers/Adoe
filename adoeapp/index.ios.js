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
import Splash from "./appViews/splash";



var Welcome = require('./appViews/-Welcome');
var Newsfeed = require('./appViews/Newsfeed');

export default class adoeapp extends Component {
  render() {
    return (
      < Splash
       />
    );
  }
}



AppRegistry.registerComponent('adoeapp', () => adoeapp);
