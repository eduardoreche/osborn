var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'Alocação', 
        'Consultoria', 
        'Desenvolvimento',
        'Estudo preliminar',
        'Sustentação'
        ]);
});

module.exports = router;