(function () {
  'use strict';

  angular
    .module('gforms')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'GForms',
      state: 'gforms',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'gforms', {
      title: 'List GForms',
      state: 'gforms.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'gforms', {
      title: 'Create GForm',
      state: 'gforms.create',
      roles: ['user']
    });
  }
})();
