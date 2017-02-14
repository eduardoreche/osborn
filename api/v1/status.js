var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'Oportunidade', 
        'Pré-Venda', 
        'Em Andamento',
        'Garantia',
        'Encerrado',
        'Cancelado'
        ]);
});

module.exports = router;