var express = require('express');
var router = express.Router();
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');

var qs = require('querystring');
var request = require('request');

var SparkPost = require('sparkpost');
var client = new SparkPost();

client.transmissions.send({
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Hello, World!',
      html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
    },
    recipients: [
      {address: 'mathewson17@live.ca'}
    ]
  })
  .then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

router.use(function(req, res, next){
  if(!req.user) {
    res.redirect('/api/foundations/login');
  }else{
    return next();
  }
});

router.get('/api/foundations/main', function(req, res) {
  res.render('index');
})



router.post('/api/foundations/updateDescription', function(req, res){
  Foundation.findOneAndUpdate({_id: req.session.passport.user},
    {description: req.body.description})
    .then((updated) =>{
      res.send('updated');
    }).catch((err) => {
      res.status(500).json(err);
    });
  });


router.post('/api/foundations/subscribedEmails', function(req, res){


});

router.post('/api/foundations/sendEmail', function(req, res) {
  console.log('foundation', req.session.passport)
  // var data = {
  //   from: req.session.passport.user
  // }
  // mailgun.messages().send()
  //
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
