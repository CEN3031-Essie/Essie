(function () {
  'use strict';

  describe('GForms Route Tests', function () {
    // Initialize global variables
    var $scope,
      GFormsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _GFormsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      GFormsService = _GFormsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('gforms');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/gforms');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          GFormsController,
          mockGForm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('gforms.view');
          $templateCache.put('modules/gforms/client/views/view-gform.client.view.html', '');

          // create mock gform
          mockGForm = new GFormsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An GForm about MEAN',
            content: 'MEAN rocks!'
          });

          //Initialize Controller
          GFormsController = $controller('GFormsController as vm', {
            $scope: $scope,
            gformResolve: mockGForm
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:gformId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.gformResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            gformId: 1
          })).toEqual('/gforms/1');
        }));

        it('should attach an gform to the controller scope', function () {
          expect($scope.vm.gform._id).toBe(mockGForm._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/gforms/client/views/view-gform.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          GFormsController,
          mockGForm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('gforms.create');
          $templateCache.put('modules/gforms/client/views/form-gform.client.view.html', '');

          // create mock gform
          mockGForm = new GFormsService();

          //Initialize Controller
          GFormsController = $controller('GFormsController as vm', {
            $scope: $scope,
            gformResolve: mockGForm
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.gformResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/gforms/create');
        }));

        it('should attach an gform to the controller scope', function () {
          expect($scope.vm.gform._id).toBe(mockGForm._id);
          expect($scope.vm.gform._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/gforms/client/views/form-gform.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          GFormsController,
          mockGForm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('gforms.edit');
          $templateCache.put('modules/gforms/client/views/form-gform.client.view.html', '');

          // create mock gform
          mockGForm = new GFormsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An GForm about MEAN',
            content: 'MEAN rocks!'
          });

          //Initialize Controller
          GFormsController = $controller('GFormsController as vm', {
            $scope: $scope,
            gformResolve: mockGForm
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:gformId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.gformResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            gformId: 1
          })).toEqual('/gforms/1/edit');
        }));

        it('should attach an gform to the controller scope', function () {
          expect($scope.vm.gform._id).toBe(mockGForm._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/gforms/client/views/form-gform.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
