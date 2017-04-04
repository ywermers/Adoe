var express = require('express');
var router = express.Router();
var Donation = require('../models/donations').donations;
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');
var Stripe_connect = process.env.STRIPE_TEST_SECRET
var stripe = require("stripe")(Stripe_connect);

//testing tokenization!!!
var testToken;
stripe.tokens.create({
  card: {
   "number": '4242424242424242',
   "exp_month": 12,
   "exp_year": 2018,
   "cvc": '123'
 }
}, function(err, token) {
  if(err) console.log(err);
  testToken = token
})
// stripe.tokens.create({
//   card: {
//    "number": '4242424242424242',
//    "exp_month": 12,
//    "exp_year": 2018,
//    "cvc": '123'
//  }
// }, function(err, token) {
//   console.log('token',token)
//   if(err) console.log(err)
//   stripe.customers.create({
//     description: 'Customer for testcust@testing.com',
//     source: token.id
//   }, function(error, customer){
//     console.log('customer', customer);
//     if(error) console.log(error)
//     stripe.charges.create({
//   amount: 20000,
//   currency: "usd",
//   customer : customer.id, // obtained with Stripe.js
//   description: "Charge for testcust@testing.com"
// }, function(err, charge) {
//   console.log('charge', charge);
//   if(err) console.log(err);
//   // asynchronously called
// });
//   })
// })

router.get('/', function(req,res,next){
  console.log('hello world');
  res.render('register')
});

router.get('/register', function(req,res){
  res.json('register')
});

router.post('/api/users/register', function(req,res){
  var user = new User({
    name : req.body.fname,
    lname : req.body.lname,
    email :  req.body.email,
    password : req.body.password,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address
  })
  user.save(function(err,user){
    if(err){
      console.log('cant save')
      res.status(500).json(err);

    }else{
      stripe.customers.create({
        description: 'Customer for ' + user.email,
        email: user.email
      }, function(err, customer){
        if(err)console.log(err);
        console.log(customer);
        user.update({stripe: {customerID: customer.id}},{w:1}).exec().catch((err)=> console.log(err))
      res.json({user:user});
    })
  }
});
})

router.post('/api/users/login',function(req,res){
  User.findOne({email:req.body.email, password: req.body.password}, function(err,user){
    if(err) console.log(err);
    if(user){
      console.log(user)
        user.tokenize(function(token, updated){
          console.log(user)
          console.log('token saved', updated)
          res.json(token);
        })
    }else if(!user){
      console.log('user not found')
    }

  })
})
//to addcreditCard pass creditToken and authToken
router.post('/api/users/addcreditcard',function(req,res){
  console.log('cardstuff',req.body))
    console.log('req.body.authToken',req.body.authToken)
    User.findOne({authToken:req.body.authToken},function(err,user){
      if(err) console.log(err);
      if(user){
        console.log('user found')
        stripe.customers.update(user.stripe.customerID, {
          //source: req.body.creditToken
          source: testToken.id
        }, function(err, customer){
          if(err) console.log(err)
          if(customer) res.send('Customer created')
        })
      }else if(!user){
        console.log('user not found')
      }
    })
})
// To charge a card pass authToken, foundation, and amount
router.post('/api/users/chargeCard',function(req,res){
    User.findOne({authToken:req.body.authToken},function(err,user){
      if(err) console.log(err);
      if(user){
        Foundation.findOne({name: req.body.foundation})
      }else if(!user){
        console.log('user not found')
      }
    })
})

router.post('/api/foundations/register', function(req,res){
  var foundation = new Foundation({
    name : req.body.name,
    email :  req.body.email,
    password : req.body.password,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address
  })
  foundation.save(function(err,foundation){
    if(err){
      console.log('cant save')
      res.status(500).json(err);

    }else{
      stripe.accounts.create({
        description: 'Customer for ' + user.email,
        email: user.email
      }, function(err, customer){
        if(err)console.log(err);
        console.log(customer);
        foundation.update({stripe: {customerID: customer.id}},{w:1}).exec().catch((err)=> console.log(err))
      res.json({foundation});
    })
  }
});
})



// router.get('/')

module.exports = router;
