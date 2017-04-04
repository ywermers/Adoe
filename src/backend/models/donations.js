var mongoose = require('mongoose');



var donationSchema = mongoose.Schema({
  createdTime:{
    type: Date,
    default: Date.now()
  },
  amount:{
    type:Number,
    required: true
  },
  amount_refunded:{
    type:Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, //this might error
    required: true
  },
  foundationid:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  status: {
    type: String,
    required:true
  }
})

const Donation = mongoose.model('Donation', donationSchema);

module.exports = {
  Donation
}
