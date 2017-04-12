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

import Login from './Login'

// class Signup extends Component {
var Signup = React.createClass({

  getInitialState() {
    return {
      responseJsonError: '',
      name: '',
      password: ''
    }
  },

  signup() {
    console.log('hotdog');

    fetch('https://polar-sands-99108.herokuapp.com/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        ustate: this.state.ustate,
        zipCode: this.state.zipCode,
        country: this.state.country
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('hello!!!',responseJson)
      if (responseJson.success === true) {
        console.log("SUCCESS", Login)
        this.props.navigator.push({
          component: Login,
          title: 'Login'
        })
      } else {
        this.setState({
          responseJsonError: responseJson.error,
        });
      }
      console.log('responsejson', responseJson)
    })
    .catch((err) => {
      console.log('error', err)
    });
  },


  render() {
    return (
      <View style={styles.container}>



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
            onChangeText={(text) => this.setState({name: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='Email'
            onChangeText={(text) => this.setState({email: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='Phone number'
            onChangeText={(text) => this.setState({phoneNumber: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='Street address'
            onChangeText={(text) => this.setState({streetAddress: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='City'
            onChangeText={(text) => this.setState({city: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='State'
            onChangeText={(text) => this.setState({ustate: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='Zip code'
            onChangeText={(text) => this.setState({zipCode: text})}
          />

          <TextInput
            style={styles.searchInput}
            placeholder='Country'
            onChangeText={(text) => this.setState({country: text})}
          />

        </View>

        <TouchableOpacity style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.signup}
            >
          <Text style={styles.buttonText}>Go!</Text>
        </TouchableOpacity>

      </View>
    );
  }
})

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
    marginBottom: 5
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
