var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'Bradesco Seguros', 
        'Bradesco Corretora', 
        'Banco Bradesco'
        ]);
});

module.exports = router;