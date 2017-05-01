import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router'
import FileInput from 'react-file-input'


export default class Description extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      show:false,
      modal:false
    }
  }

  openModal() {
    this.setState({
      modal:true,
      show:false
    })
  }

  closeModal(){
    this.setState({
      show:true
    })
  }
  uploadPic(event){
    console.log('Selected file:', event.target.files);
  }

  render() {
    return (<div id="master">
              {this.state.modal&&<DescriptionModal name={this.props.name} closeModal={this.closeModal.bind(this)} show={this.state.show }changeName={this.props.changeName}/>}
              <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray', borderWidth:'1px',display:'flex',alignItems:'center',height:'50',width:'900',}}>Foundation Name</div>
              <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray',borderWidth:'1px',display:'flex',alignItems:'center',justifyContent:"center",height:'100',width:'900'}}>{this.props.name}<button onClick={this.openModal.bind(this)}>changeName</button></div>
              <div id="address" style={{borderBottom:'solid',margin:'0',borderColor:'gray',borderWidth:'1px',display:'flex',flexDirection:'column',alignItems:'center',height:'100',width:'900'}}>
                  <span style={{paddingTop:'20'}}>{this.props.streetAddress}</span><span>{this.props.city} {this.props.state} {this.props.zip}</span>
              </div>
              <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray',borderWidth:'1px',display:'flex',alignItems:'center',height:'50',width:'900'}}>Email</div>
              <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray',borderWidth:'1px',display:'flex',alignItems:'center',justifyContent:'center',height:'100',width:'900'}}>{this.props.email}</div>
              <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray',borderWidth:'1px',display:'flex',alignItems:'center',height:'50',width:'900'}}>Logo</div>
              <div style={{borderBottom:'solid',paddingLeft:'20',borderColor:'gray',borderWidth:'1px',flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center',height:'400',width:'900'}}><img height="300" src='https://adoe.s3.amazonaws.com/1493243321900330px-Urbain_Le_Verrier.jpg'/>
                    <div style={{height:'1'}}>
                      <button>
                      
                      </button>
                    </div>
            </div>
          </div>
  )}
}
