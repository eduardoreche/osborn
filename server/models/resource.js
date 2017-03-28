var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name: String,
    code: String, 
    position: String,  
    active: Boolean,
    leader: {type: Schema.Types.ObjectId, ref: 'Resource'},
    team: {type: Schema.Types.ObjectId, ref: 'Team'}
});

ResourceSchema.virtual('allocations', {
    ref: 'Allocation',
    localField: '_id',
    foreignField: 'resource'
});

ResourceSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Resource', ResourceSchema);