var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

var login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "Todos os campos são obrigatórios."
    });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } 
    else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);
}

router.post('/login', login);

module.exports = router;