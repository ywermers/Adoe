var express = require('express');
var router = express.Router();
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');

var qs = require('querystring');
var request = require('request');

var SparkPost = require('sparkpost');
var sparky = new SparkPost(); // uses process.env.SPARKPOST_API_KEY

// Fix the foundation oauth return

router.use(function(req, res, next){
  if(!req.user) {
    res.redirect('/api/foundations/login');
  }else{
    return next();
  }
});


router.post('/api/foundations/composeEmail', function(req, res) {
  var foundation
  console.log('trying to send an email')
 Foundation.findOne({_id: req.session.passport.user})
 .then(tmpFoundation => {
   foundation = tmpFoundation;
   console.log('foundation', foundation);
   console.log('foundation emails length', foundation.subscribedEmails.length)
   if(!foundation) throw new Error('Couldn\'t find the foundation');
    else if(!foundation.subscribedEmails.length) throw new Error('no users subscirbed to your foundation');
   else {
     return foundation.subscribedEmails.map((email) => {
     console.log('map emails', email)
     return {address: email}
   })
 }
 })
 .then(emails => {
   console.log('mapped emails', emails)
   return sparky.transmissions.send({
     options: {
       sandbox: true
     },
     content: {
       from: foundation.email + process.env.SPARKPOST_SANDBOX_DOMAIN,
       subject: req.body.subject ? req.body.subject : ' ',
       html: '<html><body><p>Testing SparkPost - the world\'s best email service,</p></body></html>'
     },
     recipients: emails
   })

 }).then(data => {
   console.log('EMAIL SENT');
   console.log(data);
   res.status(200).json({success: true});
 }).catch(err => {
   console.log('caught', err);
   res.status(400).json({success: false, message: err.message});
 })

});

router.get('/api/foundations/main', function(req, res) {
  res.render('index');
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
