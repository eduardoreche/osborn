var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Nome de usuário incorreto.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Senha incorreta.'
        });
      }

      return done(null, user);
    });
  }
));