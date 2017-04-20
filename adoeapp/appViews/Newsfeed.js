'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Alert,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ListView,
  Text
} from 'react-native';
import SearchBar from 'react-native-material-design-searchbar';
var ScrollingMenu = require('react-native-scrolling-menu');
var Drawer = require('react-native-drawer')


class Newsfeed extends Component {

onClick(itemIndex) {
  console.log("Selected: " + items[itemNum]);
}
constructor(props) {
   super(props);
   this.state = { text: '                      SearchBar' };

 }
 closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  render () {
    return (

<View stlye={styles.main}>

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
     </View>

  <View style={{flex:1}}>

     <TextInput style={styles.searchBar}
        style={{height: 40, fontSize: 23, color: '#a39a92', borderColor: '#058ed9', borderWidth: 4}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    </View>

  <View style={styles.foundationslist}>
    <ScrollView>
      <TouchableOpacity style={styles.foundationsbuttons}>
      <Image
        style={styles.hfb}
        source={require('../foundation/buttonSample.png')}
      />
      </TouchableOpacity>

    </ScrollView>

</View>

  </View>
    )
  };
}

var styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: '#f4ebd9',
    alignSelf: 'center'
  },

  buttons: {
    paddingLeft: 10
  },

  button1: {
    height: 50,
    width: 70,
    backgroundColor: '#058ed9',
    borderColor: '#f4ebd9',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    top: 1,
    left: 10,
    borderRadius:10,
    paddingLeft: 5,
    paddingRight: 5
  },

  button2: {
    height: 50,
    width: 70,
    backgroundColor: '#058ed9',
    borderColor: '#f4ebd9',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    top: 1,
    left: 10,
    borderRadius:10,
  },

  button3: {
    height: 50,
    width: 70,
    backgroundColor: '#058ed9',
    borderColor: '#f4ebd9',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    top: 1,
    left: 10,
    borderRadius:10
  },

  menuicon: {
    alignItems: "flex-start",
    height: 40,
    width:40,
    left: 10,
    top: 45
  },
  hfb:{
    justifyContent: "center",
    height: 138,
    width:375,
    bottom: 6
  },

  searchBar: {
    top: 200
  }


});


module.exports = Newsfeed;
