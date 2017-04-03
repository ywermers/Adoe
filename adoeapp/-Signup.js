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


class Signup extends Component {

  constructor(props){
    super(props);
    this.state={
      isLoading: false,
      message: ''
    };
  }

  render() {

    return (
      <View style={styles.container}>

      <Text style={styles.description}>
        Sign up through Facebook
      </Text>

      <TouchableHighlight style={styles.fbbutton}
          underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>FACEBOOK</Text>
      </TouchableHighlight>


        <Text style={styles.description}>
          or sign up manually
        </Text>

        <View>
          <TextInput
            style={styles.searchInput}
            placeholder='Name'/>

          <TextInput
            style={styles.searchInput}
            placeholder='Email'/>

          <TextInput
            style={styles.searchInput}
            placeholder='Phone Number'/>

          <TextInput
            style={styles.searchInput}
            placeholder='Password'/>

        </View>

        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Go!</Text>
        </TouchableHighlight>

      </View>
    );
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
  fbbutton: {
    height: 36,
    backgroundColor: 'blue',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 50
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
  image: {
    width: 217,
    height: 138
  },
});


module.exports = Signup;
