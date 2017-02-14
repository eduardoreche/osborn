var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'Portal', 
        'PEGA', 
        'Sustentação',
        'BARE',
        'Pool Java'
        ]);
});

module.exports = router;