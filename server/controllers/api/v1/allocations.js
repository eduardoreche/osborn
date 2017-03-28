var express = require('express');
var router = express.Router();
var Allocation = require('../../../models/allocation');

router.get('/', (req, res, next) => {    
  Allocation.find( (err, allocations) => {
    if (err) {
      res.send(err);
    }
      
    res.json(allocations);    
  });
});

router.post('/', (req, res, next) => { 
  allocation = new Allocation({
    resource_id:  req.body.resource_id, 
    resource:     req.body.resource,
    project_id:   req.body.project_id,
    project:      req.body.project, 
    start_date:   req.body.start_date, 
    end_date:     req.body.end_date,
    hours:        req.body.hours
  });
  
  allocation.save((err, data) => {
    if (err)
        res.send(err);

    res.json({message: 'Allocation saved successfuly!'});
  });
});

router.get('/byResource/:id', (req, res, next) => {
  Allocation.find(
    {
      resource_id: req.params.id
    }, 
    (err, allocations) => {
      if (err)
        res.send(err);

      res.json(allocations);
    });
});

router.put('/:id', (req, res, next) => {
  Allocation.findById(req.params.id, (err, allocation) => {
    if (err)
      res.send(err);

    allocation.start_date = req.body.start_date || allocation.start_date;
    allocation.end_date   = req.body.end_date || allocation.end_date;
    allocation.hours      = req.body.hours || allocation.hours;

    allocation.save((err) => {
      if (err)
        res.send(err);
      
      res.json({message: 'Allocation updated successfuly!'});
    });
  })
});

router.delete('/:id', (req, res, next) => {
  Allocation.findById(req.params.id, (err, allocation) => {
    if (err)
      res.send(err);

    allocation.remove((err, data) => {
      if (err)
        res.send(err);
      
      res.json({message: 'Allocation removed successfuly!'});
    });
  });
});

module.exports = router;