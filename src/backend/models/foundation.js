const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foundationSchema  = mongoose.Schema({
  createdTime:{
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    required: true
  },

})

const Foundation = mongoose.model('Foundation', foundationSchema);

module.exports = {
  Foundation
}
