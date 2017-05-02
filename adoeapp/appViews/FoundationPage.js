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
import Credit from './Credit'
import SearchBar from 'react-native-material-design-searchbar';
import Modal from 'react-native-simple-modal';
var ScrollingMenu = require('react-native-scrolling-menu');
var Drawer = require('react-native-drawer')
import { Container, Content, InputGroup, Input } from 'native-base';

export default class Newsfeed extends Component {

constructor(props) {
   super(props);
   this.state = {
     cardInformationModal: false,
     donationModalOpen: false,
     text: 'Donation Amount'
   }
}
goToCredit() {
  this.props.navigator.push({
    component: Credit,
    title: 'Card Information'
  })
}
donate(value){
  var user = AsyncStorage.getItem('user');
  console.log('value', value);
  console.log('foundation', this.props.foundation);
  fetch('https://polar-sands-99108.herokuapp.com/api/users/chargeCard', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      authToken: user.authToken,
      amount: value,
      foundationToken: this.props.foundation._id
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log('response',responseJson);
    if(responseJson.err.message === "The  customer must have and active payment source attached"){
      console.log('navigate to card information')
      this.setState({
        donationModalOpen: false,
        cardInformationModal: true
      })
    }
  })
  .catch((err) => {
    console.log('error', err)
  })

}

render () {
    console.log('foundation', this.props)
  return (
    <View style={styles.pageContainer} >
        <View style={styles.topContainer}>
        <Image
        style={styles.foundationLogo}
        source={{uri: this.props.foundation.logoURL}}>
        </Image>
          <View style={styles.foundationTitleContainer}>
            <Text style={styles.foundationTitle}>
            {this.props.foundation.name}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}> {this.props.foundation.description}</Text>
        </View>
        <View style={styles.donateButtonContainer}>

          <View style={styles.donateButtonContainer}>
            <TouchableOpacity style={styles.donateButton} onPress={() => this.setState({donationModalOpen: true})}>
              <View>
                <Text style={styles.donateText}> DONATE </Text>
              </View>
            </TouchableOpacity>
          </View>
         </View>

      <Modal
              offset={-100}
              open={this.state.donationModalOpen}
                modalDidOpen={() => console.log('modal did open')}
                modalDidClose={() => this.setState({donationModalOpen: false})}
              modalStyle={{alignItems: 'center',
                     justifyContent: 'center',
                     height: 200,
                     width: 350,
                     borderRadius: 4,
                     margin: 20,
                     padding: 10,
                     backgroundColor: '#f4ebd9'}}>
                <View style={styles.modalContainer}>
                          <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.modalButton} onPress={this.donate.bind(this, 500)}>
                                  <View>
                                    <Text style={styles.dText}>$5</Text>
                                  </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={this.donate.bind(this, 1000)}>
                                  <View>
                                    <Text style={styles.dText}>$10</Text>
                                  </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={this.donate.bind(this, 2500)}>
                                  <View>
                                    <Text style={styles.dText}>$25</Text>
                                  </View>
                                </TouchableOpacity>
                            </View>

                      <View style={styles.search}>
                        <TextInput
                            style={{height: 40, borderColor: '#77685d', borderWidth: 2, borderRadius: 5}}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                          />
                      </View>
                      <View style={styles.modaldonatebutton}>
                      <TouchableOpacity style={styles.modalButton2}>
                        <View>
                          <Text style={styles.dText}>Send</Text>
                        </View>
                      </TouchableOpacity>
                      </View>

                </View>
      </Modal>

      <Modal
              offset={-100}
              open={this.state.cardInformationModal}
                modalDidOpen={() => console.log('modal did open')}
                modalDidClose={() => this.setState({cardInformationModal: false})}
              modalStyle={{alignItems: 'center',
                     justifyContent: 'center',
                     height: 200,
                     width: 350,
                     borderRadius: 4,
                     margin: 20,
                     padding: 10,
                     backgroundColor: '#f4ebd9'}}>
                <View style={styles.modalContainer}>

                      <View style={styles.search}>
                          <Text> "Oh NO it appears you don't have your credit card on file do you want to enter one now?"</Text>
                      </View>
                      <View style={styles.modaldonatebutton}>
                      <TouchableOpacity style={styles.modalButton2} onPress ={this.goToCredit.bind(this)}>
                        <View>
                          <Text style={styles.dText}>OK!</Text>
                        </View>
                      </TouchableOpacity>
                      </View>

                </View>
      </Modal>

    </View>
    );
  }
}


  //  <View style={{width:375, height: 150, backgroundColor: '#058ed9', justifyContent: 'flex-start'}}>
var styles = StyleSheet.create({
  modalContainer: {
    flexDirection:'column',
    padding: 10
  },

  modalButton: {
    justifyContent: 'center',
    backgroundColor: '#a39a92',
    borderColor:'#77685d',
    flexDirection: 'row',
    borderWidth: 4,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    height: 40,
    width: 80,
    alignItems: 'center'
},
modalButton2: {
  justifyContent: 'center',
  backgroundColor: '#a39a92',
  borderColor:'#77685d',
  flexDirection: 'row',
  borderWidth: 4,
  padding: 10,
  borderRadius: 5,
  margin: 10,
  height: 40,
  width: 80,
  alignItems: 'center',
  alignSelf: 'center'
},
  dText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20
  },
  pageContainer: {
    marginTop: 60,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#a39a92'
  },
  topContainer: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#a39a92',
    justifyContent: 'center'
  },
  foundationLogo: {
    flex: 2,
    backgroundColor: 'black',
    height: 90,
    width: 40
  },
  foundationTitleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a39a92',
    height: 40
  },
  foundationTitle: {
    flex: 3,
    fontSize: 30,
    color: '#f4ebd9',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  descriptionContainer:{
    flex: 1,
    paddingBottom: 50,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionText: {
    color: '#f4ebd9',
    fontSize: 40,
    justifyContent: 'center',
    alignSelf: 'center'

  },
  donateButtonContainer:{
    flex: 1,
    backgroundColor: '#a39a92'
  },
  donateButton: {
    flex: 1,
    height: 50,
    width: 200,
    position: 'absolute',
    backgroundColor: '#483d3f',
    borderColor: '#483d3f',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,

  },
  donateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4ebd9',
    alignSelf: 'center',
    justifyContent: 'center'
  },


});


module.exports = Newsfeed;
