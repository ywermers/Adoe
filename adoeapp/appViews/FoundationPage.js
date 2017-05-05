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
     purchaseConfirmationModal: false,
     text: ' $',
     donationAmount: '1'
   }
}
goToCredit() {
  this.props.navigator.push({
    component: Credit,
    title: 'Card Information'
  })
}
donateTotal(value) {
  console.log('donateTotal function call');
  this.setState({
    donationAmount: value
  })
}
donate(){
  console.log('donate function call')
  AsyncStorage.getItem('user')
  .then((user) => {
    console.log('value', this.state.donationAmount);
    console.log('foundation', this.props.foundation);
    return fetch('https://polar-sands-99108.herokuapp.com/api/users/chargeCard', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        authToken: JSON.parse(user).authToken,
        amount: JSON.parse(this.state.donationAmount)*100,
        foundationToken: this.props.foundation.id
      })
    })
  })
  .then((response) => {
    console.log('resp', response);
    return response.json()
  })
  .then((responseJson) => {
    console.log('response',responseJson);
    if(responseJson.success){
      this.setState({
         donationModalOpen: false,
         cardInformationModal: false,
         purchaseConfirmationModal: true
      })

    }
    if(responseJson.err && responseJson.err.message === "The  customer must have and active payment source attached"){
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
    console.log('donationAmount', this.state.donationAmount )
  return (
    <View style={styles.pageContainer} >
        <View style={styles.topContainer}>
        <Image
        style={styles.foundationLogos}
        source={{uri: this.props.foundation.logoURL}}>
        </Image>
        <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={styles.newsFeedText}>
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
                                <TouchableOpacity style={styles.modalButton} onPress={this.donateTotal.bind(this, '5.00')}>
                                  <View>
                                    <Text style={styles.dText}>$5</Text>
                                  </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={this.donateTotal.bind(this, '10.00')}>
                                  <View>
                                    <Text style={styles.dText}>$10</Text>
                                  </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={this.donateTotal.bind(this, '25.00')}>
                                  <View>
                                    <Text style={styles.dText}>$25</Text>
                                  </View>
                                </TouchableOpacity>
                            </View>

                      <View style={styles.donateTotal}>
                        <TextInput
                            style={{height: 40, borderColor: '#77685d', borderWidth: 2, borderRadius: 5}}
                            onChangeText={(donationAmount) => this.setState({donationAmount})}
                            value={this.state.donationAmount}
                          />
                      </View>
                      <View style={styles.modaldonatebutton}>
                      <TouchableOpacity style={styles.modalButton2} onPress={this.donate.bind(this)}>
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
                          <Text> "Thank you for your donation!"</Text>
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
      <Modal
              offset={-100}
              open={this.state.purchaseConfirmationModal}
                modalDidOpen={() => console.log('modal did open')}
                modalDidClose={() => this.setState({purchaseConfirmationModal: false})}
              modalStyle={{alignItems: 'center',
                     justifyContent: 'center',
                     height: 200,
                     width: 350,
                     borderRadius: 4,
                     margin: 20,
                     padding: 10,
                     backgroundColor: '#f4ebd9'}}>
                <View style={styles.modalContainer}>

                    <Text> Thank You For Your Donation </Text>

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
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  foundationLogos:{

    top: 0,
    left: 0,
    height: 200,
    width: 375,
    backgroundColor: 'black',
    opacity: .4,
    position: 'absolute'
  },
  foundationTitleContainer: {
    justifyContent: 'center',
    backgroundColor: '#a39a92',
    height: 50,
    backgroundColor: "#77685d",
    borderRadius: 20,
    top: 25,

  },
  newsFeedText: {
    color: 'white',

    fontSize: 40,
    backgroundColor: 'rgba(0,0,0,0)',
    opacity: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  descriptionContainer:{
    flex: 1,


    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4ebd9',


  },
  descriptionText: {
    color: '#483d3f',
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'

  },
  donateButtonContainer:{
    flex: 1,
    backgroundColor: '#f4ebd9',
    justifyContent: 'center',



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
