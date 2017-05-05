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
        <View style={{ flex: 3, justifyContent: 'center'}}>
          <Text style={styles.title}>
            Donation History
          </Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Text style={styles.description}>
            Use your donations to receive tax benefits! Below you can see amounts, dates and the name of the foundation which you donated to.
          </Text>
        </View>

        <View style={styles.labels}>
        <Text style={styles.label}> Amount </Text>
        <Text style={styles.label}> Date </Text>
        <Text style={styles.label}> Name </Text>
        </View>


        <View style={{flex: 5, backgroundColor: '#f4ebd9', justifyContent: 'center', }}>
        <ScrollView>
        {
           this.state.donations.length ? this.state.donations.map((donation, i) =>
              {
                return(<View key={i} style = {styles.taxReceipts}>

                  <Text style={styles.amount}> {currencyFormatter.format(donation.amount/100, {code:'USD'})} </Text>
                  <Text style={styles.date}> {moment(donation.date).format("MM-DD-YYYY")} </Text>
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
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
    color: '#483d3f'


  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#a39a92',
    borderColor: '#483d3f',
    borderWidth: 10,
    height: 40,
    flex:.5

  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
     color: '#483d3f'

  },
  description: {

    textAlign: 'center',
    padding: 4,
    color: '#483d3f',
    fontSize: 20


  },
  taxReceipts: {

    flexDirection: 'row'
  },
  amount: {
    flex:1,
    paddingTop: 10,
    paddingLeft: 20,
    color: '#483d3f'
  },
  date: {
    flex:1,
    paddingTop: 10,
    paddingLeft: 20,
    color: '#483d3f'
  },
  foundation: {
    flex:1,
    paddingTop: 10,
    paddingLeft: 20,
    textAlign: 'center',
    color: '#483d3f'
  }

});
module.exports = Tax;
