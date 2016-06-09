'use strict';

describe('Controller: PerfilconfigCtrl', function () {

  // load the controller's module
  beforeEach(module('futbolappApp'));

  var PerfilconfigCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerfilconfigCtrl = $controller('PerfilconfigCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerfilconfigCtrl.awesomeThings.length).toBe(3);
  });
});
