var express = require('express');
var router = express.Router();
var Project = require('../../models/project');

router.get('/', function(req, res, next) {
    
    Project.find(function(err, projects){
      if(err) res.send(err);
      
      res.json(projects);    
    });
    
})

router.get('/:id', function(req, res, next){
  Project.findById(req.params.id)
    .populate({
      path: 'allocations',
      populate: {
        path: 'resource',
        select: '_id name'
      }
    })
    .exec( (err, project) => {
      if (err)
        res.send(err);
      
      res.json(project);
  });
})

router.post('/', function(req, res, next){ 
  project = new Project({
      name: req.body.name, 
      code: req.body.code,
      description: req.body.description, 
      start_date: req.body.start_date, 
      end_date: req.body.end_date 
    });
  
  project.save(function(err, data) {
    if(err) res.send(err);

    res.json({message: 'Project saved successfuly!'});
  });
})

router.put('/:id', function(req, res, next) {
  Project.findById(req.params.id, function(err, project) {
    if(err) res.send(err);

    project.name = req.body.name || project.name;
    project.code = req.body.code || project.code;
    project.description = req.body.description || project.description;
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

module.exports = router;