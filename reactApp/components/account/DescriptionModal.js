import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router'
import FileInput from 'react-file-input';



export default class DescriptionModal extends React.Component {
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
