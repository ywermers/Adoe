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
  ListView,
} from 'react-native';

class Page2 extends Component {
  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 40}}>
          Page 2
        </Text>
      </View>
    )
  }
}

class Page1 extends Component {
  goTo2() {
    this.props.navigator.push({
      component: Page2,
      title: 'Title of Page 2',
    })
  }
  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 40}}>
          Page 1
        </Text>
        <TouchableOpacity onPress={this.goTo2.bind(this)}>
          <Text style={{fontSize: 20}}>
            Go to Page 2
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
          component: Page1,
          title: 'Page 1',
          rightButtonTitle: "Page 2",
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

AppRegistry.registerComponent('adoeapp', () => adoeapp);
