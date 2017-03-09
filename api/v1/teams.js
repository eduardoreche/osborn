var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json([
        {name: 'Portal', color: '#3bade3'},
        {name: 'PEGA', color: '#178587'},
        {name: 'Sustentação', color: '#c5e1f0'},
        {name: 'BARE', color: '#e20c24'},
        {name: 'Pool Java', color: '#fee555'}
        ]);
});

module.exports = router;