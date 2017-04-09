'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  Text,
  NavigatorIOS
} from 'react-native';

var Login = require('./Login');
var Signup = require('./Signup');

// ease of development - NEWSFEED ACCESS ALSO ON GO OF LOGIN
var Newsfeed = require('./Newsfeed');
var News = require('./News')
// ease of development - ADOE ACCESS for backend sync
var Credit = require('./Credit');

class Welcome extends Component {

  goToCredit() {
    this.props.navigator.push({
      component: Credit,
      title: 'Credit',
    })
  }

  goToNews() {
    this.props.navigator.push({
      component: News,
      title: 'News',
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
        <TouchableOpacity onPress={this.goToNews.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goToCredit.bind(this)} style={styles.lisabutton}>
          <Text style={styles.buttonText}>
            Credit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goToNewsfeed.bind(this)} style={styles.lisabutton}>
          <Text style={styles.buttonText}>
            HOLLY
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  buttonText: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 80,
    width: 160,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
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
