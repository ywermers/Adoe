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
  ListView,
  Text
} from 'react-native';
import { Container, Content, ListItem } from 'native-base';

export default class SideBar extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topcontainer}>
          <Text style={styles.topname}>
            Firstname LastName
          </Text>
        </View>
        <View style={styles.optionssection}>
                <Content>
                  <ListItem>
                    <TouchableOpacity>
                      <Text style={styles.listtext}>Card Information</Text>
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
    backgroundColor: 'pink',
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
