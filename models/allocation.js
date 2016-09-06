var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AllocationSchema = new Schema({
    resource_id: String, 
    project_id: String, 
    start_date: Date, 
    end_date: Date,
    hours: Number
});

module.exports = mongoose.model('Allocation', AllocationSchema);