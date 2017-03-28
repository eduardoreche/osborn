var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'JR Software Analyst', 
        'Software Analyst', 
        'SR Software Analyst', 
        'Consultant Specialist', 
        'SR Consultant Specialist',
        'Team Leader', 
        'Project Leader']);
});

module.exports = router;