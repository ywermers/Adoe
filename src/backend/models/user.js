var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema  = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  phoneNumber: {
    type: String
    // unique: true
  },
  address: {
    type: String,

  },
  authToken:{
    token:String,
    createdAt: Date
  },
  stripe:{
    creditToken:{
      type: String
    },
    customerID: {
      type: String
    },
    donationID: [{
    type: mongoose.Schema.Types.ObjectId
    }]
  }
});

userSchema.methods.tokenize = function(cb){
  var newToken = this.email + Date.now().toString()
      this.update({authToken: {token: newToken,
                  createdAt: Date.now()}},
                  { w:1},
    function(err, updated){
      if(err) console.log(err);
      else{
        cb(newToken, updated);
      }
    });
}

var User = mongoose.model('User', userSchema);

module.exports = User
