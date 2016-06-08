'use strict';

describe('Controller: ArchivosCtrl', function () {

  // load the controller's module
  beforeEach(module('futbolappApp'));

  var ArchivosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArchivosCtrl = $controller('ArchivosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArchivosCtrl.awesomeThings.length).toBe(3);
  });
});
