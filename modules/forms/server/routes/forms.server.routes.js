'use strict';

/**
 * Module dependencies
 */
var formsPolicy = require('../policies/forms.server.policy'),
  forms = require('../controllers/forms.server.controller');

module.exports = function (app) {
  // GForms collection routes
  app.route('/api/approvers')
    .get(forms.listApprover);

  app.route('/api/forms').all(formsPolicy.isAllowed)
    .get(forms.list)
    .post(forms.create);


  //app.route('/api/approvers')
  // Single gform routes
  app.route('/api/forms/:formId').all(formsPolicy.isAllowed)
    .get(forms.read)
    //.put(forms.update)
    .delete(forms.delete);

  // Finish by binding the form middleware
  app.param('formId', forms.formByID);
};
