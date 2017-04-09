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

var News = require('./News');
var Signup = require('./Signup');

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      responseJsonError: '',
      loginmessage: '',
      email:'',
      password: ''
    }
  }

  login() {

    fetch('https://polar-sands-99108.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: this.state.password,
        email: this.state.email
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('response',responseJson)
      if (responseJson.success === true) {
        AsyncStorage.setItem('user', JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          authToken: responseJson.token
        }));
        this.props.navigator.push({
          component: News,
          title: 'News'
        })
      } else {
        this.setState({
          responseJsonError: responseJson.error,
        });
      }
      console.log('responseJson', responseJson)
    })
    .catch((err) => {
      console.log('error', err)
    });
  }
  //
  // componentDidMount() {
  //   AsyncStorage.getItem('user')
  //   // .then(result => {
  //   //   var parsedResult = JSON.parse(result);
  //   //   var email = parsedResult.email;
  //   //   var password = parsedResult.password;
  //   //   if (username && password) {
  //   //     this.setState({
  //   //       loginmessage: ('Logged in as ' + username + '.')
  //   //     })
  //   //     return this.login(username, password)
  //   //   }
  //   // })
  //   .catch(err => {console.log('error', err)})
  // }


  goToNews() {
    this.props.navigator.push({
      component: News,
      title: 'News',
    })
  }

  goToSignup() {
    this.props.navigator.push({
      component: Signup,
      title: 'Signup',
    })
  }

  render() {
    return(

      <View style={styles.container}>

      <TextInput
      style={styles.searchInput}
      placeholder='Email'
      onChangeText={(text) => this.setState({email: text})}
      value={this.state.email}
      />

      <TextInput
      style={styles.searchInput}
      placeholder='Password'
      secureTextEntry={true}
      onChangeText={(text) => this.setState({password: text})}
      value={this.state.password}
      />

      <TouchableOpacity style={styles.button}
      underlayColor='#99d9f4' onPress={this.login.bind(this)} >
      <Text style={styles.buttonText}>Login!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.goToSignup}>
      <Text style={styles.description} >
      Don&rsquo;t have an account? Sign up here.
      </Text>
      </TouchableOpacity>

      </View>
    )
  }
};


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
  }
});

module.exports = Login;
