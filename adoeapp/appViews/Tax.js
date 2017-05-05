'use strict';

import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';
import moment from 'moment';
var currencyFormatter = require('currency-formatter');

export default class Tax extends Component {
  constructor(props) {
     super(props);
     this.state= {
       donations : []
     }
  }
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
  }



  render() {
    console.log('donations', this.state.donations)
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

        <View style={styles.labels}>
        <Text> Amount </Text>
        <Text> Date </Text>
        <Text> Name </Text>
        </View>

        <View style={{flex: 3, backgroundColor: 'red', justifyContent: 'center'}}>
        <ScrollView>
        {
           this.state.donations.length ? this.state.donations.map((donation, i) =>
              {
                return(<View key={i} style = {styles.taxReceipts}>

                  <Text style={styles.amount}> {currencyFormatter.format(donation.amount, {code:'USD'})} </Text>
                  <Text style={styles.date}> {moment(donation.date).format("ddd, hA")} </Text>
                  <Text style={styles.foundation}>{donation.foundation} </Text>

                       </View>)

            }) : <Text> You currently have no donation receipts. </Text>

        }
        </ScrollView>
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
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  description: {
    textAlign: 'center'
  },
  taxReceipts: {
    flex:1,
    flexDirection: 'row'
  },
  amount: {
    flex:1,
    paddingTop: 10,
    paddingLeft: 20
  },
  date: {
    flex:1,
    paddingTop: 10,
    paddingLeft: 20
  },
  foundation: {
    flex:1,
    paddingTop: 10,
    paddingLeft: 20
  }

});
module.exports = Tax;
