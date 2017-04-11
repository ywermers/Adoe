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
          console.log("TOKEN", token)
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
    res.json({success: true})
  }).catch((err) => res.status(500).json(err))
})

router.post('/api/users/login',function(req,res){
  User.findOne({email:req.body.email, password: req.body.password}, function(err,user){
    if(err) console.log(err);
    if(user){
      console.log('user found!!!',user)
        user.tokenize(function(token, updated){
          console.log('token saved', updated)
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
      console.log('user', user);
      console.log('foundation', tempFoundation);
      foundation = tempFoundation
      return stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        source: user.stripe.createdToken,
        application_fee: process.env.PERCENT_FEE * req.body.amount
      },{
          stripe_account: foundation.stripeAccountId
        });
    }).then((charge)=>{
      res.json(charge)
    }).catch((err) => {
      res.status(500).json(err);
    })

});


router.get('/api/users/newsfeed',function(req,res) {
  Foundation.find()
  .then((foundations)=> {
    var arr=[]
    foundations.forEach((foundation)=>{
      var obj={}
      obj.name=foundation.name;
      obj.description=foundation.description;
      obj.logo=foundation.logo;
      obj.city=foundation.city;
      arr.push(obj)
    })
    res.json(arr)
  }).catch((error)=> {
    res.status(500).json(error)
  })
})









module.exports = router;
