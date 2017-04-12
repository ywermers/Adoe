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

import ControlPanel from './ControlPanel';
import Drawer from 'react-native-drawer';
// import ControlPanel from './-+ControlPanel';

class Newsfeed extends Component {

  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render () {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<ControlPanel />}
        >
      </Drawer>
    )
  }
}


const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

module.exports = Newsfeed;
