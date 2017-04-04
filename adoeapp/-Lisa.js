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


class Lisa extends Component {
  render() {
    return(

      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>

        <View style={styles.container}>

        <Text style={styles.description} >
          Credit card info
        </Text>

          <TextInput
            style={styles.searchInput}
            placeholder='Credit card number'/>

          <TextInput
            style={styles.searchInput}
            placeholder='Expiration date (mm/dd)'/>

          <TextInput
            style={styles.searchInput}
            placeholder='CVC number'/>


          <TouchableOpacity style={styles.button}
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
  },
});

module.exports = Lisa;
