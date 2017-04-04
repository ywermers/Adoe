'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  Text
} from 'react-native';


class Newsfeed extends Component {
  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 40}}>
          Newsfeed content
        </Text>
      </View>
    )
  }
}


module.exports = Newsfeed;
