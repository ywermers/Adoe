/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
} from 'react-native';

class Login extends Component {
  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 40}}>
          Login content
        </Text>
      </View>
    )
  }
}

class Signup extends Component {
  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 40}}>
          Signup content
        </Text>
      </View>
    )
  }
}
class Landing extends Component {
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

export default class adoeapp extends Component {
  render() {
    return (
      <NavigatorIOS
        ref="hello"
        initialRoute={{
          component: Landing,
          title: 'Welcome',
          onRightButtonPress: () => (this.refs.hello.push({
            component: Page2,
            title: 'Title of Page 2',
          }))
        }}
        style={{flex:1}}
      />

    );
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

AppRegistry.registerComponent('adoeapp', () => adoeapp);
