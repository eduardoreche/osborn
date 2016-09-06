var express = require('express');
var router = express.Router();
var User = require('../../models/user');

router.get('/', function(req, res, next) {
    
    User.find(function(err, users){
      if(err) res.send(err);
      
      res.json(users);    
    });
    
})

router.get('/:id', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) res.send(err);

    res.json(user);
  })
})

router.post('/', function(req, res, next){ 
  user = new User({
      name: req.body.name, 
      email: req.body.email, 
      password: req.body.password, 
      active: req.body.active
    });
  
  user.save(function(err, data) {
    if(err) res.send(err);

    res.json({message: 'User saved successfuly!'});
  });
})

router.put('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if(err) res.send(err);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.active = req.body.active;

    user.save(function(err) {
      if(err) res.send(err);
      
      res.json({message: 'User updated successfuly!'});
    });
  })
})

router.delete('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if(err) res.send(err);

    user.remove(function(err, data) {

      if(err) res.send(err);
      
      res.json({message: 'User removed successfuly!'});

    });
  });

})

module.exports = router;