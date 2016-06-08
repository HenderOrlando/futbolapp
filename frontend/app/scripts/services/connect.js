'use strict';

/**
 * @ngdoc service
 * @name futbolappApp.connect
 * @description
 * # connect
 * Service in the futbolappApp.
 */
angular.module('futbolappApp')
  .service('Connect', function ($http, $q, $location, Upload) {
    return function(model){
      var
        modelname = null,
      //hostname = $location.host() !== 'locahost'?'104.236.247.198':'localhost',
        urlbase = 'http://' + $location.host() + ':1340/',
        url = urlbase
      ;
      if(model){
        modelname = model;
        url = getUrl(model);
      }
      return {
        add: add,
        sub: sub,
        find: find,
        attrs: attrs,
        create: create,
        update: update,
        remove: remove,
        populate: populate,
        upload: upload,
        login: login,
        logout: logout,
      };

      function add(model, criteria){
        return $q(function(resolve, reject){
          if(!angular.isString(model)){
            criteria = model;
            model = modelname;
          }
          if(angular.isObject(criteria) && criteria.association && criteria.fk && criteria.id){
            resolve(responseData(
              $http.post(getUrl(model) + '/' + criteria.id + '/' + criteria.association + '/' + criteria.fk, criteria.data || {})
            ));
          }
          reject('Bad Criteria');
        });
      }

      function sub(model, criteria){
        return $q(function(resolve, reject){
          if(!angular.isString(model)){
            criteria = model;
            model = modelname;
          }
          if(angular.isObject(criteria) && criteria.association && criteria.fk && criteria.id){
            resolve(responseData(
              $http.delete(getUrl(model) + '/' + criteria.id + '/' + criteria.association + '/' + criteria.fk)
            ));
          }
          reject('Bad Criteria');
        });
      }

      function find(model, criteria){
        return $q(function(resolve, reject){
          if(!angular.isString(model)){
            criteria = model;
            model = modelname;
          }
          if(angular.isObject(criteria)){
            resolve(responseData(
              $http.get(getUrl(model), {
                params: criteria
              })
            ));
          }
          reject('Bad Criteria');
        });
      }

      function attrs(model){
        return $q(function(resolve, reject){
          if(!angular.isString(model)){
            model = modelname;
          }
          if(angular.isString(model)){
            resolve(responseData(
              $http.get(urlbase + 'admin/' + 'models')
            ).then(function(models){
              var obj = {};
              angular.forEach(models, function(model_, key){
                if(key === model){
                  obj = model_;
                }
              });
              return obj || models;
            }));
          }
          reject('Bad Criteria');
        });
      }

      function create(model, criteria){
        return $q(function(resolve, reject){
          if(!angular.isString(model)){
            criteria = model;
            model = modelname;
          }
          if(angular.isObject(criteria)){
            resolve(responseData(
              $http.post(getUrl(model), criteria)
            ));
          }
          reject('Bad Criteria');
        });
      }

      function update(model, criteria){
        return $q(function(resolve, reject){
          if(!angular.isString(model)){
            criteria = model;
            model = modelname;
          }
          if(angular.isObject(criteria) && criteria.id){
            resolve(responseData(
              $http.put(getUrl(model) + '/' + criteria.id, criteria)
            ));
          }
          reject('Bad Criteria');
        });
      }

      function remove(model, criteria){
        return $q(function(resolve, reject){
          if(!angular.isString(model)){
            criteria = model;
            model = modelname;
          }
          if(angular.isObject(criteria) && criteria.id){
            resolve(responseData(
              $http.delete(getUrl(model) + '/' + criteria.id)
            ));
          }
          reject('Bad Criteria');
        });
      }

      function populate(model, criteria){
        return $q(function(resolve, reject){
          if(!angular.isString(model)){
            criteria = model;
            model = modelname;
          }
          if(angular.isObject(criteria) && criteria.association && criteria.id){
            resolve(responseData(
              $http.get(getUrl(model) + '/' + criteria.id + '/' + criteria.association)
            ));
          }
          reject('Bad Criteria');
        });
      }

      function responseData(promise){
        return promise.then(function(rta){
          return rta.data;
        });
      }

      function getUrl(modelname){
        return urlbase + modelname;
      }

      function upload(file, name, id, modelname){
        return Upload.upload({
          arrayKey: '',
          url: urlbase + 'archivo/upload',
          data: {
            id: id,
            modelname: modelname,
            file: file
          }
        }).then(function(res){
          return res.data;
        });
      }

      function login(username, password){
        if(angular.isObject(username)){
          password = username.password;
          username = username.username;
        }
        return $http.post(urlbase + 'auth/login', {
          username: username,
          password: password
        }).then(function(res){
          return res.data;
        });
      }

      function logout(){
        return $http.post(urlbase + 'auth/logout').then(function(res){
          return res.data;
        });
      }

    };

  });
