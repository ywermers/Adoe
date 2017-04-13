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

var Login = require('./-Login');
var Signup = require('./-Signup');

// ease of development - NEWSFEED ACCESS ALSO ON GO OF LOGIN
var Newsfeed = require('./-Newsfeed');
// ease of development - ADOE ACCESS for backend sync
var Lisa = require('./-Lisa');

class Welcome extends Component {

  goToLisa() {
    this.props.navigator.push({
      component: Lisa,
      title: 'Lisa',
    })
  }

  goToNewsfeed() {
    this.props.navigator.push({
      component: Newsfeed,
      title: 'Newsfeed',
    })
  }

  goToLogin() {
    this.props.navigator.push({
      component: Login,
      title: 'Login',
    })
  }
  goToSignup() {
    this.props.navigator.push({
      component: Signup,
      title: 'Sign up'
    })
  }
  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity onPress={this.goToLogin.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goToSignup.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Sign up
          </Text>
        </TouchableOpacity>


      </View>
    )
  }
}

var styles = StyleSheet.create({

  buttonText: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 60,
    width: 160,
    backgroundColor: '#a39a92',
    borderColor: '#a39a92',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  lisabutton: {
    height: 80,
    width: 160,
    backgroundColor: 'pink',
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});

module.exports = Welcome;
