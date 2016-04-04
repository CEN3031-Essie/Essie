(function (app) {
  'use strict';

  app.registerModule('gforms');
  app.registerModule('gforms.services');
  app.registerModule('gforms.routes', ['ui.router', 'gforms.services']);
})(ApplicationConfiguration);
