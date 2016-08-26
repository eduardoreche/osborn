var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String, 
    description: String, 
    SCO: String, 
    startDate: Date, 
    endDate: Date
});

module.exports = mongoose.model('Project', ProjectSchema);