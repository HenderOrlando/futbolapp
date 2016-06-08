'use strict';

describe('Service: connect', function () {

  // load the service's module
  beforeEach(module('futbolappApp'));

  // instantiate service
  var connect;
  beforeEach(inject(function (_connect_) {
    connect = _connect_;
  }));

  it('should do something', function () {
    expect(!!connect).toBe(true);
  });

});
