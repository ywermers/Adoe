var express = require('express');
var router = express.Router();
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');
var qs = require('querystring');

router.use(function(req, res, next){
  if(!req.user) {
    res.redirect('/api/foundations/login');
  }else{
    console.log('foundations API')
    return next();
  }
});

router.get('/api/foundations/stripe', function(req, res){
    console.log('STRIPE');
    res.render('stripe');
})

router.get('/api/foundations/api/oauth',function(req,res) {
            res.redirect('https://connect.stripe.com/oauth/authorize' + '?' + qs.stringify({
           response_type: 'code',
           scope: 'read_write',
           client_id: 'ca_ANcQG5qGEd0c3WX2oN9xoG7Iu1JOaqgo',
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
      client_id: 'ca_ANcQG5qGEd0c3WX2oN9xoG7Iu1JOaqgo',
      code: code,
      client_secret: 'sk_test_5p5XtniGoi1GgZXpOO7hOoHK'
    }
  }, function(err, r, body) {

    var accessToken = JSON.parse(body).access_token;

    // Do something with your accessToken
    // For demo"s sake, output in response:
    res.send({ "Your Token": accessToken });

  });
});


module.exports = router;
