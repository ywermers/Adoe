import React, { Component } from 'react';
import {
  SwitchIOS,
  View,
  Text
} from 'react-native';

import lstyles from './styles';
import lButton from './Button';

export default class ControlPanel extends Component {
  render() {
    return (
      <View style={lstyles.controlPanel}>
        <Text style={lstyles.controlPanelWelcome}>
          Control Panel
        </Text>
        <lButton
          onPress={() => {
            this.props.closeDrawer();
          }}
          text="Close Drawer"
        />
      </View>
    )
  }
}

module.exports = ControlPanel;
