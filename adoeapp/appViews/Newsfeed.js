'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  Alert,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  ListView,
  Text
} from 'react-native';

import ControlPanel from './ControlPanel';
// import ControlPanel from './-+ControlPanel';

class Newsfeed extends Component {

  render () {
    return (
      <View style={{width:375, height: 100, backgroundColor: '#058ed9'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Me
          </Text>
        </TouchableOpacity>
      </View>
    <View style={{flex:1}}>

    </View>
  </View>

    )
  };
}

var styles = StyleSheet.create({

  buttonText: {
    fontSize: 10,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: '#058ed9',
    borderColor: '#f4ebd9',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },

});


module.exports = Newsfeed;
