'use strict';

import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';
export default class Tax extends Component {

  componentWillMount(){
   AsyncStorage.getItem('user')
    .then((user) => {
      console.log('user', user);
      return fetch('https://polar-sands-99108.herokuapp.com/api/users/taxReceipts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          authToken: JSON.parse(user).authToken,
        })
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('response',responseJson);
        if(responseJson.success){
          this.setState({
            donations: responseJson.taxReceipts,
          })
        } else {
        console.log('newfeed error');
        this.setState({
          responseJsonError: responseJson.error,
        });
      }
    })
    .catch((err) => {
      console.log('tax error', err)
    });
    this.setState({foundations: [
      {foundation:'Cats', date: '09112001', amount: '1'},
      {foundation:'Dogs', date: '09112002', amount: '2'},
      {foundation:'human', date: '09112003', amount: '3'}
    ]})
  }



  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text style={styles.title}>
            Donation History
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.description}>
            Description for why we have this page and how it can help with the getting
            tax returns
          </Text>
        </View>
        <View style={{flex: 3, backgroundColor: 'pink', justifyContent: 'center'}}>
        {
          this.state.donations && this.state.donations.length ? this.state.donations.map((donation) =>

              { return <Text>{donation}</Text>
            }) : <Text> You currently have no donation receipts. </Text>

        }
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    backgroundColor: '#a39a92'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30

  },
  description: {

  },

});
module.exports = Tax;
