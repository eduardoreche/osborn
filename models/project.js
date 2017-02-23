var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    nickname: String, 
    description: String, 
    code: String, 
    status: String,
    entity: String,
    team: String,
    start_date: Date, 
    end_date: Date,
    planned_start_date: Date,
    planned_end_date: Date,
    profiles: [{ profile: String, total: Number}],
    product_owner: String,
    project_leader: String,
    type: String,
    rate: Number,
    hours: Number
});

ProjectSchema.virtual('allocations', {
    ref: 'Allocation',
    localField: '_id',
    foreignField: 'project'
});

ProjectSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Project', ProjectSchema);