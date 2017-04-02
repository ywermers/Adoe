const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fundraiserSchema  = mongoose.Schema({
  createdTime:{
    type: Date,
    default: Date.now()
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  creditToken:{
    type: String
  }
})

const Fundraiser = mongoose.model('Fundraiser', fundraiserSchema);

module.exports = {
  Fundraiser
}
