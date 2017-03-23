var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name: String,
    code: String, 
    position: String,  
    active: Boolean
});

ResourceSchema.virtual('allocations', {
    ref: 'Allocation',
    localField: '_id',
    foreignField: 'resource'
});

ResourceSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Resource', ResourceSchema);