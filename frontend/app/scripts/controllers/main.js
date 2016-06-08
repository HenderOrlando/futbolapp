'use strict';

/**
 * @ngdoc function
 * @name futbolappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the futbolappApp
 */
angular.module('futbolappApp')
  .controller('MainCtrl', function (Connect, localStorageService, $state) {
    var
      vm = this,
      storage = localStorageService,
      User = new Connect('user')
    ;

    vm.user = {
      username: '',
      password: '',
    };

    if(storage.get('userid')){
      User.find({
        id: storage.get('userid')
      }).then(function(user){
        console.log(user)
        if(!user.id){
          user = user[0];
        }
        if(user.id){
          $state.go('perfil', {
            username: user.username
          });
        }
      });
    }
    vm.login = login;
    vm.logout = logout;

    function login(){
      if(vm.user.username.length && vm.user.username.length){
        User.login({
          //username: 'divela',
          //password: '123'
          username: vm.user.username,
          password: vm.user.password
        }).then(function(res){
          var msg = res.message;
          if(msg.indexOf('failed') < 0){
            storage.set('userid', res.userid);
            User.find({id: res.userid}).then(function(user){
              $state.go('perfil', {
                username: user.username
              });
            });
            // redirect
          }
        });
      }
    }

    function logout(){
      User.logout().then(function(){
        storage.clearAll();
        $state.go('main');
      });
    }
    /*User.create({
      username: 'divela',
      password: '123'
    }).then(function(user){
      console.log('Users -> ', user)
    });*/
  });
