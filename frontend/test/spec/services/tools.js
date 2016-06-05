'use strict';

describe('Service: tools', function () {

  // load the service's module
  beforeEach(module('futbolappApp'));

  // instantiate service
  var tools;
  beforeEach(inject(function (_tools_) {
    tools = _tools_;
  }));

  it('should do something', function () {
    expect(!!tools).toBe(true);
  });

});
