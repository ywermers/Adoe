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
  AsyncStorage,
  Text
} from 'react-native';

// constructor(props){
//   super(props);
//   this.state={
//     isLoading: false,
//     message: ''
//   };
// }

var Login = require('./-Login');

class Signup extends Component {

  getInitialState() {
    return {
      responseJsonError: ''
    }
  }

  signup() {
    fetch('https://hohoho-backend.herokuapp.com/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success === true) {
        this.props.navigator.push({
          component: Login,
          title: 'Login',
        })
      } else {
        this.setState({
          responseJsonError: responseJson.error,
        });
      }
      console.log('responsejosn', responseJson)
    })
    .catch((err) => {
      console.log('error', err)
    });
  }


  render() {

    return (
      <View style={styles.container}>

      <Text style={styles.textBig}>
        {this.state.responseJsonError}
      </Text>

      <Text style={styles.description}>
        Sign up through Facebook
      </Text>

      <TouchableOpacity style={styles.fbbutton}
          underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>FACEBOOK</Text>
      </TouchableOpacity>

        <Text style={styles.description}>
          or sign up manually
        </Text>

        <View>
          <TextInput
            style={styles.searchInput}
            placeholder='Name'
            onChangeText={(text) => this.setState({username: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='Email'/>

          <TextInput
            style={styles.searchInput}
            placeholder='Phone number'/>

          <TextInput
            style={styles.searchInput}
            placeholder='Street address'/>

          <TextInput
            style={styles.searchInput}
            placeholder='City'/>

          <TextInput
            style={styles.searchInput}
            placeholder='State'/>

          <TextInput
            style={styles.searchInput}
            placeholder='Zip code'/>

          <TextInput
            style={styles.searchInput}
            placeholder='Country'/>

        </View>

        <TouchableOpacity style={styles.button}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Go!</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 45,
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
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 20
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
