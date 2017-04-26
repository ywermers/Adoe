'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Alert,
  AsyncStorage,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ListView,
  Text
} from 'react-native';
import SearchBar from 'react-native-material-design-searchbar';
import Modal from 'react-native-modal';
var ScrollingMenu = require('react-native-scrolling-menu');
var Drawer = require('react-native-drawer')

export default class Newsfeed extends Component {

constructor(props) {
   super(props);

}

donate(){
console.log('testing');

}

render () {

  return (
    <View style={styles.pageContainer} >
        <View styles={styles.topContainer}>

        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionContainertext}> This foundation gives back to the community </Text>
        </View>
        <View style={styles.donateButtonContainer}>







          <TouchableOpacity onPress={this.donate.bind(this)}>
            <View style={styles.donateButton}>
              <Text style={styles.donateText}> DONATE </Text>
            </View>
          </TouchableOpacity>

        </View>
    </View>
    );
  }
}


  //  <View style={{width:375, height: 150, backgroundColor: '#058ed9', justifyContent: 'flex-start'}}>
var styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#058ed9'
  },
  descriptionContainer:{
    paddingBottom: 70,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionContainertext: {
    color: '#f4ebd9',
    fontSize: 50,
    justifyContent: 'center',
    alignSelf: 'center'

  },

  donateButton: {
    height: 50,
    width: 200,
    position: 'absolute',
    backgroundColor: '#483d3f',
    borderColor: '#483d3f',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,

  },
  donateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4ebd9',
    alignSelf: 'center',
    justifyContent: 'center'
  },


});


module.exports = Newsfeed;
