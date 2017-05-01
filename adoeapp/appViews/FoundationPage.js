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
    console.log('foundation', this.props)
  return (
    <View style={styles.pageContainer} >
        <View style={styles.topContainer}>
        <Image
        style={styles.foundationLogo}
        source={{uri: this.props.foundation.logoURL}}>
        </Image>
          <View style={styles.foundationTitleContainer}>
            <Text style={styles.foundationTitle}>
            {this.props.foundation.name}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}> {this.props.foundation.description}</Text>
        </View>
        <View style={styles.donateButtonContainer}>






          <View style={styles.donateButtonContainer}>
            <TouchableOpacity style={styles.donateButton} onPress={this.donate.bind(this)}>
              <View>
                <Text style={styles.donateText}> DONATE </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    </View>
    );
  }
}


  //  <View style={{width:375, height: 150, backgroundColor: '#058ed9', justifyContent: 'flex-start'}}>
var styles = StyleSheet.create({
  pageContainer: {
    marginTop: 60,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#a39a92'
  },
  topContainer: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#a39a92',
    justifyContent: 'center'
  },
  foundationLogo: {
    flex: 2,
    backgroundColor: 'black',
    height: 90,
    width: 40
  },
  foundationTitleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a39a92',
    height: 40
  },
  foundationTitle: {
    flex: 3,
    fontSize: 30,
    color: '#f4ebd9',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  descriptionContainer:{
    flex: 1,
    paddingBottom: 50,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionText: {
    color: '#f4ebd9',
    fontSize: 40,
    justifyContent: 'center',
    alignSelf: 'center'

  },
  donateButtonContainer:{
    flex: 1,
    backgroundColor: '#a39a92'
  },
  donateButton: {
    flex: 1,
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
