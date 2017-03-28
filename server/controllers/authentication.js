const jwt = require('jsonwebtoken');
const config = require('../config/main');
const crypto = require('crypto');
const User = require('../models/user');

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 //in seconds
  })
}

function setUserInfo(request) {
  return {
    _id: request._id, 
    firstName: request.profile.firstName, 
    lastName: request.profile.lastName, 
    email: request.email, 
    role: request.role
  }
}

exports.login = function(req, res, next) {
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  })
}

exports.register = function(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName; 
  const lastName = req.body.lastName;
  const password = req.body.password;

  if(!email)
    return res.status(422).send({ error: 'You must enter an email address.' });

  if(!firstName || !lastName)
    return res.status(422).send({ error: 'You must enter your full name address.' });

  if(!password)
    return res.status(422).send({ error: 'You must enter a password.' });


  User.findOne({ email: email }, (err, existingUser) => {
    if(err) { return next(err) }

    if(existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    let user = new User({
      email: email, 
      password: password, 
      profile: { firstName: firstName, lastName: lastName }
    });

    user.save((err, user) => {
      if(err) { return next(err) }

      let userInfo = setUserInfo(user);
      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      })
    })
  })
}

exports.roleAuthorization = function(role) {
  return (req, rest, next) => {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if(err) {
        res.status(422).json({ error: 'No user was found' });
        return next(err);
      }

      if(foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}