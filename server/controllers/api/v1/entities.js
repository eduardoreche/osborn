var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'Bradesco Seguros', 
        'Bradesco Saúde', 
        'Bradesco Corretora', 
        'Bradesco Vida e Previdência',
        'Banco Bradesco',
        'BARE', 
        'Shopping de Seguros'
        ]);
});

module.exports = router;