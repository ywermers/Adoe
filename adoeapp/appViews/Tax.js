'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';
export default class Tax extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text style={styles.title}>
            Donation History
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.description}>
            Description for why we have this page and how it can help with the getting
            tax returns
          </Text>
        </View>
        <View style={{flex: 3, backgroundColor: 'pink', justifyContent: 'center'}}>
        <Text></Text>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    backgroundColor: '#a39a92'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30

  },
  description: {

  },

});
module.exports = Tax;
