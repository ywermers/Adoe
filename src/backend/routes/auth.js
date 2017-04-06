var express = require('express');
var router = express.Router();
var hashPassword = require('../hashPassword');
var Foundation = require('../models/foundation');
var User = require('../models/user');

module.exports = function(passport) {

  router.get('/api/foundation/login', function(req,res){
    res.render('login');
  });

  router.post('/api/foundation/login', passport.authenticate('local'), function(req,res){
    res.redirect('/api/foundation');
  });

  router.get('/api/foundation/logout', function(req, res){
    req.logout();
    res.redirect('/login');
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
      res.redirect('/api/login')
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  });

  return router
}
