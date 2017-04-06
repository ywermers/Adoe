var React = require('react');
var ReactDOM = require('react-dom');


var App=React.createClass({
  getInitialState:function() {
    return {
    page:'home'
   }
  },
  navigate:function(newPage) {
    this.setState({
      page:newPage
    });
  },
  render: function() {
    var main
    if(this.state.page==='home') {
      main = <Home navigate={this.navigate}/>;
    }
    if(this.state.page==='registration') {
      main = <Registration navigate={this.navigate}/>
    }
    if(this.state.page==='login') {
      main= <Login navigate={this.navigate}/>
    }
    return <div>{main}</div>
  }
})

var Home=React.createClass({


  login:function() {
    this.props.navigate('login')
  },
  register:function() {
    this.props.navigate('registration');
  },



  render:function() {
    return (
      <div>
      <h1>Adoe</h1>
      <button onClick={this.register}>Register</button>
      <button onClick={this.login}>login</button>
      </div>
    )
  }
})

var Registration=React.createClass({
  getInitialState:function() {
    return{
    foundationName:' ',
    email:' ',
    pass1:' ',
    pass2:' ',
    address:' ',
    description:' '
  }
  },
  foundationName:function(event) {
    this.setState({
      name:event.target.value
    })

  },
  email:function(event) {
    this.setState({
      email:event.target.value
    })
  },
  pass1:function(event) {
    this.setState({
      pass1:event.target.value
    });

  },
  pass2:function(event) {
    this.setState({
      pass2:event.target.value
    });

  },
  address:function(event){
    this.setState({
      address:event.target.value
    })
  },
  description:function(event){
    this.setState({
      description:event.target.value
    })
  },
  click:function() {

    $.ajax({
      url: "https://radiant-wildwood-80596.herokuapp.com/register",
      method:'POST',
      data: {
        "fname":this.state.name,
         "lname":this.state.lname,
         "email":this.state.email,
         "password":this.state.pass
      },
      success:function(data) {
        console.log('regetered!',data)
      },
      error:function(err) {
        console.log('nope!',err)
      }

    })
  },
  render:function() {
    return(

      <div>
    <h1>register</h1>
    <input type='text' onChange={this.foundationName}></input>foundationName
    <input type='email' onChange={this.email}></input>email
    <input type='password' onChange={this.pass1}></input>password
    <input type='password' onChange={this.pass2}></input>password
    <input type='text' onChange={this.address}></input>address
    <input type='textarea' onChange={this.description}></input>description
    <button onClick={this.click}>register</button>
    </div>
  )
  }
})


var Login=React.createClass({
      getInitialState:function() {
        return {
        email:' ',
        password:''
        }
      },
      email:function(event) {
        this.setState({
          email:event.target.value
        })
      },
      pass:function(event) {
        this.setState({
          password:event.target.value
        })
      },
      click:function() {

        $.ajax({
          url: "https://radiant-wildwood-80596.herokuapp.com/login",
          method:'POST',
          data: {
            "fname":this.state.name,
             "lname":this.state.lname,
             "email":this.state.email,
             "password":this.state.pass
          },
          success:function(data) {
            console.log('regetered!',data)
          },
          error:function(err) {
            console.log('nope!',err)
          }

        })
      },
      render:function() {
        return (
          <div>
          <h1>Login</h1>
          <input type='email' onChange={this.email}></input>email
          <input type='password' onChange={this.pass}></input>password
          <button onClick={this.click}>login</button>
          </div>
        )
      }


})

ReactDOM.render(<App/>, document.getElementById('root'));
