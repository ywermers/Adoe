import React from 'react';
import ReactDOM from 'react-dom';



const mainDiv = {
   display:'flex',
   width:"1350px",
   height:'630px',
   backgroundColor:'pink'
 };

 const sideBar = {
    flex:2,
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


    const currentApp = {
            flex:7,
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            borderStyleLeft:'groove',
            borderColorLeft:'red',
            backgroundColor:"white"
      };

          const top = {
                  flex:4,
                  display:'flex',
                  flexDirection:'row',
                  backgroundColor:"pink"
            };

            const body = {
                    flex:15,
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    borderStyleLeft:'groove',
                    borderColorLeft:'red',
                    backgroundColor:"white",
                    boxShadow: "10px 10px 5px #888888",
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

    const right = {
             flex:1,
             display:'flex',
             justifyContent:'center',
             borderStyleLeft:'groove',
             borderColorLeft:'red',
             backgroundColor:"pink"
         };







class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      main: 'account',
      accountName:'Alex',
      accountInfo:'Thebigtoe',
      subscribers: [],
      fundraisers:[]
    }
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




  render() {
    return (
  <div id="mainDiv" style={mainDiv}>
      <div id="sidebar" style={sideBar}>
          <div id="topSideBar" style={topSideBar}> <h1>{this.state.accountName}</h1></div>
          <div id="bottomSideBar" style={bottomSideBar}><h3 onClick={this.account.bind(this)}>Account</h3><h3 onClick={this.subscribers.bind(this)}>Subscribers</h3><h3 onClick={this.fundraisers.bind(this)}>Fundraisers</h3><h3 onClick={this.about.bind(this)}>About</h3></div>
      </div>
        {this.state.main==="account"&& <Account  fundraisers={this.state.fundraisers} accountName={this.state.accountName} accountInfo={this.state.accountInfo}/>}
        {this.state.main==="about"&& <About/>}
        {this.state.main==="fundraisers"&& <Fundraisers fundraisers={this.state.fundraisers}/>}
        {this.state.main==="subscribers"&& <Subscribers subscribers={this.state.subscribers}/>}

      <div id="right" style={right}></div>
  </div>
    )
  }
}




class Account extends React.Component {
  constructor(props){
    super(props)
    this.state={
      logo:false,
      description:false,
      stripe:false,
      isOpen:false,
      info:'heloo',
      buttonText:''
    }
  }
  toggleModal(description) {
     this.setState({
       isOpen: !this.state.isOpen,
       info:description
     });
   }

  description() {

    this.setState({
      logo:false,
      stripe:false,
      description:true,
      buttonText:'edit description'
    })
  }

  logo() {
    this.setState({
      logo:true,
      description:false,
      stripe:false,
      buttonText:'upload pic'
    })
  }
  stripe() {
    this.setState({
      stripe:true,
      description:false,
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
          <h3 onClick={this.logo.bind(this)}>Logo</h3><h3 onClick={this.description.bind(this)}>description</h3><h3 onClick={this.stripe.bind(this)}>Stripe</h3>
          </div>
          <div id="top right" style={{flex:1,display:'flex',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:'10'}}>
          <button onClick={this.toggleModal.bind(this)}>{this.state.buttonText}</button>
          </div>
        </div>
        <div id="body" style={body}>
        {this.state.isOpen===true&&this.state.description&&<DescriptionModal onClose={this.toggleModal.bind(this)} show={this.state.isOpen} info={this.props.accountInfo}/>}
        {this.state.logo===true&&<div><img src="https://www.bcrfcure.org/sites/all/themes/bcrf/logo.svg"></img></div>}
        {this.state.description===true&&<div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>{this.state.info}</div>}
        {this.state.stripe===true&&<div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}></div>}
        </div>
        <div id="bottom" style={bottom}></div>
      </div>
    )
  }
}

class Subscribers extends React.Component {

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



class DescriptionModal extends React.Component {


  constructor(props){
    super(props)
    this.state={
        editDescription:this.props.info
  }
}

      handleChange(e) {
          this.setState({
            editDescription:e.target.value
          })
      }




  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
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
          <button onClick={this.props.onClose.bind(null,this.state.editDescription)} style={{height:'20'}}>
            Ok
          </button>
        </div>
          <div id="description" style={{flex:5,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <textarea defaultValue={this.state.editDescription} onChange={this.handleChange.bind(this)} style={{height:'250',width:'250'}}></textarea>
          </div>
        </div>
      </div>
    );
  }
}








ReactDOM.render(<App/>, document.getElementById('root'));
