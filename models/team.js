var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    color: String
});

module.exports = mongoose.model('Team', TeamSchema);