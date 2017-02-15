var express = require('express');
var router = express.Router();

router.use('/allocations', require('./transactions'));
router.use('/projects', require('./transactions'));
router.use('/resources', require('./transactions'));
router.use('/users', require('./transactions'));

module.exports = router;