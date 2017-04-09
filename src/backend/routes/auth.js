var express = require('express');
var router = express.Router();
var hashPassword = require('../hashPassword');
var Donation = require('../models/donations');
var Foundation = require('../models/foundation');
var Fundraiser = require('../models/fundraiser');
var User = require('../models/user');

module.exports = function(passport) {

  router.use(express.static(__dirname + '/public'));

  router.use(function(req, res, next){
    console.log("authenticate")
    next();
  });
  router.get('/api/foundations', function(req,res,next){
    res.render('home.hbs')
  });

  router.get('/api/foundations/login', function(req,res){
    res.render('login');
  });

  router.post('/api/foundations/login', passport.authenticate('local'), function(req,res){
    res.redirect('/api/foundations/stripe');
  });

  router.get('/api/foundations/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });


  router.get('/api/foundations/register', function(req,res){
    res.render('register')
  });

  router.post('/api/foundations/register', function(req,res){
    console.log("REGISTER", req.body)
    var foundation = new Foundation({
      name : req.body.name,
      email :  req.body.email,
      password : req.body.password,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      description: req.body.description
    })
    console.log(foundation)
    foundation.save()
    .then((x)=>{
      console.log('foundation saved')
      res.redirect('/api/foundations/login')
    })
    .catch((err) => {
      res.status(500).json(err)
    });
  });

  return router
}
