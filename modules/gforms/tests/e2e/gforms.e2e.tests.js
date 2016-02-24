'use strict';

describe('GForms E2E Tests:', function () {
  describe('Test gforms page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/gforms');
      expect(element.all(by.repeater('gform in gforms')).count()).toEqual(0);
    });
  });
});
