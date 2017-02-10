const express = require('express');
const router = express.Router();
const _ = require('lodash');
const model = require('../../models/generic-model');

router.get('/', (req, res, next) => {

  let modelName = _getCollectionFromUrl(req.originalUrl);

  model.all(modelName);
  
  res.json({"status": "ok"});

});

const _getCollectionFromUrl = (url)=> {
  let model = _.replace(url, '/api/v2/', '');
  model = _.replace(model, '/', '');

  return model;
}

module.exports = router;