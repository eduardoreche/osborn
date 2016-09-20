var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String, 
    description: String, 
    code: String, 
    start_date: Date, 
    end_date: Date
});

ProjectSchema.virtual('allocations', {
    ref: 'Allocation',
    localField: '_id',
    foreignField: 'project'
});

ProjectSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Project', ProjectSchema);