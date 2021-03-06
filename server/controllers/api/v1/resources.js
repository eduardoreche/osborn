var express = require('express');
var router = express.Router();
var Resource = require('../../../models/resource');

router.get('/', function(req, res, next) {
    
    Resource.find(function(err, resources){
      if(err) res.send(err);
      
      res.json(resources);    
    });
    
})

router.get('/:id', function(req, res, next){
  Resource.findById(req.params.id)
    .populate({
      path: 'allocations',
      populate: {
        path: 'project',
        select: '_id nickname start_date end_date'
      }
    })
    .exec( (err, resource) => {
      if(err) 
        res.send(err);

      res.json(resource);
  });
})

router.post('/', function(req, res, next){ 
  resource = new Resource({
      name: req.body.name, 
      code: req.body.code, 
      position: req.body.position,
      active: req.body.active,
      leader: req.body.leader,
      team: req.body.team
    });
  
  resource.save(function(err, data) {
    if(err) res.send(err);

    res.json({message: 'Resource saved successfuly!'});
  });
})

router.put('/:id', function(req, res, next) {
  Resource.findById(req.params.id, function(err, resource) {
    if(err) res.send(err);

    resource.name = req.body.name || resource.name;
    resource.code = req.body.code || resource.code;
    resource.position = req.body.position || resource.position;
    resource.active = req.body.active || resource.active;
    resource.leader = req.body.leader || resource.leader;
    resource.team = req.body.team || resource.team;

    resource.save(function(err) {
      if(err) res.send(err);
      
      res.json({message: 'Resource updated successfuly!'});
    });
  })
})

router.delete('/:id', function(req, res, next) {
  Resource.findById(req.params.id, function(err, resource) {
    if(err) res.send(err);

    resource.remove(function(err, data) {

      if(err) res.send(err);
      
      res.json({message: 'Resource removed successfuly!'});

    });
  });

})

module.exports = router;