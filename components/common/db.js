var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/osborn';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose conectado em ' + dbURI);
});