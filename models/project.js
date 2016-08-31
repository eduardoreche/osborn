var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String, 
    description: String, 
    code: String, 
    start_date: Date, 
    end_date: Date
});

module.exports = mongoose.model('Project', ProjectSchema);