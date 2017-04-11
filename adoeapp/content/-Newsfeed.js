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

import Drawer from 'react-native-drawer';
import ControlPanel from './-+ControlPanel';

class Newsfeed extends Component {

  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  render() {
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 40}}>
          Newsfeed content
        </Text>

        <Drawer
    type="static"
    content={<ControlPanel />}
    openDrawerOffset={100}
    styles={drawerStyles}
    tweenHandler={Drawer.tweenPresets.parallax}
    >
  </Drawer>

      </View>
    )
  }
}


const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

module.exports = Newsfeed;
