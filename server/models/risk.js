var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RiskSchema = new Schema({
  cause: String,
  effect: String,
  probability: String,
  impact: String,
  action: String,
  response: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

RiskSchema.set('toJSON', { getters: true});

module.exports = mongoose.model('Risk', RiskSchema);