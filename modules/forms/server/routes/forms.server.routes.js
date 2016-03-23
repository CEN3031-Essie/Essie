'use strict';

/**
 * Module dependencies
 */
var formsPolicy = require('../policies/forms.server.policy'),
  PhDCommitteeforms = require('../controllers/PhDCommitteeforms.server.controller');

module.exports = function (app) {
  // GForms collection routes
  app.route('/api/forms').all(formsPolicy.isAllowed)
    //.get(PhDCommitteeforms.list)
    .post(PhDCommitteeforms.create);

  // Single gform routes
  app.route('/api/forms/:formId').all(formsPolicy.isAllowed)
    .get(PhDCommitteeforms.read)
    .put(PhDCommitteeforms.update)
    .delete(PhDCommitteeforms.delete);

  // Finish by binding the gform middleware
  app.param('formId', PhDCommitteeforms.formByID);
};
