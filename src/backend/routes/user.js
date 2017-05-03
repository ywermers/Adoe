var express = require('express');
var router = express.Router();
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');

var stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);

var hbs=require('express-handlebars')


//to addcreditCard pass creditToken and authToken
router.post('/api/users/addcreditcard',function(req,res){

    console.log('THISISTHETESt')
    console.log('req.body.authToken',req.body.authToken)

    User.findOne({authToken:req.body.authToken},function(err,user){
      if(err) console.log(err);
      console.log('user',user)
      if(user){
        console.log('user found', user)
        stripe.tokens.create({
          card: {
           "number": req.body.number,
           "exp_month": req.body.month,
           "exp_year": req.body.year,
           "cvc": req.body.cvc
         }
        }, function(err, token) {
          stripe.customers.update(user.stripe.customerID, {
            source: token.id
          }, function(err, customer){
            if(err) console.log(err)
            if(customer) res.json({success : true})
          });
        });
      }else if(!user){
        console.log('user not found')
      }
    })
})


router.post('/api/users/register', function(req,res){
  console.log('register user route');
  var user = new User({
    name : req.body.name,
    email :  req.body.email,
    password : req.body.password,
    phoneNumber: req.body.phoneNumber,
    streetAddress: req.body.streetAddress,
    city:req.body.city,
    ustate:req.body.ustate,
    zipCode:req.body.zipCode,
    country:req.body.country
  });
  user.save()
  .then(function(user){
    return stripe.customers.create({
      description: 'Customer for' + user.email,
      email: user.email
    })
  }).then(function(customer){
    return user.update({stripe: {customerID: customer.id}},{w:1}).exec()
  }).then(function(update){
    console.log('user registered')
    res.json({success: true})
  }).catch((err) => res.status(500).json(err))
})

router.post('/api/users/login',function(req,res){
  User.findOne({email:req.body.email, password: req.body.password}, function(err,user){
    if(err) console.log(err);
    if(user){
      console.log('user found!!!',user);
        user.tokenize(function(token, updated){
          console.log('token saved', updated);
          res.json({success: true, token:token});
        })
    }else if(!user){
      console.log('user not found');
      res.json({success: false})
    }

  })
})



//To charge a card pass authToken, foundationToken, and amount
router.post('/api/users/chargeCard',function(req,res){
  var platform_fee = parseInt(process.env.PERCENT_FEE) * req.body.amount;
  var user;
  var foundation;
    User.findOne({authToken: req.body.authToken})
    .then((tempUser) => {
      console.log('urser1',tempUser);
      user = tempUser;
      return Foundation.findOne({_id: req.body.foundationToken})
    }).then((tempFoundation) =>{
      foundation = tempFoundation
      return stripe.tokens.create({
        customer: user.stripe.customerID,
      }, {
        stripe_account: foundation.stripeUserId
      })
    }).then((token) => {
      return stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        source: token.id,
        application_fee: process.env.PERCENT_FEE * req.body.amount
      },{
          stripe_account: foundation.stripeUserId
        });
    }).then((charge)=>{
      var donation = new Donation({
        "amount": charge.amount,
        "amount_refunded": 0,
        "userId": user._id,
        "userName":user.name,
        "foundationId": foundation._id,
        "status": charge.status
      });
      return donation.save()
    }).then((donation) =>{
      console.log('donation', donation);
      console.log('user', user);
      return user.update({$push : {donationID : donation._id} }, {w:1}).exec()
    }).then((updated) =>{
      return foundation.update({$push : {donationID : donation._id} }, {w:1}).exec()
    }).then((updated) =>{
      res.json({"success": true})
    }).catch((err) => {
      res.status(500).json({err:err, message: "cannot charge this account"});
    });
});

//pass authToken returns json tax receipt
router.post('/api/users/taxReceipts', function(req, res){
  var donations;
   User.findOne({authToken: req.body.authToken})
     .then((user) => {
       return Donation.find({_id : {$in: user.donationID}})
     }).then((tempDonations) => {
       donations = tempDonations;
       var foundationIds = donations.map(donation=>donation.foundationId)
      return Foundation.find({_id : {$in: foundationIds}})
    }).then((foundations) =>{
        var returnJson = donations.map((donation)=>{
          var taxReceipt = {
            amount : donation.amount,
            date : donation.createdTime,
            foundation: null
          }
          for(var i =0; i<foundations.length; i++){
            if(donation.foundationId.equals(foundations[i]._id)){
              taxReceipt.foundation = foundations[i].name
            }
          }
          return taxReceipt
        });
         res.json({success: true, taxReceipts: returnJson});
    }).catch((err)=>{
      res.status(500).json({success: false, err: err});
    })
})
//send authToken
//stripe.accounts.list will only receive max 100 foundations
//future pagination will have to be implemented
router.post('/api/users/newsfeed',function(req,res) {
  var foundationJsonArray = []
  var foundations = []
 stripe.accounts.list({limit:100})
  .then((stripe_accounts_list)=>{
    var array_userIds = stripe_accounts_list.data.map((x) => x.id);
    return Foundation.find({stripeUserId : {$in:array_userIds}});
  }).then((foundations) =>{
    var foundationsJson = foundations.map((foundation)=>{
      return {
        "name": foundation.name,
        "id": foundation._id,
        "email": foundation.email,
        "phoneNumber": foundation.phoneNumber,
        "description": foundation.description,
        "logoURL": foundation.logoURL
      }
    });
    res.json({success: true, foundations: foundationsJson});
  }).catch(err => console.log(err))
});


module.exports = router;
