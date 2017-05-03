var express = require('express');
var router = express.Router();
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');
var path=require('path')
var stripe = require("stripe")(process.env.STRIPE_TEST_SECRET)

var qs = require('querystring');
var request = require('request');


// Fix the foundation oauth return

router.use(function(req, res, next){
  if(!req.user) {
    res.redirect('/api/foundations/login');
  }else{
    return next();
  }
});

router.get('/api/foundations/main', function(req, res) {
res.sendFile(path.join(__dirname, '../../../public/index.html'))
})



router.get('/api/foundations/donations',function(req,res) {
  console.log('hit')
  Foundation.findOne({_id:req.session.passport.user})
  .then((foundation)=> {
    return Donation.find({foundationId:foundation._id})
    .then((donations)=> {
      res.json(donations)

    })
  })
  .catch((err)=>{
    console.log('error getting donations')
    res.json(err)
  })
})




router.post('/api/foundations/updateName', function(req, res, next){
  Foundation.findOneAndUpdate({_id: req.session.passport.user},
    {name: req.body.name})
    .then((updated) =>{
    console.log('updated name sucessfully no thank to dereeck bc we was AFK');
    res.json('updated name :)')
    }).catch((err) => {
      res.status(500).json(err);
    })
  })


router.post('/api/foundations/updateEmail', function(req, res, next){
  Foundation.findOneAndUpdate({_id: req.session.passport.user},
    {email: req.body.email})
    .then((updated) =>{
    console.log('updated name sucessfully no thank to dereeck bc we was AFK');
    res.json('updated email :)')
    }).catch((err) => {
      res.status(500).json(err);
    })
  })
  router.post('/api/foundations/updateDescription', function(req, res, next){
    Foundation.findOneAndUpdate({_id: req.session.passport.user},
      {description: req.body.description})
      .then((updated) =>{
      console.log('updated name sucessfully no thank to dereeck bc we was AFK');
      res.json('updated name :)')
      }).catch((err) => {
        res.status(500).json(err);
      })
    })


    router.post('/api/foundations/updateAddress', function(req, res, next){
      console.log('hot')
      console.log(req.body)
      Foundation.findOneAndUpdate({_id: req.session.passport.user},
        {streetAddress: req.body.streetAddress,
        city:req.body.city,
        ustate:req.body.state,
        country:req.body.country,
        zipCode:req.body.zip
        })
        .then((updated) =>{
        res.json('updated address :)')
        }).catch((err) => {
          res.status(500).json(err);
        })
      })

  router.get('/api/foundations/userdata',function(req,res) {
        Foundation.findOne({_id:req.session.passport.user}, function(err,user) {
          if(user) {
          res.json(user)
        } else {
          res.json('error',err)
        }
  })
})




router.get('/api/foundations/api/oauth',function(req,res) {
            res.redirect('https://connect.stripe.com/oauth/authorize' + '?' + qs.stringify({
           response_type: 'code',
           scope: 'read_write',
           client_id: process.env.CLIENT_ID,
           redirect_uri: 'https://polar-sands-99108.herokuapp.com/api/foundations/oauth/callback'
          }));

  });

  router.get("/api/foundations/oauth/callback", function(req, res) {
    console.log('hit')
  var code = req.query.code;
  //Make /oauth/token endpoint POST request
  request.post({
    url: 'https://connect.stripe.com/oauth/token',
    form: {
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      code: code,
      client_secret: process.env.STRIPE_TEST_SECRET
    }
  }, function(err, r, body) {
    console.log(body);
    var body = JSON.parse(body);
    Foundation.findOneAndUpdate({_id: req.session.passport.user},
      {stripeAccessToken: body.access_token,
       stripeRefreshToken: body.refresh_token,
       stripeUserId: body.stripe_user_id,
       stripePublishable: body.stripe_publishable_key})
    .then((updated) =>{
      console.log('updtaed');
      res.render('index')
    }).catch((err) => {
      res.status(500).json(err);
    })
  })



  });


module.exports = router;
