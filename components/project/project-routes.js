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
    
});

module.exports = router;