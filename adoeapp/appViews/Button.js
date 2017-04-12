import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import lstyles from './styles';

export default class Button extends Component {
  render() {
    return(
      <TouchableHighlight
        style={lstyles.button}
        underlayColor="#B5B5B5"
        onPress={() => {
          this.props.onPress();
        }}>
        <Text style={lstyles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}
