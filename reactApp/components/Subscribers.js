import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router'


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
