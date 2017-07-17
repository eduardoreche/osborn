const AuthenticationController = require('./controllers/authentication');
const express = require('express');
const passportService = require('./config/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const v1Routes = express.Router();

  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  apiRoutes.use('/v1', v1Routes);
  v1Routes.use('/allocations', /* requireAuth, */ require('./controllers/api/v1/allocations'));
  v1Routes.use('/projects', /* requireAuth, */ require('./controllers/api/v1/projects'));
  v1Routes.use('/resources', /* requireAuth, */ require('./controllers/api/v1/resources'));
  v1Routes.use('/users', /* requireAuth, */ require('./controllers/api/v1/users'));
  v1Routes.use('/positions', /* requireAuth, */ require('./controllers/api/v1/positions'));
  v1Routes.use('/entities', /* requireAuth, */ require('./controllers/api/v1/entities'));
  v1Routes.use('/status', /* requireAuth, */ require('./controllers/api/v1/status'));
  v1Routes.use('/teams', /* requireAuth, */ require('./controllers/api/v1/teams'));
  v1Routes.use('/project-types', /* requireAuth, */ require('./controllers/api/v1/project-types'));
  v1Routes.use('/risks', /* requireAuth, */ require('./controllers/api/v1/risks'));
  v1Routes.use('/impact', /* requireAuth, */ require('./controllers/api/v1/impact'));
  v1Routes.use('/probability', /* requireAuth, */ require('./controllers/api/v1/probability'));

  app.use('/api', apiRoutes);
} 