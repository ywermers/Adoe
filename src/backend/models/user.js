var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema  = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    //  HTML5 email validation regex
    validate: function(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  password: {
    type: String,
    required:true
  },
  phoneNumber: {
    type: String,
    unique: true,
    validate: {
      validator: function(num) {
        // 10 digits
        var regexStuff = /^\d{10}$/;
        // checks that number exists and then checks against regex
        return (num === null || num.trim().length < 1) || regexStuff.test(num)
      },
      message: 'Provided phone number is invalid and/or not a US number'
    }
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
  }
  },
  donationID: [{
    type: mongoose.Schema.Types.ObjectId
  }]

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

// validaor package that doesn't really work for emails...
// userSchema.path('email').validate(validatorPackage.isEmail(), 'Please provide a valid email address');

var User = mongoose.model('User', userSchema);

module.exports = User
