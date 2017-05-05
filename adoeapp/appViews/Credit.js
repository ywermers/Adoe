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
  Text,
  AsyncStorage
} from 'react-native';


class Credit extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:"",
      number:"",
      date:"",
      cvc:"",
      responseJsonError: ''
    }
  }
  submit(){

      //fetch --> api/users/addcreditcard
      // auth token and credit token
      // var authToken = await AsyncStorage.getItem(authToken)
      //
      AsyncStorage.getItem('user')
      .then((result) => {
        console.log('asyncStorage', result)
        var parsedResult = JSON.parse(result);
        var authToken = parsedResult.authToken;
        console.log(authToken)
        return fetch('https://polar-sands-99108.herokuapp.com/api/users/addcreditcard/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name:this.state.name,
            cvc: this.state.cvc,
            month: this.state.month,
            year: this.state.year,
            number: this.state.number,
            authToken: authToken
          })
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('response', responseJson)
        if (responseJson.success === true) {
          console.log('card added')
          this.props.navigator.pop();
        } else {
          this.setState({
            responseJsonError: responseJson.error
          });
        }
        console.log('responseJson', responseJson)
      })
      .catch((err) => {
        console.log('error', err)
      });
  }
  render() {
    return(

      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#f4ebd9'}}>

      <View style={styles.container}>

      <Text style={styles.description} >
      Credit card info
      </Text>

      <TextInput
      style={styles.searchInput}
      placeholder='Name on card'
      onChangeText={(name) => this.setState({name})}
      value={this.state.name}
      />

      <TextInput
      style={styles.searchInput}
      placeholder='Credit card number'
      onChangeText={(number) => this.setState({number})}
      value={this.state.number}
      />

      <TextInput
      style={styles.searchInput}
      placeholder='Expiration MONTH (MM)'
      onChangeText={(month) => this.setState({month})}
      value={this.state.month}
      />

      <TextInput
      style={styles.searchInput}
      placeholder='Expiration YEAR (YY)'
      onChangeText={(year) => this.setState({year})}
      value={this.state.year}
      />

      <TextInput
      style={styles.searchInput}
      placeholder='CVC number'
      onChangeText={(cvc) => this.setState({cvc})}
      value={this.state.cvc}/>


      <TouchableOpacity style={styles.button}
      onPress={this.submit.bind(this)}
      underlayColor='#99d9f4' >
      <Text style={styles.buttonText}>Submit!</Text>
      </TouchableOpacity>



      </View>
      </View>

    )
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

module.exports = Credit;
