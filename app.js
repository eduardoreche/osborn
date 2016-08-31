var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./api/v1/db.js');

var projectRoutes = require('./api/v1/projects');
var resourceRoutes = require('./api/v1/resources');

var app = express(); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/resources', resourceRoutes);

app.get('*', function(req, res) {
  res.sendfile('./public/js/app/index.html'); // load our public/index.html file
});

app.locals.moment = require('moment')

module.exports = app;
