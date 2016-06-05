'use strict';

/**
 * @ngdoc function
 * @name futbolappApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the futbolappApp
 */
angular.module('futbolappApp')
  .controller('PerfilCtrl', function ($stateParams, Connect, tools, $mdSidenav) {
    var
      vm = this
      //pais = new Connect('pais')
    ;
    /*pais.create({titulo: 'Colombia', 'slug': 'colombia'}).then(function(rta){
      console.log(rta)
    });*/
    /*pais.find({}).then(function(rta){
      console.log(rta)
    });
    pais.attrs().then(function(rta){
      console.log(rta)
    });*/
    vm.count = {};
    vm.username = $stateParams.username;
    vm.menu = getMenu();
    vm.list = getList();
    vm.toggleMenu = toggleMenu;

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
  });
