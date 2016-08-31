var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name: String,
    code: String, 
    position: String,  
    active: Boolean
});

module.exports = mongoose.model('Resource', ResourceSchema);