import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Alert,
  Button,
  TouchableHighlight,
  navigator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ListView,
  Text
} from 'react-native';

class donate extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.donationbutton}>
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
    width: 40,
    backgroundColor: '#058ed9',
    borderColor: '#058ed9',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    top: 1
  },

});
