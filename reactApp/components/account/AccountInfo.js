import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router'


const currentApp = {
        flex:7,
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        borderStyleLeft:'groove',
        borderColorLeft:'red',
        backgroundColor:"white"
  };
  const body = {
          flex:15,
          display:'flex',
          borderStyleLeft:'groove',
          borderColorLeft:'red',
          backgroundColor:"white",
          boxShadow: "10px 10px 5px #888888",
          borderStyle:"groove",
          overflowY: "scroll"
    };

    const bottom = {
            flex:2,
            display:'flex',
            justifyContent:'center',
            borderStyleLeft:'groove',
            borderColorLeft:'red',
            backgroundColor:"pink"
      };



 class AccountInfo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      logo:false,
      description:false,
      stripe:false,
      isOpen:false,
      buttonText:''
    }
  }
  toggleModal(description) {
     this.setState({
       isOpen: !this.state.isOpen,
       info:description
     });
   }

  info() {
  this.setState({
      logo:false,
      stripe:false,
      info:true,
      description:true,
      buttonText:'edit description'
    })
  }


  stripe() {
    this.setState({
      stripe:true,
      info:false,
      logo:false,
      buttonText:'connect with stripe'
    })
  }


  button() {
  this.setState({
    modal:true
  })


  }

  render() {

    return (
      <div id="currentApp" style={currentApp}>
        <div id="top" style={top}>
          <div id="top left" style={{display:'flex',fontFamily:'Georgia',color:'blue', marginTop:'135',flex:1,justifyContent:'space-around',alignItems:'flex-end'}}>
          <h3 onClick={this.info.bind(this)}>Account Info</h3><h3 onClick={this.stripe.bind(this)}>Stripe</h3>
          </div>
          <div id="top right" style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:'10'}}>
              {this.state.stripe&&<a href="/api/foundations/oauth/callback"><button>Stripe</button></a>}
              {this.state.info&&<button>Edit</button>}
              {this.state.logo&&<button>Upload picture</button>}
          </div>
        </div>
        <div id="body" style={body}>
        {this.state.info===true&&<Description changeName={this.props.changeName} logo={this.props.logo} email={this.props.email }zip={this.props.zip} state={this.props.state} city={this.props.city} streetAddress={this.props.streetAddress} name={this.props.accountName} info={this.props.accountInfo}/>}
        {this.state.stripe===true&&<div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}></div>}
        </div>
        <div id="bottom" style={bottom}></div>
      </div>
    )
  }
}
