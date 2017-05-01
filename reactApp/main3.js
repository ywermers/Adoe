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
   width:"1350px",
   height:'640px',
   backgroundColor:'pink'
 };

 const sideBar = {
    flex:1,
    display:'flex',
    flexDirection:'column'
  };
      const topSideBar = {
         flex:1,
         display:'flex',
         justifyContent:'center'
       };
       const bottomSideBar = {
          flex:4,
          flexDirection:'column',
          display:'flex',
          paddingLeft:"20px"
        };

  const left = {
     flex:1,
     display:'flex',
     flexDirection:'column',
     justifyContent:'center',
     borderStyleLeft:'groove',
     borderColorLeft:'red',
     backgroundColor:"pink"
   };



          const top = {
                  flex:4,
                  display:'flex',
                  borderStyle:'solid',
                  borderColor:'red',
                  flexDirection:'row',
                  backgroundColor:"pink"
            };


    const right = {
             flex:1,
             display:'flex',
             justifyContent:'center',
             borderStyle:'solid',
             borderColor:'black'
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
                   borderStyleLeft:'groove',
                   borderColorLeft:'red',
                   backgroundColor:"#42f4d9",
                   fontFamily: 'sans-serif',
                   borderStyle:"groove"
             };

             const bottom = {
                     flex:2,
                     display:'flex',
                     justifyContent:'center',
                     borderStyleLeft:'groove',
                     borderColorLeft:'red',
                     backgroundColor:"pink"
               };



class Main extends React.Component {
  constructor(props){
    super(props)
    this.state={
      main: 'account',
      accountName: 'alex',
      accountInfo:'bigtoes',
      subscribers: null,
      logo: null,
      email:'thebigtoeman77@gmail.com',
      streetAddress:'7 seafrth lane',
      country:'united states',
      city:'huntington',
      state:'new york',
      zip:'11743',
      fundraisers:null
    }
  }

  componentWillMount() {
    console.log('FETCH')
    fetch('http://localhost:3001/api/foundations/userdata', {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('got fetch data!')
      this.setState({
      accountName: responseJson.name,
      accountInfo:responseJson.description,
      subscribers: null,
      logo: responseJson.logo,
      email:responseJson.email,
      streetAddress:responseJson.streetAddress,
      country:responseJson.country,
      city:responseJson.city,
      state:responseJson.ustate,
      zip:null
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
    fetch('http://localhost:3001/api/foundations/updateName', {
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



  render() {
    return (
  <div id="mainDiv" style={mainDiv}>
      <div id="sidebar" style={sideBar}>
          <div id="topSideBar" style={topSideBar}> <h1>{this.state.accountName}</h1></div>
          <div id="bottomSideBar" style={bottomSideBar}>
          <h3 style={{cursor: 'pointer'}} onClick={this.account.bind(this)}>Account</h3><h3 style={{cursor: 'pointer'}} onClick={this.subscribers.bind(this)}>Subscribers</h3>
          <h3 style={{cursor: 'pointer'}} onClick={this.fundraisers.bind(this)}>Fundraisers</h3><h3 style={{cursor: 'pointer'}} onClick={this.about.bind(this)}>About</h3></div>
      </div>
        {this.state.main==="account"&& <AccountInfo logo={this.state.logo} changeName={this.changeName.bind(this)}
          logo={this.state.logo} email={this.state.email} zip={this.state.zip} city={this.state.city} state={this.state.state} fundraisers={this.state.fundraisers} streetAddress={this.state.streetAddress} accountName={this.state.accountName} accountInfo={this.state.accountInfo}/>}
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
      description:false,
      stripe:false,
      info:true,
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
      <div id="a" style={{flex:4,borderStyle:'dotted',borderColor:'orange',overflowY:"scroll"}}>
                <Description changeName={this.props.changeName} logo={this.props.logo} email={this.props.email }zip={this.props.zip} state={this.props.state} city={this.props.city} streetAddress={this.props.streetAddress} name={this.props.accountName} info={this.props.accountInfo}/>
      </div>
    )
  }
}




 class Description extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      show:false,
      modal:false,
      information:true
    }
  }

  openModal() {
    this.setState({
      modal:true,
      show:false,
      donations:false
    })
  }

  closeModal(){
    this.setState({
      show:true
    })
  }
  information(){
    this.setState({
      information:true,
      donations:false
    })
  }
  donations(){
    this.setState({
      donations:true,
      information:false
    })
  }
  uploadPic(event){
    console.log('Selected file:', event.target.files);
  }

  render() {
    return (<div id="b" style={{height:'1200',backgroundColor:'lightblue',display:'flex',flexDirection:'column'}}>
              <div id="c" style={{backgroundColor:'pink',flex:'flex: 0 0 25em',display:'flex',justifyContent:'space-around'}}><h1 onClick={this.information.bind(this)}>Account Info</h1><h1 onClick={this.donations.bind(this)}>Donations</h1></div>
              {this.state.information&&
              <div id="d" style={{flex:20}}>
                {this.state.modal&&<DescriptionModal name={this.props.name} closeModal={this.closeModal.bind(this)} show={this.state.show }changeName={this.props.changeName}/>}
                <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray', borderWidth:'1px',display:'flex',alignItems:'center',height:'120',width:'900',}}>Foundation Name</div>
                <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray',borderWidth:'1px',display:'flex',alignItems:'center',justifyContent:"center",height:'100',width:'900'}}>
                    <span style={{marginRight :'20'}}>{this.props.name}</span><button onClick={this.openModal.bind(this)}>changeName</button></div>
                <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray', borderWidth:'1px',display:'flex',alignItems:'center',height:'120',width:'900',}}>Where are you located?</div>
                <div id="address" style={{borderBottom:'solid',margin:'0',borderColor:'gray',borderWidth:'1px',display:'flex',flexDirection:'column',alignItems:'center',height:'100',width:'900'}}>
                    <span style={{paddingTop:'20'}}>{this.props.streetAddress}</span><span>{this.props.city} {this.props.state} {this.props.zip}</span>
                </div>
                <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray', borderWidth:'1px',display:'flex',alignItems:'center',height:'120',width:'900',}}>Mission Statement/Description</div>
                <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray',borderWidth:'1px',display:'flex',alignItems:'center',justifyContent:"center",height:'100',width:'900'}}>
                    <span style={{marginRight :'20'}}>{this.props.info}</span><button onClick={this.openModal.bind(this)}>changeName</button></div>
                    <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray', borderWidth:'1px',display:'flex',alignItems:'center',height:'120',width:'900',}}>Logo/Description</div>
                    <div style={{paddingLeft:'20',borderColor:'gray',borderWidth:'1px',display:'flex',alignItems:'center',justifyContent:"center",height:'100',width:'900'}}>
                        <span style={{marginRight :'20'}}>{this.props.info}</span><button onClick={this.openModal.bind(this)}>changeName</button></div>
              </div>}
              {this.state.donations&&
                <div style={{flex:20}}>Stripe</div>}
      </div>
  )}
}



 class DescriptionModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      editDescription:this.props.info,
      newName:null
    }
  }

  handleChange(e) {
    this.setState({
      newName:e.target.value
    })
  }

  ok() {
    this.props.closeModal();
    this.props.changeName.bind(null,this.state.newName)();
  }


  render() {
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
      marginLeft:'400',
      padding: 30,
      display:'flex',
      flexDirection:'column'
    };


    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
        <div style={{flex:1,display:'flex',justifyContent:'flex-end'}} className="close">
          <button onClick={this.ok.bind(this)} style={{height:'20'}}>
            Ok
          </button>
        </div>
          <div id="description" style={{flex:5,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <textarea defaultValue={this.props.name} onChange={this.handleChange.bind(this)} style={{height:'250',width:'250'}}></textarea>
          </div>
        </div>
      </div>
    );
  }
}



 class About extends React.Component {
  render() {
    return (
        <div id="currentApp" style={currentApp}>
          <div id="top" style={top}></div>
          <div id="body" style={body}></div>
          <div id="bottom" style={bottom}></div>
        </div>
    )
  }
}


 class Fundraisers extends React.Component {
  render() {
    return (
      <div id="currentApp" style={currentApp}>
        <div id="top" style={top}>
          <div id="topleft" style={{flex:1}}></div>
          <div id="topright" style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:'10'}}><button>create fundraiser</button></div>
        </div>
        <div id="body" style={body}>{this.props.fundraisers===0&&<h2>You have not created any fundrasiers</h2>}</div>
        <div id="bottom" style={bottom}></div>
      </div>
    )
  }
}

export default class Subscribers extends React.Component {

  render() {
    return (
      <div id="currentApp" style={currentApp}>
        <div id="top" style={top}>
        </div>
        <div id="body" style={body}>you have no subscribers</div>
        <div id="bottom" style={bottom}></div>
      </div>
    )
  }
}










ReactDOM.render(<Main/>, document.getElementById('root'));
