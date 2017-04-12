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

var News = require('./-News');
var Signup = require('./-Signup');

class Login extends Component {

  getInitialState() {
    return {
      responseJsonError: '',
      loginmessage: ''
    }
  }

  login(username, password) {
    fetch('https://hohoho-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success === true) {
        AsyncStorage.setItem('user', JSON.stringify({
          username: username,
          password: password
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

  componentDidMount() {
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      var password = parsedResult.password;
      if (username && password) {
        this.setState({
          loginmessage: ('Logged in as ' + username + '.')
        })
        return this.login(username, password)
      }
    })
    .catch(err => {console.log('error', err)})
  }

  press(){
    this.login(this.state.username, this.state.password)
  }

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
          onChangeText={(text) => this.setState({username: text})}
        />

        <TextInput
          style={styles.searchInput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
        />

        <TouchableOpacity style={styles.button}
            underlayColor='#99d9f4' onPress={this.press.bind(this)} >
          <Text style={styles.buttonText}>Login!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goToSignup.bind(this)}>
          <Text style={styles.description} >
            Don&rsquo;t have an account? Sign up here.
          </Text>
        </TouchableOpacity>

      </View>
    )
  }
}


var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#483d3f'
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
    backgroundColor: '#483d3f',
    borderColor: '#483d3f',
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
    borderColor: '#483d3f',
    borderRadius: 8,
    color: '#48BBEC'
  },
});


module.exports = Login;
