var express = require('express');
var router = express.Router();

var impact = [
  { desc: 'High', value: 3 },
  { desc: 'Medium', value: 2},
  { desc: 'Low', value: 1 }
];

router.get('/', (req, res) => {
  res.json(impact);
});

router.get('/:desc', (req, res) => {
  res.json(status.filter(i => {
      return i.desc === req.params.desc;
    })[0]
  );
});

module.exports = router;