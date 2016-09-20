var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

router.delete('/sign_out', function(req, res, next) {
  res.json({success: true});
});

router.post('/', function(req, res, next) {
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user || user.password != req.body.password) {
      res.status(403).json({ success: false, message: 'Authentication failed.' });
    } else {
      // if user is found and password is right
      // create a token
      var token = jwt.sign(user, config.secret, {
        expiresIn: 60*24 // expires in 24 hours
      });

      // return the information including token as JSON
      res.json({
        success: true,
        user: {
          name: user.name, 
          email: user.email
        },
        message: 'Enjoy your token!',
        token: token
      });

    }
  })

});

module.exports = router;