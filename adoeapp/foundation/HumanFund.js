import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Alert,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  navigator,
  TextInput,
  ListView,
  Text
} from 'react-native';
var donation = require('../appViews/donation')


class HumanFund extends Component {
  goTodonate() {
    this.props.navigator.push({
      component: donation,
      title: 'Donate',
    })
  }
  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity style={styles.donationbutton} onPress={this.goTodonate.bind(this)}>
          <Text style={styles.buttonText}>
            Donate
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  donationbutton: {
    height: 36,
    backgroundColor: '#058ed9',
    borderColor: '#058ed9',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    justifyContent: 'center',
    left: 163
  }
});

module.exports = HumanFund;
