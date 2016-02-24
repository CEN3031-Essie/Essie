'use strict';

/**
 * Module dependencies
 */
var gformsPolicy = require('../policies/gforms.server.policy'),
  gforms = require('../controllers/gforms.server.controller');

module.exports = function (app) {
  // GForms collection routes
  app.route('/api/gforms').all(gformsPolicy.isAllowed)
    .get(gforms.list)
    .post(gforms.create); 

  // Single gform routes
  app.route('/api/gforms/:gformId').all(gformsPolicy.isAllowed)
    .get(gforms.read)
    .put(gforms.update)
    .delete(gforms.delete);

  // Finish by binding the gform middleware
  app.param('gformId', gforms.gformByID);
};
