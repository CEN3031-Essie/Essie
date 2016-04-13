(function () {
  'use strict';

  angular
        .module('forms')
        .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Forms',
      state: 'forms',
      type: 'dropdown',
      roles: ['*']
    });

  // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'forms', {
      title: 'List Forms',
      state: 'forms.list'
    });
  }
})();
