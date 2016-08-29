var express = require('express');
var router = express.Router();
var Project = require(__dirname +'/project-model');
mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;

router.get('/', function(req, res, next) {
    var projects = [];

    Project.find(function(err, result){
      if(err) return console.log(err);
      
      res.render(__dirname + '/projects', {
        title: 'Project',
        projects: result 
      });  
    });
    
})

router.post('/save', function(req, res, next) {
  var project = new Project({
    name: req.body.name, 
    code: req.body.code, 
    start_date: req.body.start_date, 
    end_date: req.body.end_date 
  });

  if( req.body.id ) {
    project._id = ObjectId(req.body.id);
  }

  project.save(function(err, data) {
    res.redirect('/projects');
  });
});

router.get('/new', function(req, res, next) {
  var project = {};

  res.render(__dirname +'/project-form', {
    project: project
  })
})

router.get('/:id', function(req, res, next){
  var project = {};
  
  Project.find({"_id": ObjectId(req.params.id)}, function(err, result){
    project = result[0];

    res.render(__dirname +'/project-form', {
      project: project
    })
  })
})

module.exports = router;