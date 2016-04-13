(function (app) {
  'use strict';

  app.registerModule('forms');
  app.registerModule('forms.services');
  app.registerModule('forms.routes', ['ui.router', 'forms.services']);
})(ApplicationConfiguration);
