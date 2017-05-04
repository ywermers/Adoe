import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router'
import FileInput from 'react-file-input';


//
// import AccountInfo from './components/Account/AccountInfo.js'
// import About from './components/About.js'
// import Subscribers from './components/Subscribers.js'
// import Fundraisers from './components/Fundraisers'
//

const mainDiv = {
   display:'flex',
   width:"1360px",
   height:'640px',
   fontFamily:'Camphor, "Segoe UI", "Open Sans", sans-serif',
   backgroundColor:'#F1F5F9'
 };

 const sideBar = {
    flex:2,
    display:'flex',
    flexDirection:'column'
  };
      const topSideBar = {
         flex:1,
         display:'flex',
         justifyContent:'center',
         alignItems:'center'
       };
       const bottomSideBar = {
          flex:4,
          flexDirection:'column',
          display:'flex',
          justifyContent:'center'
        };

  const left = {
     flex:1,
     display:'flex',
     flexDirection:'column',
     justifyContent:'center',
     borderStyleLeft:'groove',
     borderColorLeft:'red',
     backgroundColor:"#F1F5F9"
   };



          const top = {
                  flex:2,
                  display:'flex',
                  flexDirection:'row',
                  backgroundColor:"#F1F5F9"
            };


    const right = {
             flex:1,
             display:'flex',
             justifyContent:'center',
             borderStyleLeft:'groove',
             borderColorLeft:'red',
             backgroundColor:"#F1F5F9"
         };


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
                   justifyContent:'center',
                   borderStyleLeft:'groove',
                   borderColorLeft:'red',
                   backgroundColor:"#F6F9FC",
                   fontFamily: 'Camphor, "Segoe UI", "Open Sans", sans-serif',
                   borderStyle:"groove"
             };

             const bottom = {
                     flex:1,
                     display:'flex',
                     justifyContent:'center',
                     borderStyleLeft:'groove',
                     borderColorLeft:'red',
                     backgroundColor:"#F1F5F9"
               };



class Main extends React.Component {
  constructor(props){
    super(props)
    this.state={
      main: 'account',
      accountName: null,
      accountInfo:null,
      subscribers: [],
      fundraisers:[],
      donations:[],
      logoURL: null,
      email:null,
      streetAddress:null,
      country:null,
      city:null,
      state:null,
      zip:null
    }
  }

  componentWillMount() {
    fetch('https://polar-sands-99108.herokuapp.com/api/foundations/userdata', {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('got fetch data!',responseJson)
      this.setState({
      accountName: responseJson.name,
      accountInfo:responseJson.description,
      logoURL: responseJson.logoURL,
      email:responseJson.email,
      streetAddress:responseJson.streetAddress,
      country:responseJson.country,
      city:responseJson.city,
      state:responseJson.ustate,
      zip:responseJson.zipCode
    })
  })
    .catch((err) => {
      console.log('error', err)
    });

    fetch('https://polar-sands-99108.herokuapp.com/api/foundations/donations', {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        donations:responseJson
      })

  })
    .catch((err) => {
      console.log('error', err)
    });

  }

  account() {
    this.setState({
      main:'account'
    })
  }
  about() {
    this.setState({
      main:'about'
    })
  }
  subscribers() {
    this.setState({
      main:'subscribers'
    })
  }
  fundraisers() {
    this.setState({
      main:'fundraisers'
    })
  }
  changeName(name) {
    console.log('updating name...')
    fetch('https://polar-sands-99108.herokuapp.com/api/foundations/updateName', {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        accountName: name
      })
      console.log('name updated!')
    })
    .catch((err) => {
      console.log('update name error:(', err)
    });
  }


    changeEmail(email) {
      console.log('updating email...')
      fetch('https://polar-sands-99108.herokuapp.com/api/foundations/updateEmail', {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          email: email
        })
        console.log('email updated!')
      })
      .catch((err) => {
        console.log('update email error:(', err)
      });
    }
    changeInfo(info) {

      console.log('updating info...')
      fetch('https://polar-sands-99108.herokuapp.com/api/foundations/updateDescription', {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: info
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          accountInfo: info
        })
        console.log('info updated!')
      })
      .catch((err) => {
        console.log('update name error:(', err)
      });
    }

    changeAddress(street,city,state,country,zip) {

      fetch('https://polar-sands-99108.herokuapp.com/api/foundations/updateAddress', {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          streetAddress: street,
          city:city,
          state:state,
          country:country,
          zip:zip
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          streetAddress: street,
          city:city,
          state:state,
          country:country,
          zip:zip
        })
        console.log('address updated!')
      })
      .catch((err) => {
        console.log('update name error:(', err)
      });
    }





  render() {

    const account= {
      cursor:'pointer',
      padding:'0',
      fontSize:'30',
      marginBottom:'30',
      color:this.state.main==="account"&&'blue'

    }

    const subscribers= {
      cursor:'pointer',
      fontSize:'30',
      marginBottom:'30',
      color:this.state.main==="subscribers"&&'blue'

    }

    const fundraisers= {
      cursor:'pointer',
      fontSize:'30',
      color:this.state.main==="fundraisers"&&'blue'

    }


    return (
  <div id="mainDiv" style={mainDiv}>
      <div id="sidebar" style={sideBar}>
          <div id="topSideBar" style={topSideBar}> <h1 style={{fontFamily:'Camphor, "Segoe UI", "Open Sans", sans-serif',fontSize:'30'}}>{this.state.accountName}</h1></div>
          <div id="bottomSideBar" style={bottomSideBar}>
          <div style={{flex:1,display:'flex',justifyContent:'flex-start',marginLeft:'100',flexDirection:'column',alignItems:'flex-start'}}><span style={account} onClick={this.account.bind(this)}>Account</span><span style={subscribers} onClick={this.subscribers.bind(this)}>Subscribers</span>
           <span style={fundraisers} onClick={this.fundraisers.bind(this)}>Fundraisers</span></div></div>
      </div>
        {this.state.main==="account"&& <AccountInfo donations={this.state.donations} changeAddress={this.changeAddress.bind(this)} logo={this.state.logo} changeInfo={this.changeInfo.bind(this)} changeEmail={this.changeEmail.bind(this)} changeName={this.changeName.bind(this)} country={this.state.country}
          logoURL={this.state.logoURL} email={this.state.email} zip={this.state.zip} city={this.state.city} state={this.state.state} fundraisers={this.state.fundraisers} streetAddress={this.state.streetAddress} accountName={this.state.accountName} accountInfo={this.state.accountInfo}/>}
        {this.state.main==="about"&& <About/>}
        {this.state.main==="fundraisers"&& <Fundraisers fundraisers={this.state.fundraisers}/>}
        {this.state.main==="subscribers"&& <Subscribers subscribers={this.state.subscribers}/>}

  </div>
    )
  }
}




 class AccountInfo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      logo:false,
      description:true,
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

    const accountInfo= {
      cursor:'pointer',
      fontFamily:'Camphor, "Segoe UI", "Open Sans", sans-serif',
      color:this.state.info===true?'blue':'black'

    }
    const donations= {
      cursor:'pointer',
      fontFamily:'Camphor, "Segoe UI", "Open Sans", sans-serif',
      color:this.state.stripe===true?'blue':'black'

    }
    const buttonStyle= {
      backgroundColor:'#555ABF',
      color:'white',
      height:'30',
      width:'150',
      fontSize:'15',
      borderRadius: '10'
    }

    const bodyStyling ={
      flex:15,
      display:'flex',
      borderStyleLeft:'groove',
      borderColorLeft:'red',
      backgroundColor:"#F6F9FC",
      fontFamily: 'Camphor, "Segoe UI", "Open Sans", sans-serif',
      borderStyle:"groove",
      overflowY: !this.state.info&&this.props.donations.length<5?"hidden":"scroll"
    }

    return (
      <div id="currentApp" style={currentApp}>
        <div id="top" style={top}>
          <div id="top left" style={{display:'flex',fontFamily:'Georgia',color:'blue',flex:1,justifyContent:'space-around',alignItems:'center'}}>
          <h2 style={accountInfo} onClick={this.info.bind(this)}>Account Info</h2><h2  style={donations} onClick={this.stripe.bind(this)}>Donations</h2>
          </div>
          <div id="top right" style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:'10'}}>
              {this.state.stripe&&<a href='/api/foundations/api/oauth'><button style={buttonStyle}>Connect to Stripe</button></a>}
              {this.state.info&&<a href="/api/foundations/logout">Logout</a>}
          </div>
        </div>
        <div id="body" style={bodyStyling}>
        {this.state.info===true&&
        <Description changeAddress={this.props.changeAddress} changeName={this.props.changeName} changeEmail={this.props.changeEmail} changeInfo={this.props.changeInfo} country={this.props.country}
        logoURL={this.props.logoURL} email={this.props.email } zip={this.props.zip} state={this.props.state} city={this.props.city} streetAddress={this.props.streetAddress} name={this.props.accountName} info={this.props.accountInfo}/>}
        {this.state.stripe===true&&<Donations donations={this.props.donations}/>}
        </div>
      </div>
    )
  }
}

  class Donations extends React.Component {

  render() {
    var donationsLength=this.props.donations.length
    var addHeight=900+(donationsLength-4)*100
    const buttonStyle= {
      backgroundColor:'#555ABF',
      color:'white',
      height:'30',
      width:'150',
      fontSize:'15',
      borderRadius: '10'
    }
    const mainBox={
      display:'flex',
      flex:1,
      flexDirection:'column',
      height:donationsLength>4&&addHeight.toString()

    }


    var donationArr=[]

    var donations=this.props.donations.forEach((donation)=>{
      donationArr.push(<div style={{flex:1,borderColor:'gray', borderWidth:'1px',borderBottomStyle:'solid',display:'flex'}}><div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>{donation.userName}</div>
                                                                        <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>{donation.amount}</div><div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>{donation.createdTime}</div></div>)
    })


    return (
      <div id="MB" style={mainBox}>
          <div style={{flex:1,borderColor:'gray',borderBottomStyle:'solid', borderWidth:'5px',display:'flex',alignItems:'center',fontFamily:'Arial Black',backgroundColor:'#F6F9FC',paddingLeft:'20'}}>
          <div style={{flex:1,display:'flex',justifyContent:'center'}}>name</div><div style={{flex:1,display:'flex',justifyContent:'center'}}>amount donated</div><div style={{flex:1,display:'flex',justifyContent:'center'}}>date recieved</div></div>
        {donationArr}
      </div>
    )
  }
}




 class Description extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      descriptionshow:false,
      addressshow:false,
      infoshow:false,
      modal:false,
      addressmodal:false,
      infomodal:false,
      modalContent:null,
      type:null
    }
  }

  openModal(value,type) {
    console.log('hit')
    this.setState({
      modal:true,
      descriptionshow:false,
      type:type,
      modalContent: value
    })
  }
  openAddressModal() {
    this.setState({
      addressshow:false,
      addressmodal:true
    })
  }

  openInfoModal(value,type) {
    this.setState({
      infoshow:false,
      infomodal:true,
      modalContent: value
    })
  }

  closeModal(){
    this.setState({
      descriptionshow:true,
      addressshow:true,
      infoshow:true
    })
  }
  uploadPic(event){
    console.log('Selected file:', event.target.files);
  }

  render() {


      const buttonStyle= {
        backgroundColor:'#555ABF',
        color:'white',
        height:'50',
        width:'150',
        fontSize:'15',
        borderRadius: '10'
      }

    return (<div id="master" style={{fontFamily:'Camphor, "Segoe UI", "Open Sans", sans-serif',display:'flex',flex:1,flexDirection:'column',height:1000}}>
              {this.state.modal&&<DescriptionModal type={this.state.type} modalContent={this.state.modalContent} name={this.props.name} info={this.props.info} closeModal={this.closeModal.bind(this)} show={this.state.descriptionshow} changeEmail={this.props.changeEmail}  changeName={this.props.changeName}/>}
                {this.state.addressmodal&&<AddressModal changeAddress={this.props.changeAddress} streetAddress={this.props.streetAddress} city={this.props.city} country={this.props.country} state={this.props.state} zip={this.props.zip} closeModal={this.closeModal.bind(this)} show={this.state.addressshow} />}
                {this.state.infomodal&&<InfoModal info={this.props.info} changeInfo={this.props.changeInfo}show={this.state.infoshow} modalContent={this.state.modalContent} closeModal={this.closeModal.bind(this)}/>}

              <div style={{flex:1,borderColor:'gray',borderBottomStyle:'solid', borderWidth:'5px',display:'flex',alignItems:'center',fontSize:25,fontFamily:'Arial Black',backgroundColor:'#F6F9FC',paddingLeft:'20'}}>Account</div>

              <div id="name" style={{borderBottom:'solid',marginLeft:'20',marginRight:'20',flex:2,borderColor:'gray', borderWidth:'1px',display:'flex'}}>
                <div style={{flex:1,display:'flex',justifyContent:'flex-start',alignItems:'center',fontWeight:'bold',marginLeft:'20'}}>Foundation Name</div><div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>{this.props.name}</div>
                <div style={{flex:1,display:'flex',justifyContent:'flex-end',marginRight:'20',alignItems:'center'}}><button style={buttonStyle} onClick={this.openModal.bind(this,this.props.name,'name')}>ChangeName</button></div>
              </div>

              <div id="location" style={{borderBottom:'solid',marginLeft:'20',marginRight:'20',flex:3,borderColor:'gray', borderWidth:'1px',display:'flex'}}>
                  <div style={{flex:1,display:'flex',alignItems:'center',fontWeight:'bold',marginLeft:'20'}}>Where are you located?</div> <div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                                        <div style={{marginBottom:'10'}}>{this.props.streetAddress}</div><div style={{marginBottom:'10'}}>{this.props.city}</div><div style={{marginBottom:'10'}}>{this.props.country}</div>
                                                        <div>{this.props.state}</div><div>{this.props.zip}</div>
                                                    </div>
                                                  <div style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'center',marginRight:'20'}}><button style={buttonStyle} onClick={this.openAddressModal.bind(this)}>Change Address</button></div>
              </div>

              <div id="mission Statement" style={{borderBottom:'solid',marginLeft:'20',marginRight:'20',borderColor:'gray', borderWidth:'1px',display:'flex',flex:2}}>
                    <div style={{flex:1,display:'flex',justifyContent:'flex-start',alignItems:'center',fontWeight:'bold',marginLeft:'20'}}>Mission Statement/description</div>
                    <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>{this.props.info}</div>
                    <div style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'center',marginRight:'20'}}><button style={buttonStyle} onClick={this.openInfoModal.bind(this,this.props.info,'info')}>Edit</button></div>

              </div>
              <div id="logo" style={{borderBottom:'solid',marginLeft:'20',borderColor:'gray',marginRight:'20',marginRight:'20',borderWidth:'1px',display:'flex',flex:3}}>
                    <div style={{flex:1,display:'flex',marginLeft:'20',justifyContent:'flex-start',fontWeight:'bold',alignItems:'center'}}>Logo/description</div>
                    <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}><img height="200" width="200" src={this.props.logoURL}></img></div>
                    <div style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'center',marginRight:'20'}}><button style={buttonStyle} onClick={this.openModal.bind(this,this.props.info,'info')}>upload</button></div>

              </div>

          </div>
  )}
}



 class DescriptionModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      editDescription:this.props.info,
      newValue:this.props.name
    }
  }

  handleChange(e) {
    this.setState({
      newValue:e.target.value
    })
  }

  ok() {
    this.props.closeModal();
    if(this.props.type==='name') {
    this.props.changeName.bind(null,this.state.newValue)()
  }
    if(this.props.type==='email') {
  this.props.changeEmail.bind(null,this.state.newValue)()
    }
    if(this.props.type==='info') {
    this.props.changeInfo.bind(null,this.state.newValue)()
    }
  }


  render() {
    const buttonStyle= {
      backgroundColor:'#555ABF',
      color:'white',
      height:'50',
      width:'150',
      fontSize:'15',
      borderRadius: '10'
    }

    // Render nothing if the "show" prop is false
    if(this.props.show) {
      return null;
    }



    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      marginTop:'120',
      marginLeft:'600',
      padding: 30,
      display:'flex',
      flexDirection:'column'
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>

          <div id="description" style={{flex:5,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <input defaultValue={this.props.modalContent} onChange={this.handleChange.bind(this)} style={{height:'40',width:'350'}}></input>
          </div>
          <div style={{flex:1,display:'flex',justifyContent:'center'}} className="close">
            <button style={buttonStyle} onClick={this.ok.bind(this)}>
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }
}

 class InfoModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      editDescription:this.props.info,
      newValue:this.props.info
    }
  }

  handleChange(e) {
    this.setState({
      newValue:e.target.value
    })
  }

  ok() {
    this.props.closeModal();

    this.props.changeInfo.bind(null,this.state.newValue)()
    }



  render() {
    const buttonStyle= {
      backgroundColor:'#555ABF',
      color:'white',
      height:'50',
      width:'150',
      fontSize:'15',
      borderRadius: '10'
    }

    // Render nothing if the "show" prop is false
    if(this.props.show) {
      return null;
    }



    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      marginTop:'120',
      marginLeft:'600',
      padding: 30,
      display:'flex',
      flexDirection:'column'
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>

          <div id="description" style={{flex:5,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <input defaultValue={this.props.modalContent} onChange={this.handleChange.bind(this)} style={{height:'40',width:'350'}}></input>
          </div>
          <div style={{flex:1,display:'flex',justifyContent:'center'}} className="close">
            <button style={buttonStyle} onClick={this.ok.bind(this)}>
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }
}




 class AddressModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      editDescription:this.props.info,
      newValue:null,
      street:this.props.streetAddress,
      state:this.props.state,
      country:this.props.country,
      zip:this.props.zip,
      city:this.props.city
    }
  }

  handleChangeStreet(e) {
    this.setState({
      street:e.target.value
    })
  }
  handleChangeCity(e) {
    this.setState({
      city:e.target.value
    })
  }
  handleChangeState(e) {
    this.setState({
      state:e.target.value
    })
  }
  handleChangeCountry(e) {
    this.setState({
      country:e.target.value
    })
  }
  handleChangeZip(e) {
    this.setState({
      zip:e.target.value
    })
  }


  addressSubmit(street,city,state,country,zip) {

    this.props.closeModal();
    this.props.changeAddress(street,city,state,country,zip)
  }


  render() {
    const buttonStyle= {
      backgroundColor:'#555ABF',
      color:'white',
      height:'50',
      fontSize:'15',
      borderRadius: '10',
      marginLeft:'200'
    }

    // Render nothing if the "show" prop is false
    if(this.props.show) {
      return null;
    }
    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      marginTop:'120',
      marginLeft:'600',
      padding: 30,
      display:'flex',
      justifyContent:'center',
      flexDirection:'column'
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>

        <div style={{flex:1}}><input defaultValue={this.props.streetAddress} onChange={this.handleChangeStreet.bind(this)} style={{height:'25',marginBottom:'20',marginLeft:'130',width:'250'}}></input> Street</div>
        <div style={{flex:1}}><input defaultValue={this.props.city} onChange={this.handleChangeCity.bind(this)} style={{height:'25',width:'250',marginLeft:'130',marginBottom:'20'}}></input> City</div>
        <div style={{flex:1}}><input defaultValue={this.props.state} onChange={this.handleChangeState.bind(this)} style={{height:'25',width:'250',marginLeft:'130',marginBottom:'20'}}></input> State</div>
        <div style={{flex:1}}><input defaultValue={this.props.country} onChange={this.handleChangeCountry.bind(this)} style={{height:'25',width:'250',marginLeft:'130',marginBottom:'20'}}></input> Country</div>
        <div style={{flex:1}}><input defaultValue={this.props.zip} onChange={this.handleChangeZip.bind(this)} style={{height:'25',width:'250',marginLeft:'130',marginBottom:'20'}}></input> Zip</div>
        <div id="but" style={{display:'flex',justifyContent:'center',width:'50',marginLeft:'130'}}>
        <button  style={buttonStyle} onClick={this.addressSubmit.bind(this,this.state.street,this.state.city,this.state.state,this.state.country,this.state.zip)} >ok</button></div>

        </div>
      </div>
    );
  }
}




 class Fundraisers extends React.Component {
  render() {
    const buttonStyle= {
      backgroundColor:'#555ABF',
      color:'white',
      height:'30',
      width:'150',
      fontSize:'15',
      borderRadius: '10'
    }

    return (
      <div id="currentApp" style={currentApp}>
        <div id="top" style={top}>
          <div id="topleft" style={{display:'flex',fontFamily:'Georgia',color:'blue',flex:1,justifyContent:'space-around',alignItems:'center'}}>

          </div>
          <div id="topright" style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:'10'}}>
            <a href="/api"><button style={buttonStyle}> Create Fundraiser</button></a>
            </div>
        </div>
        <div id="body" style={body}>{this.props.fundraisers.length===0&&<h2 style={{marginTop:'90'}}>You have not created any fundrasiers</h2>}</div>
      </div>
    )
  }
}

export default class Subscribers extends React.Component {

  render() {
    const buttonStyle= {
      backgroundColor:'#555ABF',
      color:'white',
      height:'30',
      width:'150',
      fontSize:'15',
      borderRadius: '10'
    }


    return (
      <div id="currentApp" style={currentApp}>
      <div id="top" style={top}>
        <div id="topleft" style={{display:'flex',fontFamily:'Georgia',color:'blue',flex:1,justifyContent:'space-around',alignItems:'center'}}>

        </div>
        <div id="topright" style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:'10'}}>
          <a href="/api"><button style={buttonStyle}>Download email list</button></a>
          </div>
      </div>
        <div id="body" style={body}>{this.props.subscribers.length===0&&<h2 style={{marginTop:'90'}}>You do not have any subscribers</h2>}</div>
      </div>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('root'));
