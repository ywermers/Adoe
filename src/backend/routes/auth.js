var express = require('express');
var router = express.Router();
var hashPassword = require('../hashPassword');
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');
var path=require('path')

// AWS S3 boiler plate information
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

// aws.config.loadFromPath('./config.json');
var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'adoe',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    }
  })
})

module.exports = function(passport) {

  router.use(function(req, res, next){
    console.log("authenticate")
    next();
  });

  router.get('/api/foundations/login', function(req,res){
    res.render('login');
  });



  router.post('/api/foundations/login', passport.authenticate('local'), function(req,res){
    console.log("authenticated correcty");
    res.redirect('/api/foundations/main');
    // res.sendFile('/build/index.html', {root: __dirname});
    // res.sendFile(path.join(__dirname, '../../../public/build/index.html'))
  });

  router.get('/api/foundations/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

  router.post('/api/foundations/register',upload.single('foundationLogo'), function(req,res){
    console.log('body', req.body);
    console.log('file', req.file);
    var password = hashPassword(req.body.password)
    var foundation = new Foundation({
      name : req.body.name,
      email :  req.body.email,
      password : req.body.password,
      phoneNumber: req.body.phoneNumber,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      ustate: req.body.ustate,
      zipCode: req.body.zipCode,
      country: req.body.country,
      description: req.body.description,
      logoURL: req.file ? req.file.location : "https://s3-us-west-1.amazonaws.com/adoe/ghost_person_200x200_v1.png"
    })
    console.log(foundation)
    foundation.save()
    .then((x)=>{
      console.log('foundation saved')
      res.render('login')
    })
    .catch((err) => {
      console.error('err', err);
        if(err.code===11000) {
          res.render("login",{error:'account with this email already exists'})
        }
        else {
      res.status(500).json(err)
    }
    });
  });

  return router
}
