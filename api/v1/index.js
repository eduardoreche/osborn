var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config');

// route midleware to verify a token
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, config.secret, function(err, decoded){
      if(err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(403).send({
      success: false, 
      message: 'No token provided'
    })
  }
});

router.use('/api/v1/projects', require('./projects'));
router.use('/api/v1/resources', require('./resources'));
router.use('/api/v1/users', require('./users'));

module.exports = router;