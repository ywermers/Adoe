var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foundationSchema  = mongoose.Schema({
  createdTime:{
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
  logo: {
    type: String
  },
  stripe: {
    accountid: String
  }
})

var Foundation = mongoose.model('Foundation', foundationSchema);

module.exports = Foundation
