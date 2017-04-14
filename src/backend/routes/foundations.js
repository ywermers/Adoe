var express = require('express');
var router = express.Router();
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');

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

router.get('/api/foundations/home', function(req, res, next){
  Foundation.findOne({_id:req.session.passport.user})
  .then((foundation)=> {
    if(!foundation.stripeUserId) {
      res.render('home',{name:req.user.name,foundation:'you need to sing up with stripe!!!'});
    }
    else {
      res.render('home',{name:req.user.name});
    }
  })

});

router.post('/api/foundations/updateDescription', function(req, res, next){
  Foundation.findOneAndUpdate({_id: req.session.passport.user},
    {description: req.body.description})
    .then((updated) =>{
      res.send('updated');
    }).catch((err) => {
      res.status(500).json(err);
    })
  })



router.get('/api/foundations/account', function(req, res, next){
  console.log(req.user)
    res.render('account',{name:req.user.name,email:req.user.email,description:req.user.description});
});

router.get('/api/foundations/api/oauth',function(req,res) {
            res.redirect('https://connect.stripe.com/oauth/authorize' + '?' + qs.stringify({
           response_type: 'code',
           scope: 'read_write',
           client_id: process.env.CLIENT_ID,
           redirect_uri: 'https://polar-sands-99108.herokuapp.com/api/foundations/oauth/callback'
          }));

  });

  router.get("/api/foundations/oauth/callback", function(req, res) {
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
      console.log('updtaed')
    }).catch((err) => {
      res.status(500).json(err);
    })
  })



  });


module.exports = router;
