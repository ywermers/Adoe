import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('../assets/heart.png')}
          />
          <Text style={styles.title}>Adoe</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Click to make a difference
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#058ed9",
    flex: 1,
    justifyContent: 'center'
  },
  wrapper: {
    backgroundColor: '#058ed9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    width:100,
    height: 100,
    justifyContent: 'center'
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#f4ebd9',
    fontSize: 35,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#f4ebd9',
    fontWeight: '200',
    paddingBottom: 50
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4ebd9',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 290,
    backgroundColor: '#483d3f',
    borderColor: '#483d3f',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
