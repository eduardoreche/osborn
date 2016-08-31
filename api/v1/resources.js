var express = require('express');
var router = express.Router();
var Resource = require('../../models/resource');

router.get('/', function(req, res, next) {
    
    Resource.find(function(err, resources){
      if(err) res.send(err);
      
      res.json(resources);    
    });
    
})

router.get('/:id', function(req, res, next){
  Resource.findById(req.params.id, function(err, resource){
    if(err) res.send(err);

    res.json(resource);
  })
})

router.post('/', function(req, res, next){ 
  resource = new Resource({
      name: req.body.name, 
      code: req.body.code, 
      position: req.body.position,
      actinve: req.body.active
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