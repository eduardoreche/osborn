var mongoose  = require('mongoose');
var crypto    = require('crypto');
var jwt       = require('jsonwebtoken');

const OSBORN_SECRET = 'complicadopraxuxu';

var userSchema = new mongoose.Schema({
  emai: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');;
  return this.hash === hash;
}

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, OSBORN_SECRET);
}

module.exports = mongoose.model('User', userSchema);