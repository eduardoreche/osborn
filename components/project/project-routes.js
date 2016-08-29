var express = require('express');
var router = express.Router();
var Project = require(__dirname +'/project-model');

router.get('/', function(req, res, next) {
    var projects = [];

    Project.find(function(err, result){
      if(err) return console.log(err);
      
      res.render(__dirname + '/projects', {
        title: 'Projects',
        projects: result 
      });  
    });
    
})

router.post('/save', function(req, res, next) {
  var project = new Project({name: req.body.name, code: req.body.code, start_date: req.body.start_date, end_date: req.body.end_date});
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
  Project.find({id: req.params.id}, function(err, result){
    project = result;

    res.render(__dirname +'/project-form', {
      project: project
    })
  })
})

module.exports = router;