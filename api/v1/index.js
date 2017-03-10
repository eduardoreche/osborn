//TODO REMOVE IT FROM HERE
const OSBORN_SECRET = 'complicadopraxuxu';

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: OSBORN_SECRET,
  userProperty: 'payload'
});

/*
var jwt = require('jsonwebtoken');
var config = require('../../config');


var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_KEY, 'base64'),
  audience: '3u4JGQPmEi90kjHpxH10W62mwX2V9SJ2'  
});
*/

// route midleware to verify a token
//router.use(jwtCheck);

router.use('/v1/allocations', require('./allocations'));
router.use('/v1/projects', require('./projects'));
router.use('/v1/resources', require('./resources'));
router.use('/v1/users', require('./users'));
router.use('/v1/auth', require('./authentication'));

module.exports = router;