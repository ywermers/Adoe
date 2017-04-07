var express = require('express');
var router = express.Router();
var hashPassword = require('../hashPassword');
var Foundation = require('../models/foundation');
var User = require('../models/user');

module.exports = function(passport) {

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
    var foundation = new Foundation({
      name : req.body.name,
      email :  req.body.email,
      password : req.body.password,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address
    })
    foundation.save()
    .then((x)=>{
      console.log(x)
      res.redirect('/api/foundations/login')
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  });

  return router
}
