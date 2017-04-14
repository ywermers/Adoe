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
var ScrollingMenu = require('react-native-scrolling-menu');

class Newsfeed extends Component {

onClick(itemIndex) {
  console.log("Selected: " + items[itemNum]);
}

  render () {
    return (
    <View style={{width:375, height: 105, backgroundColor: '#058ed9'}}>
      <View style={{justifyContent: 'flex-start'}}>
      <TouchableOpacity>
      <Image
        style={styles.menuicon}
        source={require('../assets/menu.png')}
        />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText}>
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
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
  button1: {
    height: 50,
    width: 50,
    backgroundColor: '#058ed9',
    borderColor: '#f4ebd9',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    top: 1,
    left: 10,
  },
  button2: {
    height: 50,
    width: 50,
    backgroundColor: '#058ed9',
    borderColor: '#f4ebd9',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    top: 1,
    left: 10
  },
  button3: {
    height: 50,
    width: 50,
    backgroundColor: '#058ed9',
    borderColor: '#f4ebd9',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    top: 1,
    left: 10
  },
  menuicon: {
    alignItems: "flex-start",
    height: 40,
    width:40,
    left: 10,
    top: 45
  }

});


module.exports = Newsfeed;
