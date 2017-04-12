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

var Login = require('./Login');
var Signup = require('./Signup');

class Ex extends Component {
  goTo2() {
    this.props.navigator.push({
      component: Login,
      title: 'Login',
    })
  }
  goTo3() {
    this.props.navigator.push({
      component: Signup,
      title: 'Signup'
    })
  }
  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity onPress={this.goTo2.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goTo3.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Signup
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
  }
});

module.exports = Ex;
