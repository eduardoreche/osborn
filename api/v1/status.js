var express = require('express');
var router = express.Router();

var status = [
    {step: 1, desc: 'Oportunidade', icon: 'bullhorn', active: false, former: false}, 
    {step: 2, desc: 'Pré-venda', icon: 'tasks', active: false, former: false},
    {step: 3, desc: 'Em andamento', icon: 'road', active: false, former: false},
    {step: 4, desc: 'Garantia', icon: 'wrench', active: false, former: false},
    {step: 5, desc: 'Encerrada', icon: 'sunglasses', active: false, former: false},
    {step: 6, desc: 'Cancelada', icon: 'thumbs-down', active: false, former: false}
]

router.get('/', (req, res) => {
    res.json(status);
});

router.get('/:desc', (req, res) => {
    res.json(status.filter(function (s) {
            return s.desc === req.params.desc;
        })[0]
    );
});

module.exports = router;