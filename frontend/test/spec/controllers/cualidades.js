'use strict';

describe('Controller: CualidadescontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('futbolappApp'));

  var CualidadesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CualidadesCtrl = $controller('CualidadesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CualidadesCtrl.awesomeThings.length).toBe(3);
  });
});
