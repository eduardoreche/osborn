var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'open', 
        'closed', 
        'prospect'
        ]);
});

module.exports = router;