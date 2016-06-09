'use strict';

/**
 * @ngdoc function
 * @name futbolappApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the futbolappApp
 */
angular.module('futbolappApp')
  .controller('PerfilCtrl', function ($stateParams, Connect, tools, $mdSidenav, $mdDialog, $mdMedia, $rootScope, localStorageService, $state) {
    var
      vm = this,
      storage = localStorageService,
      User = new Connect('user')
      //pais = new Connect('pais')
    ;

    $rootScope.getUrlImg = User.getUrlImg;

    $rootScope.$watch(function(){
      return $mdMedia('gt-sm');
    }, function (newval){
      $rootScope.gtsm = newval;
    });
    vm.count = {};
    vm.username = $stateParams.username;
    vm.menu = getMenu();
    vm.list = getList();
    vm.toggleMenu = toggleMenu;
    vm.openForm = openForm;
    vm.logout = logout;

    function getMenu(){
      var menu = tools.listMenu();

      menu.filter(function(val){
        new Connect(val.orm).find({}).then(function(rta){
            vm.count[val.slug] = rta.length;
          }, function(e){
            vm.count[val.slug] = 0;
          })
          .catch(function(e){
            vm.count[val.slug] = 0;
          });
      });

      return menu;
    }

    function getList(){
      var
        list = []
      ;
      angular.forEach(getMenu(), function(val){
        list.push({
          slug: val.slug,
          orm: val.orm,
          titulo: val.titulo,
          created: val.created,
          subtitulo: val.descripcion
        });
      });
      //console.log(list)
      return list;
    }

    function toggleMenu(){
      $mdSidenav('menu').toggle();
    }

    function openForm($event, obj){
      var
        titulo = (obj && obj.id?'Modificando':'Agregando') + ' ' + obj.titulo,
        Model = new Connect(obj.orm)
      ;
      Model.attrs().then(function(attrs){
        $mdDialog.show({
          controller: 'FormCtrl',
          controllerAs: 'form',
          templateUrl: 'views/formdialog.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          locals: {
            vars: {
              este: vm.openForm,
              titulo: titulo,
              attrs: attrs,
              modelname: obj.orm,
              model: Model
            }
          },
          clickOutsideToClose: true
        })
          .then(function(rta) {
            // Bien
            //console.log('cerrado menu')
            //console.log(rta)
            if(rta && rta.id){
              loadList();
            }
          }, function() {
            //console.log('cancelado menu')
            // Cancelado
          });
      });
    }

    function logout(){
      User.logout().then(function(){
        storage.clearAll();
        $state.go('main');
      });
    }
  });
