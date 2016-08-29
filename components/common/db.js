var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/osborn';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose conectado em ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Erro de conexão Mongoose: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose desconectado');
});