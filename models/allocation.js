var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AllocationSchema = new Schema({
    resource: { type: Schema.Types.ObjectId, ref: 'Resource'}, 
    project: { type: Schema.Types.ObjectId, ref: 'Project'},
    start_date: Date, 
    end_date: Date,
    hours: Number
});

module.exports = mongoose.model('Allocation', AllocationSchema);