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
import SearchBar from 'react-native-material-design-searchbar';
import Modal from 'react-native-modal';
import { Container, Content, List, ListItem, Thumbnail, Body, Drawer } from 'native-base';
import  ScrollingMenu from 'react-native-scrolling-menu';
// var Drawer = require('react-native-drawer')
var HumanFund= require('../foundation/HumanFund')
var SideBar = require('./SideBar')
var Foundation = require('./FoundationPage')



export default class Newsfeed extends Component {
drawer = Object
onClick(itemIndex) {
  console.log("Selected: " + items[itemNum]);
}
constructor(props) {
   super(props);
   this.state = { text: '                         SearchBar' };
   this.state.foundations = null
}
componentWillMount(){
  var user = AsyncStorage.getItem('user');
  fetch('https://polar-sands-99108.herokuapp.com/api/users/newsfeed', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      authToken: user.authToken,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log('response',responseJson);
      if(responseJson.success){
        this.setState({
          foundations: responseJson.foundations,
        })
      } else {
      console.log('newfeed error');
      this.setState({
        responseJsonError: responseJson.error,
      });
    }
    console.log('responseJson', responseJson)
  })
  .catch((err) => {
    console.log('unicorn', err)
  });
}

foundationNavigation(foundation){
console.log('foundation', Foundation);
    this.props.navigator.push({
      component: Foundation,
      title: foundation.name,
      passProps: {
        foundation: foundation
      }
    })
}

render () {
  var closeDrawer = () => {
    this.drawer._root.close()
  }

  var openDrawer = () => {
    console.log(this.drawer);
    this.drawer._root.open()
  }
  console.log('foundations',this.state.foundations);
  var foundationsList= null;
  if(this.state.foundations){
     foundationsList = this.state.foundations.map((foundation ,i) =>{
      return (<View key={i} style={styles.newsFeedContainer}>

      <TouchableOpacity onPress={this.foundationNavigation.bind(this, foundation)}>
        <Image
        style={styles.foundationLogos}
        source={{uri: foundation.logoURL}}>
        <Text style={styles.newsFeedText}>
          {foundation.name}
          </Text>
          </Image>
      </TouchableOpacity>

      </View>)
    });
      console.log('foundationsList', foundationsList);
  }
  return (
    <Drawer ref={(ref) => { this.drawer = ref; }}
      content={<SideBar navigator={this.props.navigator} />}
      onClose={() => closeDrawer()} >
      <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
        <View style={styles.top}>
          <View style={styles.buttons}>
              <TouchableOpacity onPress={() => openDrawer()}>
                <Image
                  style={styles.menuicon}
                  source={require('../assets/menu.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                   <Text style={styles.buttonText}>
                       Feed
                   </Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>
                    News
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>
                    Me
                  </Text>
             </TouchableOpacity>
          </View>
          <View style={styles.search}>
          <TextInput
                style={{height: 40, fontSize: 23, color: '#483d3f', borderColor: '#483d3f', backgroundColor:'#f4ebd9',  borderWidth: 4}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text} />
          </View>
        </View>

        <View style={styles.newsFeed}>
           <ScrollView automaticallyAdjustContentInsets={false}>
            <List style={styles.test}>

              {foundationsList ? <View>{foundationsList}</View> : null}
            </List>
            </ScrollView>
        </View>

      </View>
    </Drawer>
    );
  }
}


// <View style={{width:375, topMargin:150, backgroundColor: '#058ed9', justifyContent: 'flex-start'}}>
//  <View style={styles.main}>
//
//
//  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#058ed9'}}>
//
//   <View style={{ backgroundColor: '#058ed9'}}>
//     <TouchableOpacity>
//       <Image
//         style={styles.menuicon}
//         source={require('../assets/menu.png')}
//       />
//     </TouchableOpacity>
//   </View>
//
//   <View style={{justifyContent:'center'}}>
//     <TouchableOpacity style={styles.button1}>
//       <Text style={styles.buttonText}>
//           Feed
//       </Text>
//     </TouchableOpacity>
//
//     <TouchableOpacity style={styles.button2}>
//       <Text style={styles.buttonText}>
//         News
//       </Text>
//     </TouchableOpacity>
//
//     <TouchableOpacity style={styles.button3}>
//       <Text style={styles.buttonText}>
//         Me
//       </Text>
//     </TouchableOpacity>
//   </View>
// </View>
//
// <View style={{flex:1}}>
//
//    <TextInput style={styles.searchBar}
//       style={{height: 40, fontSize: 23, color: '#a39a92', borderColor: '#058ed9', borderWidth: 4}}
//       onChangeText={(text) => this.setState({text})}
//       value={this.state.text} />
// </View>
//
// <View style={styles.foundationslist}>
//   <ScrollView>
//     <TouchableOpacity onPress={this.showModal}>
//     <Image
//       style={styles.hfb}
//       source={require('../foundation/buttonSample.png')}
//     />
//     </TouchableOpacity>
//     <Modal isVisible={this.state.isModalVisible}>
//         <View style={{ flex: 1 }}>
//           <Text>Hello!</Text>
//         </View>
//     </Modal>
//   </ScrollView>
// </View>
// </View>
// </View>

  //  <View style={{width:375, height: 150, backgroundColor: '#058ed9', justifyContent: 'flex-start'}}>
var styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column'
  },
  top: {
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor: '#483d3f',
    width: 375,
    height: 150,
    flex: 2
  },
  newsFeed: {
    backgroundColor: '#483d3f',
    flex: 5,

  },
  buttons: {
    flex: 3,
    flexDirection:'row',
    paddingLeft: 12,
    paddingBottom: 12,
    alignItems: 'flex-end'
  },
  search: {
    flex:1,
  },
  buttonText: {
    fontSize: 20,
    color: '#f4ebd9',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 70,
    backgroundColor: '#483d3f',
    borderColor: '#f4ebd9',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 10,
    justifyContent: 'center',
    top: 7,
    left: 50,
    marginLeft:7,
    borderRadius:10,
  },
  newsFeedContainer: {
    // flex: 1
  },
  foundationLogos:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 375,
    backgroundColor: 'black',
    opacity: .4
  },
  newsFeedText: {
    color: 'white',
    fontSize: 40,
    backgroundColor: 'rgba(0,0,0,0)',
    opacity: 1
  },
  menuicon: {
    height: 40,
    width:40,
    marginBottom: 8,
  },
  searchBar: {
    backgroundColor: "#483d3f"
  }
});


module.exports = Newsfeed;
