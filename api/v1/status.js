var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'Oportunidade',
        'Pré-venda',
        'Em andamento',
        'Garantia',
        'Encerrada',
        'Cancelada'
        ]);
});

module.exports = router;