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
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String
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
  description: {
    type: String,
    required: true
  },
  logoURL: {
    type: String
  },
  stripeAccountId: {
    type: String
  }
})

var Foundation = mongoose.model('Foundation', foundationSchema);

module.exports = Foundation
