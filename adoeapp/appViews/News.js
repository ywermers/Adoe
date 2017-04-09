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

var News = React.createClass({

  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={styles.description}>
            News content
          </Text>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
});

module.exports = News;
