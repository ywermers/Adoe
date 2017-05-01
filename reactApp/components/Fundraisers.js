import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router'


export default class Fundraisers extends React.Component {
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
