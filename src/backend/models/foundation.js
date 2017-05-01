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
  description: {
    type: String,
    required: true
  },
  logoURL: {
    type: String
  },
  stripeAccessToken: {
    type: String
  },
  stripeRefreshToken: {
    type: String
  },
  stripeUserId: {
    type: String
  },
  stripePublishable: {
    type: String
  }
})

var Foundation = mongoose.model('Foundation', foundationSchema);

module.exports = Foundation
