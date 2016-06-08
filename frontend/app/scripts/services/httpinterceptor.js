'use strict';

/**
 * @ngdoc service
 * @name futbolappApp.httpInterceptor
 * @description
 * # httpInterceptor
 * Factory in the futbolappApp.
 */
angular.module('futbolappApp')
  .factory('httpInterceptor', function ($q, localStorageService) {
    var storage = localStorageService;
    return {
      // optional method
      'request': function(config) {
        // Request Success
        if(storage.get('userid')){
          config.headers.authenticate = {
            userid: storage.get('userid')
          };
        }
        return config;
      },

      // optional method
      'requestError': function(rejection) {
        // Request Error
        return $q.reject(rejection);
      },



      // optional method
      'response': function(response) {
        // Response Success
        return response;
      },

      // optional method
      'responseError': function(rejection) {
        // Response Error
        return $q.reject(rejection);
      }
    };
  });
