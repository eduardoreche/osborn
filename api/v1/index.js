var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config');
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('ubOC4D067ZCGmCfQVGAGitnjABSLhVtAr5mS9VqQW648jc0sHHwTXUkpKTlPolU9', 'base64'),
  audience: 'J5QMYCutU4e4IJruSUMyinX9FscB0kYv'  
});

// route midleware to verify a token
router.use(jwtCheck);

router.use('/v1/allocations', require('./allocations'));
router.use('/v1/projects', require('./projects'));
router.use('/v1/resources', require('./resources'));
router.use('/v1/users', require('./users'));

module.exports = router;