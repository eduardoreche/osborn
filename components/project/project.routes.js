var express = require('express');
var router = express.Router();
//var Project = require('./components/project/project.model');

router.get('/', function(req, res, next) {

//    projects = Project.find(function(err, projects){
//      if(err)
//        console.log(err);

//      return projects;  
//    });

    res.render(__dirname + '/projects', {
        title: 'Projects',
//        projects: projects 
    });
});

module.exports = router;