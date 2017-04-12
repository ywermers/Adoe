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
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    reuired:true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  streetAddress: {
    type: String
  },
  city: {
    type: String
  },
  ustate: {
    type: String
  },
  zipCode: {
    type: String
  },
  country: {
    type: String
  },
  authToken:{
    type:String
  },
  createdToken:{
    type: Date
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
      this.update({authToken:newToken,createdToken: Date.now()},
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
