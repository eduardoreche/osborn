var express = require('express');
var router = express.Router();
var Risk = require('../../../models/risk');

router.get('/', function(req, res, next) {
  Risk.find(function(err, risks) {
    if (err) res.send(err);
    res.json(risks);
  });
});

router.get('/:id', function(req, res, next) {
  Risk.findById(req.params.id)
    .exec((err, risk) => {
      if (err) res.send(err);
      res.json(risk);
    })
});

router.post('/', function(req, res, next) {
  risk = new Risk({
    cause:        req.body.cause,
    effect:       req.body.effect,
    probability:  req.body.probability, 
    impact:       req.body.impact,
    action:       req.body.action,
    response:     req.body.response,
    project:      req.body.project
  });
  console.log(req.body);
  risk.save((err, data) => {
    if (err) res.send(err);
    res.json({ messsage: 'Risk saved successfully!' });
  });
});

router.put('/:id', (req, res, next) => {
  Risk.findById(req.params.id, (err, risk) => {
    if (err) res.send(err);

    risk.cause        = req.body.cause || risk.cause;
    risk.effect       = req.body.effect || risk.effect;
    risk.probability  = req.body.probability || risk.probability;
    risk.impact       = req.body.impact || risk.impact;
    risk.action       = req.body.action || risk.action;
    risk.response     = req.body.response || risk.response;
    risk.project      = req.body.project || risk.project;

    risk.save((err) => {
      if (err) res.send(err);

      res.json({message: 'Risk updated successfuly!'});
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Risk.findById(req.params.id, (err, risk) => {
    if (err) res.send(err);

    risk.remove((err, date) => {
      if (err) res.send(err);

      res.json({message: 'Risk removed successfully!'});
    });
  });
});

module.exports = router;
