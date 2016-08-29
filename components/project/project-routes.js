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
  
  if( req.body.id ) {
    _update(req, function(){
      res.redirect('/projects');
    });
  } else {
    _create(req, function(){
      res.redirect('/projects');
    });
  }

  
});

router.get('/new', function(req, res, next) {
  var project = {};

  res.render(__dirname +'/project-form', {
    project: project
  })
})

router.get('/:id', function(req, res, next){
  var project = {};
  
  Project.findById(req.params.id, function(err, project){    

    res.render(__dirname +'/project-form', {
      project: project
    })
  })
})

var _create = function(req, success) {
  project = new Project({
      name: req.body.name, 
      code: req.body.code, 
      start_date: req.body.start_date, 
      end_date: req.body.end_date 
    });
  
  project.save(function(err, data) {
    success();
  });
}

var _update = function(req, success) {
  Project.findById(req.body.id, function(err, project) {
    if (err) throw err;

    project.name = req.body.name;
    project.code = req.body.code;
    project.start_date = req.body.start_date;
    project.end_date = req.body.end_date;

    project.save(function(err) {
      if(err) throw err;
      success();
    })
  });
}

module.exports = router;