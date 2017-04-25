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
var ScrollingMenu = require('react-native-scrolling-menu');
var Drawer = require('react-native-drawer')
var HumanFund= require('../foundation/HumanFund')



export default class Newsfeed extends Component {

onClick(itemIndex) {
  console.log("Selected: " + items[itemNum]);
}
constructor(props) {
   super(props);
   this.state = { text: '                         SearchBar' };
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
        console.log(response.foundations);
      } else {
      console.log('newfeed error');
      this.setState({
        responseJsonError: responseJson.error,
      });
    }
    console.log('responseJson', responseJson)
  })
  .catch((err) => {
    console.log('error', err)
  });
}


render () {
  return (
    <View style = {{flex:1, flexDirection:'column', alignItems:'center'}}>

      <View style={styles.top}>
        <View style={styles.buttons}>
            <TouchableOpacity>
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
              style={{height: 40, fontSize: 23, color: '#483d3f', borderColor: '#058ed9', backgroundColor:'#f4ebd9',  borderWidth: 4}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text} />
        </View>
      </View>

      <View style={styles.newsFeed}>
      <ScrollView>
          <TouchableOpacity>
            <Image
            style={styles.hfb}
            source={require('../foundation/humanfundpic.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            style={styles.hfb}
            source={require('../foundation/space.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            style={styles.hfb}
            source={require('../foundation/styasmeen.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
            style={styles.hfb}
            source={require('../foundation/humanfundpic.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            style={styles.hfb}
            source={require('../foundation/space.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            style={styles.hfb}
            source={require('../foundation/styasmeen.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
            style={styles.hfb}
            source={require('../foundation/humanfundpic.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            style={styles.hfb}
            source={require('../foundation/space.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            style={styles.hfb}
            source={require('../foundation/styasmeen.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
            style={styles.hfb}
            source={require('../foundation/humanfundpic.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            style={styles.hfb}
            source={require('../foundation/space.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            style={styles.hfb}
            source={require('../foundation/styasmeen.png')}
          />
          </TouchableOpacity>

        </ScrollView>
      </View>

    </View>
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
    backgroundColor: '#058ed9',
    width: 375,
    height: 150,
    flex: 2
  },
  newsFeed: {
    backgroundColor: '#f4ebd9',
    flex: 5

  },
  buttons: {
    flex: 3,
    flexDirection:'row',
    marginLeft: 12,
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
    backgroundColor: '#058ed9',
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
  menuicon: {
    height: 40,
    width:40,
    marginBottom: 8,
  },
  hfb:{
    height: 200,
    width:375

  },

  searchBar: {
    top: 200,
    backgroundColor: "#f4ebd9"
  }


});


module.exports = Newsfeed;
