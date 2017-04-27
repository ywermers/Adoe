'use strict';

import React, {Component} from 'react'
import {
  AsyncStorage,
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

  componentWillMount(){
    AsyncStorage.getItem('user')
    .then((user) => {
      console.log('user', user);
      console.log('userEmail', JSON.parse(user).email)
      fetch('https://polar-sands-99108.herokuapp.com/api/users/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: JSON.parse(user).email,
          password: JSON.parse(user).password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('response',responseJson);
          if(responseJson.success){
             AsyncStorage.setItem('user', JSON.stringify({
              email: JSON.parse(user).email,
              password: JSON.parse(user).password,
              authToken: responseJson.token
            }));
            this.props.navigator.push({
              component: Newsfeed,
              title: 'Newsfeed'
            })
          } else {
          console.log('newfeed error');
          this.setState({
            responseJsonError: responseJson.error,
          });
        }
        console.log('responseJson', responseJson)
      })
      .catch((err) => {
        console.log('error', err)
      });
    })

  }
  goToCredit() {
    this.props.navigator.push({
      component: Credit,
      title: 'Credit',
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
    fontSize: 40,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 80,
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
