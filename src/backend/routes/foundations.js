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

router.get('/api/foundations/stripe', function(req, res, next){
   res.render('stripe');
});

router.get('/api/fondations/home', function(req, res, next){
  res.render('home');
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

    var accessToken = JSON.parse(body).access_token;
    Foundation.findOneAndUpdate({_id: req.session.passport.user},{stripeAccountId: accessToken})
    .then((updated) =>{
      res.render('stripe');
    }).catch((err) => {
      res.status(500).json(err);
    })
  })



  });


module.exports = router;
