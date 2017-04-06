var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  if(!req.foundation) {
    res.redirect('/api/foundation/login');
  }else{
    return next();
  }
});
