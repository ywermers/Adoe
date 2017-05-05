'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Alert,
  AsyncStorage,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  navigator,
  ListView,
  Text
} from 'react-native';
import { Container, Content, ListItem } from 'native-base';
var Credit = require('./Credit');
var Tax = require('./Tax');

export default class SideBar extends Component {
  constructor(props){
    super(props)
  }
  goToCredit(){
      this.props.navigator.push({
        component: Credit,
        title: 'Card Information',
      })
  }
  goToTax(){
      this.props.navigator.push({
        component: Tax,
        title: 'Tax Receipt',
      })
  }
  render() {
    console.log('side bar props',this.props)
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topcontainer}>
          <Text style={styles.topname}>
            {this.props.name} LastName
          </Text>
        </View>
        <View style={styles.optionssection}>
                <Content>
                  <ListItem>
                    <TouchableOpacity onPress={this.goToCredit.bind(this)}>
                      <Text style={styles.listtext}>Card Information</Text>
                    </TouchableOpacity>
                  </ListItem>
                  <ListItem>
                    <TouchableOpacity onPress={this.goToTax.bind(this)}>
                      <Text style={styles.listtext}>Tax Receipt</Text>
                    </TouchableOpacity>
                  </ListItem>
                  <ListItem>
                    <TouchableOpacity>
                      <Text style={styles.listtext}>Setting</Text>
                    </TouchableOpacity>
                  </ListItem>
              </Content>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    backgroundColor: '#483d3f'
  },
  topcontainer: {
    backgroundColor: '#483d3f',
    flex: 1,
  },
  topname: {
    color: '#f4ebd9',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 80
  },
  optionssection: {
    flex: 5,
    backgroundColor: '#483d3f'
  },
  listtext: {
    color:'#f4ebd9'
  }

});
module.exports = SideBar;
