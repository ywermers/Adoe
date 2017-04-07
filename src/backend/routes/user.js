var express = require('express');
var router = express.Router();
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');

var stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);
var qs = require('querystring')
var request = require('request');
var hbs=require('express-handlebars')


router.post('/api/users/addcreditcard',function(req,res){
    console.log('req.body.authToken',req.body.authToken)

    // User.findOne({authToken:req.body.authToken})
    // .then(function(user){
    //
    // })

    User.findOne({authToken:req.body.authToken},function(err,user){
      if(err) console.log(err);
      if(user){
        console.log('user found')
        stripe.tokens.create({
          card: {
           "number": req.body.number,
           "exp_month": req.body.month,
           "exp_year": req.body.year,
           "cvc": req.body.cvc
         }
        }, function(err, token) {
          stripe.customers.update(user.stripe.customerID, {
            source: token
          }, function(err, customer){
            if(err) console.log(err)
            if(customer) res.send('Customer updated')
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
    streetAddressaddress: req.body.streetAddress,
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
//to addcreditCard pass creditToken and authToken
router.post('/api/users/addcreditcard',function(req,res){
  console.log('cardstuff',req.body)
    console.log('req.body.authToken',req.body.authToken)
    User.findOne({authToken:req.body.authToken},function(err,user){
      if(err) console.log(err);
      if(user){
        console.log('user found')
        stripe.tokens.create({
          card: {
           "number": req.body.number,
           "exp_month": req.body.month,
           "exp_year": req.body.year,
           "cvc": req.body.cvc
         }
        }, function(err, token) {
          stripe.customers.update(user.stripe.customerID, {
            source: token
          }, function(err, customer){
            if(err) console.log(err)
            if(customer) res.json(success: true)
          });
        });
      }else if(!user){
        console.log('user not found')
      }
    })
})
// To charge a card pass authToken, foundation, and amount
// router.post('/api/users/chargeCard',function(req,res){
//     User.findOne({authToken:req.body.authToken},function(err,user){
//       if(err) console.log(err);
//       if(user){
//         Foundation.findOne({name: req.body.foundation})
//       }else if(!user){
//         console.log('user not found')
//       }
//     })
// })

// router.post('/api/foundations/register', function(req,res){
//   var foundation = new Foundation({
//     name : req.body.name,
//     email :  req.body.email,
//     password : req.body.password,
//     phoneNumber: req.body.phoneNumber,
//     address: req.body.address
//   })
//   foundation.save()
//   .then((x)=>{
//     res.redirect('/api/login')
//   })
//   .catch((err) => {
//     res.status(500).json(err)
//   })
// });

// router.get('/api/oauth',function(req,res) {
//             res.redirect('https://connect.stripe.com/oauth/authorize' + '?' + qs.stringify({
//            response_type: 'code',
//            scope: 'read_write',
//            client_id: 'ca_APkxSKVv2vo9ENiaN0MGfrtR0jcd4qUB',
//            redirect_uri: 'http://localhost:3001/oauth/callback'
//           }));
//
//   });
//
//   router.get("/oauth/callback", function(req, res) {
//   var code = req.query.code;
//
//   //Make /oauth/token endpoint POST request
//   request.post({
//     url: 'https://connect.stripe.com/oauth/token',
//     form: {
//       grant_type: "authorization_code",
//       client_id: 'ca_APkxSKVv2vo9ENiaN0MGfrtR0jcd4qUB',
//       code: code,
//       client_secret: 'sk_test_l8cpzxuRnceflUsfthcojqSs'
//     }
//   }, function(err, r, body) {
//
//     var accessToken = JSON.parse(body).access_token;
//
//     // Do something with your accessToken
//     // For demo"s sake, output in response:
//     res.send({ "Your Token": accessToken });
//
//   });
//});







module.exports = router;
