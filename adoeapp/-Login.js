'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  TextInput,
  Text
} from 'react-native';

var Newsfeed = require('./-Newsfeed');
var Signup = require('./-Signup');

class Login extends Component {

  goToNewsfeed() {
    this.props.navigator.push({
      component: Newsfeed,
      title: 'Newsfeed',
    })
  }

  goToSignup() {
    this.props.navigator.push({
      component: Signup,
      title: 'Signup',
    })
  }

  render() {
    return(

      <View style={styles.container}>

        <TextInput
          style={styles.searchInput}
          placeholder='Email'/>

        <TextInput
          style={styles.searchInput}
          placeholder='Password'/>

        <TouchableOpacity style={styles.button}
            underlayColor='#99d9f4' onPress={this.goToNewsfeed.bind(this)} >
          <Text style={styles.buttonText}>Go!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goToSignup.bind(this)}>
          <Text style={styles.description} >
            Don&rsquo;t have an account? Sign up here.
          </Text>
        </TouchableOpacity>

      </View>
    )
  }
}


var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 40,
    width: 300,
    padding: 10,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
});


module.exports = Login;
