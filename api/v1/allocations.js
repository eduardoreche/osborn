var express = require('express');
var router = express.Router();
var Allocation = require('../../models/allocation');

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
    project_id:   req.body.project_id, 
    start_date:   req.body.start_date, 
    end_date:     req.body.end_date,
    hours:        req.body.hours
  });
  
  allocation.save((err, data) => {
    if (err)
        res.send(err);

    res.json({message: 'Allocation saved successfuly!'});
  });
})

/*
router.get('/:id', function(req, res, next){
  Project.findById(req.params.id, function(err, project){
    if(err) res.send(err);

    res.json(project);
  })
})

router.put('/:id', function(req, res, next) {
  Project.findById(req.params.id, function(err, project) {
    if(err) res.send(err);

    project.name = req.body.name || project.name;
    project.code = req.body.code || project.code;
    project.start_date = req.body.start_date || project.start_date;
    project.end_date = req.body.end_date || project.end_date;

    project.save(function(err) {
      if(err) res.send(err);
      
      res.json({message: 'Project updated successfuly!'});
    });
  })
})

router.delete('/:id', function(req, res, next) {
  Project.findById(req.params.id, function(err, project) {
    if(err) res.send(err);

    project.remove(function(err, data) {

      if(err) res.send(err);
      
      res.json({message: 'Project removed successfuly!'});

    });
  });

})

*/
module.exports = router;